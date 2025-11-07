import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PalmScanner } from './PalmScanner';
import { 
  ShoppingCart, 
  CreditCard, 
  CheckCircle, 
  User, 
  Receipt, 
  Clock,
  ArrowRight,
  Shield,
  Loader2,
  AlertTriangle,
  X,
  Plus,
  Minus,
  Trash2,
  Wallet,
  Star,
  Eye,
  Hand
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountBalance: number;
  paymentMethods: PaymentMethod[];
  recentTransactions: Transaction[];
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'wallet' | 'bank';
  name: string;
  last4?: string;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  amount: number;
  type: 'payment' | 'refund' | 'topup';
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  description: string;
}

export const PaymentInterface: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'cart' | 'scan' | 'processing' | 'success' | 'failed'>('cart');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('biometric');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setUserId(authUser.id);
      }
    };
    fetchUser();
  }, []);
  const [cartItems, setCartItems] = useState<PaymentItem[]>([
    {
      id: '1',
      name: 'قهوة عربية أصيلة',
      price: 25.50,
      quantity: 2,
      category: 'مشروبات',
      image: '/api/placeholder/100/100'
    },
    {
      id: '2', 
      name: 'كعكة الشوكولاتة',
      price: 45.00,
      quantity: 1,
      category: 'حلويات',
      image: '/api/placeholder/100/100'
    },
    {
      id: '3',
      name: 'عصير طبيعي',
      price: 18.75,
      quantity: 3,
      category: 'مشروبات',
      image: '/api/placeholder/100/100'
    }
  ]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const tax = total * 0.15; // 15% VAT
  const finalTotal = total + tax;

  // Simulate updating cart quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "تم حذف العنصر",
      description: "تم إزالة العنصر من السلة",
    });
  };

  // Handle biometric scan completion
  const handleScanComplete = async (success: boolean) => {
    setCurrentStep('processing');
    
    if (success && userId) {
      try {
        // Save transaction to database
        const { data, error } = await supabase
          .from('transactions')
          .insert([
            {
              user_id: userId,
              type: 'payment',
              amount: finalTotal,
              status: 'completed',
              currency: 'SAR',
              description: `دفع ${cartItems.length} عناصر`
            }
          ])
          .select();

        setTimeout(() => {
          if (!error) {
            setUser({
              id: userId,
              name: 'مستخدم النظام',
              email: '',
              phone: '',
              accountBalance: 1250.75,
              paymentMethods: [],
              recentTransactions: []
            });
            setIsAuthenticated(true);
            setCurrentStep('success');
            
            toast({
              title: "تم الدفع بنجاح! 🎉",
              description: `تم خصم ${finalTotal.toFixed(2)} ريال من حسابك`,
            });
          } else {
            setCurrentStep('failed');
            toast({
              title: "فشل في المعاملة",
              description: "حدث خطأ أثناء معالجة الدفع",
              variant: "destructive"
            });
          }
        }, 2000);
      } catch (error) {
        setCurrentStep('failed');
        toast({
          title: "فشل في المعاملة",
          description: "حدث خطأ غير متوقع",
          variant: "destructive"
        });
      }
    } else {
      setTimeout(() => {
        setCurrentStep('failed');
        toast({
          title: "فشل في المعاملة",
          description: "تعذر التحقق من بصمة اليد. يرجى المحاولة مرة أخرى",
          variant: "destructive"
        });
      }, 2000);
    }
  };

  // Start new transaction
  const startNewTransaction = () => {
    setCurrentStep('cart');
    setIsAuthenticated(false);
    setUser(null);
    setCartItems([
      {
        id: '1',
        name: 'قهوة عربية أصيلة',
        price: 25.50,
        quantity: 2,
        category: 'مشروبات'
      },
      {
        id: '2', 
        name: 'كعكة الشوكولاتة',
        price: 45.00,
        quantity: 1,
        category: 'حلويات'
      }
    ]);
  };

  const renderCartView = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Cart Header */}
      <Card className="glass-bg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold">سلة التسوق</h2>
            <Badge variant="secondary">{itemCount} عنصر</Badge>
          </div>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 ml-1" />
            عرض المزيد
          </Button>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-smooth">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{item.category === 'مشروبات' ? '☕' : '🧁'}</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <p className="font-bold text-primary">{item.price.toFixed(2)} ريال</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-background rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Summary */}
      <Card className="glass-bg p-6">
        <h3 className="text-lg font-semibold mb-4">ملخص الدفع</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>المجموع الفرعي</span>
            <span className="font-medium">{total.toFixed(2)} ريال</span>
          </div>
          <div className="flex justify-between">
            <span>ضريبة القيمة المضافة (15%)</span>
            <span className="font-medium">{tax.toFixed(2)} ريال</span>
          </div>
          <div className="border-t border-border/50 pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>المجموع الإجمالي</span>
              <span className="text-primary">{finalTotal.toFixed(2)} ريال</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mt-6 space-y-3">
          <h4 className="font-medium">طريقة الدفع</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant={selectedPaymentMethod === 'biometric' ? 'scanner' : 'outline'}
              onClick={() => setSelectedPaymentMethod('biometric')}
              className="flex-col h-20 gap-2"
            >
              <Hand className="w-5 h-5" />
              <span className="text-sm">دفع ببصمة كف اليد</span>
            </Button>
            <Button
              variant={selectedPaymentMethod === 'wallet' ? 'scanner' : 'outline'}
              onClick={() => setSelectedPaymentMethod('wallet')}
              className="flex-col h-20 gap-2"
            >
              <Wallet className="w-5 h-5" />
              <span className="text-sm">محفظة رقمية</span>
            </Button>
          </div>
          {selectedPaymentMethod === 'biometric' && (
            <div className="mt-4 p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">دفع آمن ببصمة كف اليد</span>
              </div>
              <p className="text-xs text-muted-foreground">
                ستحتاج إلى وضع كف يدك على الماسح البيومتري لإتمام عملية الدفع بأمان تام
              </p>
            </div>
          )}
        </div>

        <Button 
          variant="scanner" 
          size="lg"
          onClick={() => setCurrentStep('scan')}
          className="w-full mt-6 text-lg py-6"
          disabled={cartItems.length === 0}
        >
          <ArrowRight className="w-5 h-5 ml-2" />
          متابعة للدفع - {finalTotal.toFixed(2)} ريال
        </Button>
      </Card>
    </div>
  );

  const renderScanView = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Payment Summary Header */}
      <Card className="glass-bg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-primary" />
            <span className="font-medium">إجمالي المبلغ</span>
          </div>
          <span className="text-2xl font-bold text-primary">{finalTotal.toFixed(2)} ريال</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Section */}
        <Card className="glass-bg p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">مسح بصمة اليد</h2>
            <p className="text-muted-foreground">ضع كف يدك على الماسح لإتمام عملية الدفع</p>
          </div>
          
          <div className="mb-6">
            <PalmScanner onScanComplete={handleScanComplete} />
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-accent">
              <Shield className="w-4 h-4" />
              <span>آمن ومشفر 256-bit</span>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <Clock className="w-4 h-4" />
              <span>معالجة فورية في أقل من 3 ثوان</span>
            </div>
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="glass-bg p-6">
          <h3 className="text-lg font-semibold mb-4">تفاصيل الطلب</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                </div>
                <p className="font-bold text-sm">{(item.price * item.quantity).toFixed(2)} ريال</p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border/50 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>المجموع الفرعي</span>
              <span>{total.toFixed(2)} ريال</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>الضريبة</span>
              <span>{tax.toFixed(2)} ريال</span>
            </div>
            <div className="flex justify-between font-bold text-primary">
              <span>الإجمالي</span>
              <span>{finalTotal.toFixed(2)} ريال</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="text-center">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep('cart')}
          className="mx-auto"
        >
          العودة للسلة
        </Button>
      </div>
    </div>
  );

  const renderProcessingView = () => (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="animate-pulse-glow p-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-spin">
          <Loader2 className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-2">جاري معالجة الدفع...</h2>
        <p className="text-muted-foreground">يرجى عدم إزالة يدك من الماسح</p>
        <div className="mt-4">
          <div className="text-lg font-bold text-primary">{finalTotal.toFixed(2)} ريال</div>
          <div className="text-sm text-muted-foreground">جاري التحقق من الهوية والمعالجة الآمنة</div>
        </div>
      </div>
    </div>
  );

  const renderSuccessView = () => (
    <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
      <div className="p-8">
        <div className="w-24 h-24 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center animate-pulse-glow">
          <CheckCircle className="w-12 h-12 text-accent-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-accent">تم الدفع بنجاح! 🎉</h2>
        <p className="text-muted-foreground">تمت معالجة دفعتك بأمان</p>
      </div>
      
      {user && (
        <Card className="glass-bg p-6 space-y-4">
          {/* Transaction Details */}
          <div className="border-b border-border/50 pb-4">
            <h3 className="text-lg font-semibold mb-3">تفاصيل المعاملة</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">رقم المعاملة</p>
                <p className="font-mono font-bold">TXN-{Date.now().toString().slice(-8)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">المبلغ المدفوع</p>
                <p className="font-bold text-accent">{finalTotal.toFixed(2)} ريال</p>
              </div>
              <div>
                <p className="text-muted-foreground">طريقة الدفع</p>
                <p className="font-medium">دفع بيومتري</p>
              </div>
              <div>
                <p className="text-muted-foreground">الوقت</p>
                <p className="font-medium">{new Date().toLocaleTimeString('ar-SA')}</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-right flex-1">
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <Wallet className="w-4 h-4 text-primary" />
                <p className="text-sm text-primary">الرصيد المتبقي: {(user.accountBalance - finalTotal).toFixed(2)} ريال</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-border/50 pt-4">
            <h4 className="font-semibold mb-3">ملخص الطلب</h4>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{(item.price * item.quantity).toFixed(2)} ريال</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-4 justify-center">
        <Button 
          variant="outline" 
          onClick={startNewTransaction}
          className="px-8"
        >
          <Receipt className="w-4 h-4 ml-2" />
          إرسال الإيصال
        </Button>
        
        <Button 
          variant="scanner" 
          onClick={startNewTransaction}
          className="px-8"
        >
          <ShoppingCart className="w-4 h-4 ml-2" />
          عملية جديدة
        </Button>
      </div>
    </div>
  );

  const renderFailedView = () => (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="p-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-destructive/20 rounded-full flex items-center justify-center">
          <X className="w-10 h-10 text-destructive" />
        </div>
        <h2 className="text-xl font-bold mb-2 text-destructive">فشل في المعاملة</h2>
        <p className="text-muted-foreground mb-4">
          تعذر إتمام عملية الدفع. يرجى المحاولة مرة أخرى.
        </p>
        
        <div className="bg-destructive/10 rounded-lg p-4 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="font-medium">أسباب محتملة:</span>
          </div>
          <ul className="text-right text-muted-foreground space-y-1">
            <li>• بصمة اليد غير واضحة</li>
            <li>• مشكلة في الاتصال</li>
            <li>• رصيد غير كافي</li>
          </ul>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep('cart')}
          className="flex-1"
        >
          العودة للسلة
        </Button>
        <Button 
          variant="scanner" 
          onClick={() => setCurrentStep('scan')}
          className="flex-1"
        >
          إعادة المحاولة
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            نظام الدفع البيومتري
          </h1>
          <p className="text-muted-foreground mt-2">
            ادفع بأمان وسرعة باستخدام بصمة كف اليد
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-center gap-2">
            {['cart', 'scan', 'processing', 'success'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
                  currentStep === step ? 'bg-primary text-primary-foreground' :
                  ['cart', 'scan', 'processing', 'success'].indexOf(currentStep) > index ? 'bg-accent text-accent-foreground' :
                  'bg-secondary text-muted-foreground'
                }`}>
                  {step === 'cart' && <ShoppingCart className="w-5 h-5" />}
                  {step === 'scan' && <Shield className="w-5 h-5" />}
                  {step === 'processing' && <Loader2 className="w-5 h-5" />}
                  {step === 'success' && <CheckCircle className="w-5 h-5" />}
                </div>
                {index < 3 && (
                  <div className={`w-8 h-0.5 mx-1 transition-smooth ${
                    ['cart', 'scan', 'processing', 'success'].indexOf(currentStep) > index ? 'bg-accent' : 'bg-secondary'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content based on current step */}
        {currentStep === 'cart' && renderCartView()}
        {currentStep === 'scan' && renderScanView()}
        {currentStep === 'processing' && renderProcessingView()}
        {currentStep === 'success' && renderSuccessView()}
        {currentStep === 'failed' && renderFailedView()}
      </div>
    </div>
  );
};