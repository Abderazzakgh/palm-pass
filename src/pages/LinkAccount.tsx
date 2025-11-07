import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { QRCodeScanner } from '@/components/QRCodeScanner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, QrCode, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function LinkAccount() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<'qr' | 'card' | 'processing' | 'complete'>('qr');
  const [showScanner, setShowScanner] = useState(false);
  const [registrationToken, setRegistrationToken] = useState(searchParams.get('token') || '');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast({
          title: 'يجب تسجيل الدخول',
          description: 'الرجاء تسجيل الدخول أولاً',
          variant: 'destructive',
        });
        navigate('/auth');
      }
    });
  }, [navigate, toast]);

  const handleQRScan = (decodedText: string) => {
    setRegistrationToken(decodedText);
    setShowScanner(false);
    setCurrentStep('card');
    
    toast({
      title: 'تم مسح الرمز بنجاح',
      description: 'يمكنك الآن إدخال بيانات بطاقة الدفع',
    });
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registrationToken) {
      toast({
        title: 'خطأ',
        description: 'لم يتم العثور على رمز التسجيل',
        variant: 'destructive',
      });
      return;
    }

    setCurrentStep('processing');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No session found');
      }

      // 1. Verify and update the registration token
      const { data: tokenData, error: tokenError } = await supabase
        .from('palm_registration_tokens')
        .select('*')
        .eq('token', registrationToken)
        .eq('is_used', false)
        .single();

      if (tokenError || !tokenData) {
        throw new Error('رمز التسجيل غير صحيح أو منتهي الصلاحية');
      }

      // Check if token is expired
      if (new Date(tokenData.expires_at) < new Date()) {
        throw new Error('رمز التسجيل منتهي الصلاحية');
      }

      // 2. Tokenize card (in production, use Stripe/payment gateway)
      const cardToken = `tok_${Math.random().toString(36).substring(7)}`;
      const lastFour = cardNumber.slice(-4);
      const [expiryMonth, expiryYear] = expiryDate.split('/').map(s => parseInt(s));

      // 3. Store card details
      const { error: cardError } = await supabase
        .from('payment_cards')
        .insert({
          user_id: session.user.id,
          card_token: cardToken,
          last_four: lastFour,
          cardholder_name: cardName,
          expiry_month: expiryMonth,
          expiry_year: 2000 + expiryYear,
          is_default: true
        });

      if (cardError) throw cardError;

      // 4. Update token as used and link to user
      const { error: updateTokenError } = await supabase
        .from('palm_registration_tokens')
        .update({
          user_id: session.user.id,
          is_used: true,
          linked_at: new Date().toISOString()
        })
        .eq('id', tokenData.id);

      if (updateTokenError) throw updateTokenError;

      // 5. Update user profile with palm_scan_id
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          palm_scan_id: tokenData.palm_scan_id
        })
        .eq('user_id', session.user.id);

      if (profileError) throw profileError;

      setCurrentStep('complete');
      
      toast({
        title: 'تم الربط بنجاح!',
        description: 'تم ربط بصمة كف اليد مع حسابك وبطاقة الدفع',
      });

    } catch (error: any) {
      console.error('Error linking account:', error);
      toast({
        title: 'خطأ في الربط',
        description: error.message || 'حدث خطأ أثناء ربط الحساب',
        variant: 'destructive',
      });
      setCurrentStep('card');
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">ربط الحساب</h1>
          <p className="text-muted-foreground">نظام المصادقة الهجيني - خطوة 2</p>
        </div>

        {/* QR Scanner Step */}
        {currentStep === 'qr' && !showScanner && (
          <Card className="p-8 text-center space-y-6 glass-bg">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <QrCode className="w-10 h-10 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">مسح رمز QR</h2>
              <p className="text-muted-foreground">
                امسح رمز QR الذي حصلت عليه من جهاز المسح
              </p>
            </div>
            
            <Button onClick={() => setShowScanner(true)} className="w-full" size="lg">
              <QrCode className="w-5 h-5 ml-2" />
              فتح الماسح الضوئي
            </Button>

            {registrationToken && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('card')}
                className="w-full"
              >
                لدي رمز بالفعل - متابعة
              </Button>
            )}
          </Card>
        )}

        {showScanner && (
          <QRCodeScanner 
            onScanSuccess={handleQRScan}
            onClose={() => setShowScanner(false)}
          />
        )}

        {/* Card Details Step */}
        {currentStep === 'card' && (
          <Card className="p-8 space-y-6 glass-bg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold">رمز التسجيل صحيح</h2>
                <p className="text-sm text-muted-foreground">أدخل بيانات بطاقة الدفع</p>
              </div>
            </div>

            <form onSubmit={handleCardSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">اسم حامل البطاقة</Label>
                <Input
                  id="cardName"
                  placeholder="الاسم كما هو مكتوب على البطاقة"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">رقم البطاقة</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">تاريخ الانتهاء</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    maxLength={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="password"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                <CreditCard className="w-5 h-5 ml-2" />
                ربط البطاقة وإكمال التسجيل
              </Button>
            </form>
          </Card>
        )}

        {/* Processing Step */}
        {currentStep === 'processing' && (
          <Card className="p-12 text-center space-y-6 glass-bg">
            <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">جاري الربط...</h2>
              <p className="text-muted-foreground">
                يتم الآن ربط بصمة كف اليد مع حسابك وبطاقة الدفع
              </p>
            </div>
          </Card>
        )}

        {/* Complete Step */}
        {currentStep === 'complete' && (
          <Card className="p-12 text-center space-y-6 glass-bg">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-green-500">تم الربط بنجاح!</h2>
              <p className="text-muted-foreground">
                يمكنك الآن استخدام بصمة كف يدك للدفع والمصادقة
              </p>
            </div>

            <div className="space-y-3">
              <Button onClick={() => navigate('/')} className="w-full" size="lg">
                الذهاب إلى الصفحة الرئيسية
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/payment')} 
                className="w-full"
              >
                تجربة الدفع الآن
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}