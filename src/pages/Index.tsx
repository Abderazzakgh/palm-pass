import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PaymentInterface } from '@/components/PaymentInterface';
import { UserDashboard } from '@/components/UserDashboard';
import { AttendanceSystem } from '@/components/AttendanceSystem';
import { AccessControlSystem } from '@/components/AccessControlSystem';
import { AdminDashboard } from '@/components/AdminDashboard';
import { NotificationSystem } from '@/components/NotificationSystem';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { SmartSettings } from '@/components/SmartSettings';
import { DigitalWallet } from '@/components/DigitalWallet';
import { BiometricAuth } from '@/components/BiometricAuth';
import { SystemIntegration } from '@/components/SystemIntegration';
import { UserManagement } from '@/components/UserManagement';
import { SystemMonitoring } from '@/components/SystemMonitoring';
import { Hand, CreditCard, User, ArrowLeft, Clock, Shield, Settings, Bell, BarChart3, Wallet, Activity, LogIn, LogOut } from 'lucide-react';
import palmScanner from '@/assets/palm-scanner.jpg';
import savanaLogo from '@/assets/savana-logo.png';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { NavigationDropdown } from '@/components/ui/navigation-dropdown';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'payment' | 'dashboard' | 'attendance' | 'access' | 'admin' | 'analytics' | 'settings' | 'wallet' | 'biometric' | 'integration' | 'users' | 'monitoring'>('home');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "تم تسجيل الدخول بنجاح",
            description: "مرحباً بك في نظام الدفع البيومتري",
          });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الخروج",
        variant: "destructive",
      });
    } else {
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح",
      });
      setCurrentView('home');
    }
  };

  const renderHomeView = () => (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <img src={savanaLogo} alt="سافانا" className="w-20 h-20 rounded-xl shadow-glow" />
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    سافانا
                  </h1>
                  <p className="text-lg text-muted-foreground">نظام الدفع البيومتري</p>
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-bold leading-tight mb-6 text-foreground">
                  المستقبل هنا
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  ادفع وتسوق بأمان وسرعة باستخدام بصمة كف يدك. 
                  تقنية متطورة تجعل عمليات الدفع أكثر أماناً وسهولة من أي وقت مضى.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 glass-bg rounded-lg">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Hand className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">أمان متقدم</p>
                    <p className="text-sm text-muted-foreground">بصمة فريدة</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 glass-bg rounded-lg">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">دفع سريع</p>
                    <p className="text-sm text-muted-foreground">بثوانٍ معدودة</p>
                  </div>
                </div>
              </div>

              {!user ? (
                <div className="space-y-4">
                  <Button 
                    variant="scanner" 
                    size="lg"
                    onClick={() => {
                      console.log('زر ابدأ الآن تم الضغط عليه');
                      navigate('/auth');
                    }}
                    className="text-lg px-8 py-6 w-full sm:w-auto hover-lift"
                  >
                    <LogIn className="w-5 h-5 ml-2" />
                    ابدأ الآن - تسجيل الدخول
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    يرجى تسجيل الدخول للوصول إلى جميع ميزات النظام
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      variant="scanner" 
                      size="lg"
                      onClick={() => setCurrentView('payment')}
                      className="text-base px-6 py-5 hover-lift"
                    >
                      <CreditCard className="w-5 h-5 ml-2" />
                      نظام الدفع
                    </Button>
                    
                    <Button 
                      variant="biometric" 
                      size="lg"
                      onClick={() => setCurrentView('attendance')}
                      className="text-base px-6 py-5 hover-lift"
                    >
                      <Clock className="w-5 h-5 ml-2" />
                      الحضور
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setCurrentView('access')}
                      className="text-base px-6 py-5 hover-lift"
                    >
                      <Shield className="w-5 h-5 ml-2" />
                      التحكم
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setCurrentView('wallet')}
                      className="text-base px-6 py-5 hover-lift"
                    >
                      <Wallet className="w-5 h-5 ml-2" />
                      المحفظة
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setCurrentView('dashboard')}
                      className="text-base px-6 py-5 hover-lift"
                    >
                      <User className="w-5 h-5 ml-2" />
                      حسابي
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setCurrentView('admin')}
                      className="text-base px-6 py-5 hover-lift"
                    >
                      <Settings className="w-5 h-5 ml-2" />
                      الإدارة
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setCurrentView('analytics')}
                      className="text-base px-6 py-5 hover-lift"
                    >
                      <BarChart3 className="w-5 h-5 ml-2" />
                      التحليلات
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setCurrentView('users')}
                      className="text-base px-6 py-5 hover-lift"
                    >
                      <User className="w-5 h-5 ml-2" />
                      المستخدمين
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setCurrentView('monitoring')}
                      className="text-base px-6 py-5 hover-lift"
                    >
                      <Activity className="w-5 h-5 ml-2" />
                      المراقبة
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setCurrentView('settings')}
                      className="text-base px-6 py-5 hover-lift"
                    >
                      <Settings className="w-5 h-5 ml-2" />
                      الإعدادات
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setShowNotifications(true)}
                      className="text-base px-6 py-5 hover-lift relative"
                    >
                      <Bell className="w-5 h-5 ml-2" />
                      الإشعارات
                      <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setCurrentView('biometric')}
                      className="text-base px-6 py-5 hover-lift"
                    >
                      <Hand className="w-5 h-5 ml-2" />
                      المصادقة
                    </Button>
                  </div>

                  <Button 
                    variant="destructive" 
                    size="lg"
                    onClick={handleSignOut}
                    className="text-base px-6 py-5 w-full hover-lift"
                  >
                    <LogOut className="w-5 h-5 ml-2" />
                    تسجيل الخروج
                  </Button>
                </div>
              )}

            </div>

            <div className="relative animate-fade-in">
              <div className="relative z-10">
                <img 
                  src={palmScanner} 
                  alt="تقنية مسح كف اليد"
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-glow animate-float"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/80 to-transparent rounded-2xl"></div>
              </div>
              
              <div className="absolute top-8 left-8 glass-bg p-4 rounded-xl animate-glow-pulse">
                <Hand className="w-8 h-8 text-primary" />
              </div>
              
              <div className="absolute bottom-8 right-8 glass-bg p-4 rounded-xl animate-glow-pulse">
                <CreditCard className="w-8 h-8 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">لماذا تختار نظامنا؟</h2>
          <p className="text-xl text-muted-foreground">تقنية متطورة لتجربة دفع استثنائية</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="glass-bg p-8 text-center group hover:shadow-glow transition-smooth hover-lift">
            <div className="w-20 h-20 tech-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow-pulse">
              <Hand className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">أمان لا مثيل له</h3>
            <p className="text-muted-foreground leading-relaxed">
              بصمة كف اليد فريدة وغير قابلة للتكرار، مما يضمن حماية عالية لحسابك ومعاملاتك المالية
            </p>
          </Card>

          <Card className="glass-bg p-8 text-center group hover:shadow-accent transition-smooth hover-lift">
            <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow-pulse">
              <CreditCard className="w-10 h-10 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">سرعة فائقة</h3>
            <p className="text-muted-foreground leading-relaxed">
              إتمام المعاملات في أقل من 3 ثوانٍ، لا حاجة لبطاقات أو كلمات مرور
            </p>
          </Card>

          <Card className="glass-bg p-8 text-center group hover:shadow-glow transition-smooth hover-lift">
            <div className="w-20 h-20 bg-gradient-to-br from-muted to-muted/70 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow-pulse">
              <User className="w-10 h-10 text-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">سهولة الاستخدام</h3>
            <p className="text-muted-foreground leading-relaxed">
              واجهة بسيطة وسهلة الاستخدام، مناسبة لجميع الأعمار والخبرات التقنية
            </p>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
            <div>
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <img src={savanaLogo} alt="سافانا" className="w-12 h-12 rounded-lg" />
                <h3 className="text-xl font-bold text-foreground">سافانا</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                نظام الدفع البيومتري الأكثر أماناً وسرعة في المملكة
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-foreground">روابط مهمة</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => navigate('/privacy')}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors mx-auto md:mx-0"
                >
                  سياسة الخصوصية
                </button>
                <button 
                  onClick={() => navigate('/terms')}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors mx-auto md:mx-0"
                >
                  شروط الاستخدام
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-foreground">تواصل معنا</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>البريد: info@savana.sa</p>
                <p>الهاتف: 920000000</p>
                <p>الرياض، المملكة العربية السعودية</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} سافانا. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'payment':
        return (
          <div>
            <div className="container mx-auto px-6 py-4">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('home')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Button>
            </div>
            <PaymentInterface />
          </div>
        );
      case 'attendance':
        return (
          <div>
            <div className="container mx-auto px-6 py-4">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('home')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Button>
            </div>
            <AttendanceSystem />
          </div>
        );
      case 'access':
        return (
          <div>
            <div className="container mx-auto px-6 py-4">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('home')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Button>
            </div>
            <AccessControlSystem />
          </div>
        );
      case 'dashboard':
        return (
          <div>
            <UserDashboard />
            <div className="fixed bottom-6 left-6">
              <Button 
                variant="biometric" 
                onClick={() => setCurrentView('home')}
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                الرئيسية
              </Button>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div>
            <AdminDashboard />
            <div className="fixed bottom-6 left-6">
              <Button 
                variant="biometric" 
                onClick={() => setCurrentView('home')}
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                الرئيسية
              </Button>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="min-h-screen bg-background p-6">
            <div className="container mx-auto py-8">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('home')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Button>
              <AnalyticsDashboard />
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="min-h-screen bg-background p-6">
            <div className="container mx-auto py-8">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('home')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Button>
              <SmartSettings />
            </div>
          </div>
        );
        case 'wallet':
        return (
          <div className="min-h-screen bg-background p-6">
            <div className="container mx-auto py-8">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('home')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Button>
              <DigitalWallet />
            </div>
          </div>
        );
      case 'biometric':
        return (
          <div>
            <div className="container mx-auto px-6 py-4">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('home')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Button>
            </div>
            <BiometricAuth mode="authentication" />
          </div>
        );
      case 'users':
        return (
          <div>
            <div className="container mx-auto px-6 py-4">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('home')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Button>
            </div>
            <UserManagement />
          </div>
        );
      case 'monitoring':
        return (
          <div>
            <div className="container mx-auto px-6 py-4">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('home')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Button>
            </div>
            <SystemMonitoring />
          </div>
        );
      default:
        return renderHomeView();
    }
  };

  // إذا كان المستخدم في صفحة غير الرئيسية ولم يسجل دخول، عرض رسالة
  const requiresAuth = currentView !== 'home';
  
  if (requiresAuth && !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="glass-bg p-10 text-center max-w-md">
          <Hand className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">تسجيل الدخول مطلوب</h2>
          <p className="text-muted-foreground mb-6">
            يجب تسجيل الدخول للوصول إلى هذه الميزة
          </p>
          <Button 
            variant="scanner" 
            size="lg"
            onClick={() => navigate('/auth')}
            className="w-full"
          >
            <LogIn className="w-5 h-5 ml-2" />
            تسجيل الدخول
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      {renderCurrentView()}
      {showNotifications && (
        <NotificationSystem onClose={() => setShowNotifications(false)} />
      )}
    </>
  );
};

export default Index;
