import { useState } from 'react';
import { PalmScanner } from './PalmScanner';
import { QRCodeGenerator } from './QRCodeGenerator';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Scan, QrCode, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const PalmRegistration = () => {
  const [currentStep, setCurrentStep] = useState<'scan' | 'qr' | 'complete'>('scan');
  const [registrationToken, setRegistrationToken] = useState('');
  const { toast } = useToast();

  const handleScanComplete = async (success: boolean) => {
    if (success) {
      try {
        // Generate unique palm scan ID and token
        const palmScanId = `palm_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        const token = `reg_${Math.random().toString(36).substring(2, 15)}`;
        
        // Token expires in 24 hours
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        // Store in database
        const { error } = await supabase
          .from('palm_registration_tokens')
          .insert({
            token,
            palm_scan_id: palmScanId,
            expires_at: expiresAt.toISOString()
          });

        if (error) throw error;

        setRegistrationToken(token);
        setCurrentStep('qr');
        
        toast({
          title: 'تم مسح البصمة بنجاح',
          description: 'استخدم رمز QR لربط حسابك',
        });
      } catch (error) {
        console.error('Error creating registration token:', error);
        toast({
          title: 'خطأ',
          description: 'حدث خطأ أثناء إنشاء رمز التسجيل',
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'فشل المسح',
        description: 'الرجاء المحاولة مرة أخرى',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">تسجيل بصمة الكف</h1>
          <p className="text-muted-foreground">نظام المصادقة الهجيني - سافانا</p>
        </div>

        {/* Palm Scan Step */}
        {currentStep === 'scan' && (
          <div className="space-y-6">
            <Card className="p-8 text-center space-y-4 glass-bg">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Scan className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">الخطوة 1: مسح كف اليد</h2>
              <p className="text-muted-foreground">
                ضع كف يدك على الماسح الضوئي أدناه
              </p>
            </Card>
            
            <PalmScanner onScanComplete={handleScanComplete} />
          </div>
        )}

        {/* QR Code Step */}
        {currentStep === 'qr' && (
          <div className="space-y-6">
            <Card className="p-8 text-center space-y-4 glass-bg">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold">تم التسجيل بنجاح!</h2>
              <p className="text-muted-foreground">
                الخطوة 2: امسح رمز QR باستخدام تطبيق الجوال
              </p>
            </Card>

            <QRCodeGenerator
              value={`${window.location.origin}/link-account?token=${registrationToken}`}
              title="رمز ربط الحساب"
            />

            <Card className="p-6 glass-bg">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">افتح تطبيق سافانا</h3>
                    <p className="text-sm text-muted-foreground">
                      قم بتسجيل الدخول أو إنشاء حساب جديد
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">امسح رمز QR</h3>
                    <p className="text-sm text-muted-foreground">
                      استخدم الماسح الضوئي في التطبيق لمسح الرمز أعلاه
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">أضف بطاقة الدفع</h3>
                    <p className="text-sm text-muted-foreground">
                      أدخل بيانات بطاقة الصراف الآلي (ATM) الخاصة بك
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Button 
              variant="outline" 
              onClick={() => {
                setCurrentStep('scan');
                setRegistrationToken('');
              }}
              className="w-full"
            >
              تسجيل بصمة جديدة
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
