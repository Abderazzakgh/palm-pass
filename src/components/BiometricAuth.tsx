import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PalmScanner } from './PalmScanner';
import { 
  Shield, 
  Hand, 
  CheckCircle, 
  AlertTriangle,
  UserPlus,
  UserCheck,
  Lock,
  Unlock,
  Clock,
  Users,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BiometricUser {
  id: string;
  name: string;
  palmId: string;
  permissions: string[];
  lastScan: string;
  isActive: boolean;
}

interface BiometricAuthProps {
  mode?: 'registration' | 'authentication' | 'verification';
  onAuthSuccess?: (user: BiometricUser) => void;
  onAuthFailed?: () => void;
  onRegistrationComplete?: (palmId: string) => void;
}

export const BiometricAuth: React.FC<BiometricAuthProps> = ({
  mode = 'authentication',
  onAuthSuccess,
  onAuthFailed,
  onRegistrationComplete
}) => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'idle' | 'success' | 'failed' | 'processing'>('idle');
  const [authenticatedUser, setAuthenticatedUser] = useState<BiometricUser | null>(null);
  const [registrationStep, setRegistrationStep] = useState<'scan1' | 'scan2' | 'scan3' | 'complete'>('scan1');

  // Simulated user database (will be replaced with Supabase)
  const mockUsers: BiometricUser[] = [
    {
      id: 'user_001',
      name: 'أحمد محمد العلي',
      palmId: 'palm_abc123',
      permissions: ['payment', 'access', 'admin'],
      lastScan: new Date().toISOString(),
      isActive: true
    },
    {
      id: 'user_002',
      name: 'فاطمة أحمد',
      palmId: 'palm_def456',
      permissions: ['payment', 'access'],
      lastScan: new Date(Date.now() - 86400000).toISOString(),
      isActive: true
    }
  ];

  const handleScanComplete = useCallback((success: boolean) => {
    setIsScanning(false);
    setScanResult('processing');
    
    setTimeout(() => {
      if (success) {
        if (mode === 'registration') {
          handleRegistration();
        } else {
          handleAuthentication();
        }
      } else {
        setScanResult('failed');
        onAuthFailed?.();
        toast({
          title: "فشل في المسح",
          description: "لم يتم التعرف على بصمة اليد. يرجى المحاولة مرة أخرى",
          variant: "destructive"
        });
      }
    }, 2000);
  }, [mode, onAuthFailed, toast]);

  const handleAuthentication = () => {
    // Simulate user lookup (will be replaced with Supabase query)
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    setScanResult('success');
    setAuthenticatedUser(user);
    onAuthSuccess?.(user);
    
    toast({
      title: "تم التحقق بنجاح! ✅",
      description: `مرحباً ${user.name}`,
    });
  };

  const handleRegistration = () => {
    if (registrationStep === 'scan3') {
      const newPalmId = `palm_${Date.now()}`;
      setScanResult('success');
      setRegistrationStep('complete');
      onRegistrationComplete?.(newPalmId);
      
      toast({
        title: "تم تسجيل البصمة بنجاح! 🎉",
        description: "يمكنك الآن استخدام بصمة كف اليد للمصادقة",
      });
    } else {
      setScanResult('success');
      const nextSteps = { scan1: 'scan2', scan2: 'scan3' } as const;
      setRegistrationStep(nextSteps[registrationStep as keyof typeof nextSteps]);
      
      setTimeout(() => {
        setScanResult('idle');
      }, 1500);
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setScanResult('idle');
  };

  const resetScan = () => {
    setScanResult('idle');
    setAuthenticatedUser(null);
    setRegistrationStep('scan1');
  };

  const renderRegistrationMode = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="glass-bg p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">تسجيل بصمة جديدة</h2>
          <p className="text-muted-foreground">سنحتاج إلى 3 مسحات لضمان الدقة</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {['scan1', 'scan2', 'scan3', 'complete'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
                  registrationStep === step ? 'bg-primary text-primary-foreground' :
                  ['scan1', 'scan2', 'scan3', 'complete'].indexOf(registrationStep) > index ? 'bg-accent text-accent-foreground' :
                  'bg-secondary text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                {index < 3 && (
                  <div className={`w-8 h-0.5 mx-1 transition-smooth ${
                    ['scan1', 'scan2', 'scan3', 'complete'].indexOf(registrationStep) > index ? 'bg-accent' : 'bg-secondary'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {registrationStep !== 'complete' ? (
          <div className="space-y-6">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                المسح {['scan1', 'scan2', 'scan3'].indexOf(registrationStep) + 1} من 3
              </Badge>
              <p className="text-sm text-muted-foreground">
                ضع كف يدك على الماسح واضغط على "بدء المسح"
              </p>
            </div>
            
            <PalmScanner 
              onScanComplete={handleScanComplete}
              isScanning={isScanning}
            />
            
            {scanResult === 'idle' && (
              <div className="text-center">
                <Button 
                  variant="scanner" 
                  size="lg"
                  onClick={startScan}
                  className="w-full"
                >
                  بدء المسح {['scan1', 'scan2', 'scan3'].indexOf(registrationStep) + 1}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-bold text-accent">تم التسجيل بنجاح!</h3>
            <p className="text-muted-foreground">يمكنك الآن استخدام بصمة كف اليد</p>
          </div>
        )}
      </Card>
    </div>
  );

  const renderAuthenticationMode = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="glass-bg p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">مصادقة بيومترية</h2>
          <p className="text-muted-foreground">ضع كف يدك على الماسح للمصادقة</p>
        </div>

        {authenticatedUser ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-10 h-10 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold text-accent">تم التحقق بنجاح!</h3>
              <p className="text-lg font-medium mt-2">{authenticatedUser.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">الصلاحيات</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {authenticatedUser.permissions.map(permission => (
                    <Badge key={permission} variant="secondary" className="text-xs">
                      {permission === 'payment' ? 'دفع' : 
                       permission === 'access' ? 'دخول' : 'إدارة'}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">آخر دخول</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(authenticatedUser.lastScan).toLocaleString('ar-SA')}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={resetScan} className="flex-1">
                إعادة تعيين
              </Button>
              <Button variant="scanner" className="flex-1">
                <Unlock className="w-4 h-4 ml-2" />
                متابعة
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <PalmScanner 
              onScanComplete={handleScanComplete}
              isScanning={isScanning}
            />
            
            {scanResult === 'idle' && (
              <div className="text-center">
                <Button 
                  variant="scanner" 
                  size="lg"
                  onClick={startScan}
                  className="w-full"
                >
                  <Hand className="w-5 h-5 ml-2" />
                  بدء المصادقة
                </Button>
              </div>
            )}

            {scanResult === 'failed' && (
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  <span>فشل في التحقق</span>
                </div>
                <Button variant="outline" onClick={resetScan}>
                  إعادة المحاولة
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* System Status */}
      <Card className="glass-bg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">حالة النظام</span>
            </div>
            <Badge variant="secondary" className="bg-accent/20 text-accent">
              متصل
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{mockUsers.length} مستخدم</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto py-8">
        {mode === 'registration' ? renderRegistrationMode() : renderAuthenticationMode()}
      </div>
    </div>
  );
};