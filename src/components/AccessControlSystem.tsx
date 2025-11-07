import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PalmScanner } from './PalmScanner';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  DoorOpen, 
  DoorClosed,
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  User,
  Clock,
  MapPin,
  Key,
  Lock,
  Unlock,
  Settings
} from 'lucide-react';

interface AccessLevel {
  id: string;
  name: string;
  areas: string[];
  color: string;
}

interface AccessLog {
  id: string;
  action: 'granted' | 'denied';
  area: string;
  time: string;
  reason?: string;
}

export const AccessControlSystem: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'scan' | 'processing' | 'granted' | 'denied'>('scan');
  const [selectedArea, setSelectedArea] = useState('main-entrance');
  const [user, setUser] = useState<{ 
    name: string; 
    level: AccessLevel; 
    employeeId: string;
    photo?: string;
  } | null>(null);
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

  const accessLevels: Record<string, AccessLevel> = {
    admin: {
      id: 'admin',
      name: 'مدير النظام',
      areas: ['main-entrance', 'server-room', 'executive-floor', 'hr-department', 'finance-department'],
      color: 'text-destructive'
    },
    manager: {
      id: 'manager',
      name: 'مدير القسم',
      areas: ['main-entrance', 'executive-floor', 'hr-department'],
      color: 'text-primary'
    },
    employee: {
      id: 'employee',
      name: 'موظف',
      areas: ['main-entrance', 'hr-department'],
      color: 'text-accent'
    },
    visitor: {
      id: 'visitor',
      name: 'زائر',
      areas: ['main-entrance'],
      color: 'text-muted-foreground'
    }
  };

  const areas = [
    { id: 'main-entrance', name: 'المدخل الرئيسي', icon: DoorOpen, level: 1 },
    { id: 'executive-floor', name: 'الطابق التنفيذي', icon: Shield, level: 2 },
    { id: 'server-room', name: 'غرفة الخوادم', icon: Lock, level: 4 },
    { id: 'hr-department', name: 'قسم الموارد البشرية', icon: User, level: 2 },
    { id: 'finance-department', name: 'القسم المالي', icon: Key, level: 3 }
  ];

  const [accessLogs] = useState<AccessLog[]>([
    {
      id: '1',
      action: 'granted',
      area: 'المدخل الرئيسي',
      time: '09:30',
    },
    {
      id: '2',
      action: 'granted',
      area: 'قسم الموارد البشرية',
      time: '10:15',
    },
    {
      id: '3',
      action: 'denied',
      area: 'غرفة الخوادم',
      time: '11:45',
      reason: 'مستوى الصلاحية غير كافي'
    }
  ]);

  const handleScanComplete = async (success: boolean) => {
    setCurrentStep('processing');
    
    if (success && userId) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, employee_id')
          .eq('user_id', userId)
          .single();

        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId);

        const userRole = (roles && roles.length > 0 ? roles[0].role : 'employee') as keyof typeof accessLevels;
        const mockUser = {
          name: profile?.full_name || 'مستخدم النظام',
          level: accessLevels[userRole] || accessLevels.employee,
          employeeId: profile?.employee_id || 'EMP001'
        };
        setUser(mockUser);
        
        const hasAccess = mockUser.level.areas.includes(selectedArea);
        const areaInfo = areas.find(a => a.id === selectedArea);
        
        // Save access log
        await supabase
          .from('access_logs')
          .insert([
            {
              user_id: userId,
              area: areaInfo?.name || selectedArea,
              action: hasAccess ? 'granted' : 'denied',
              reason: hasAccess ? null : 'مستوى الصلاحية غير كافي'
            }
          ]);

        setTimeout(() => {
          setCurrentStep(hasAccess ? 'granted' : 'denied');
          toast({
            title: hasAccess ? "تم السماح بالدخول" : "تم رفض الدخول",
            description: hasAccess ? `مرحباً في ${areaInfo?.name}` : "ليس لديك صلاحية للدخول",
            variant: hasAccess ? "default" : "destructive"
          });
          
          setTimeout(() => {
            setCurrentStep('scan');
            setUser(null);
          }, 5000);
        }, 2000);
      } catch (error) {
        setCurrentStep('denied');
        setTimeout(() => setCurrentStep('scan'), 3000);
      }
    } else {
      setTimeout(() => {
        setCurrentStep('denied');
        setTimeout(() => setCurrentStep('scan'), 3000);
      }, 2000);
    }
  };

  const getAreaInfo = () => {
    const area = areas.find(a => a.id === selectedArea);
    return area || areas[0];
  };

  const areaInfo = getAreaInfo();
  const AreaIcon = areaInfo.icon;

  const renderScanView = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Area Selection & Scanner */}
        <div className="space-y-6">
          {/* Area Selection */}
          <Card className="glass-bg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">اختر المنطقة</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {areas.map((area) => {
                const Icon = area.icon;
                return (
                  <Button
                    key={area.id}
                    variant={selectedArea === area.id ? 'scanner' : 'biometric'}
                    onClick={() => setSelectedArea(area.id)}
                    className="justify-start h-auto p-4"
                  >
                    <Icon className="w-5 h-5 ml-2" />
                    <div className="text-right">
                      <div className="font-medium">{area.name}</div>
                      <div className="text-xs opacity-70">مستوى {area.level}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </Card>

          {/* Current Access Point */}
          <Card className="glass-bg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <AreaIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{areaInfo.name}</h3>
                <p className="text-muted-foreground">مستوى الأمان: {areaInfo.level}</p>
              </div>
            </div>
            <PalmScanner onScanComplete={handleScanComplete} />
          </Card>
        </div>

        {/* Access Information */}
        <div className="space-y-6">
          {/* Security Status */}
          <Card className="glass-bg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">حالة الأمان</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-accent" />
                  <span>النظام</span>
                </div>
                <span className="text-accent font-medium">نشط</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>آخر فحص</span>
                </div>
                <span className="text-primary font-medium">قبل دقيقتين</span>
              </div>
            </div>
          </Card>

          {/* Access Levels Guide */}
          <Card className="glass-bg p-6">
            <h3 className="text-lg font-semibold mb-4">مستويات الصلاحية</h3>
            <div className="space-y-2">
              {Object.values(accessLevels).map((level) => (
                <div key={level.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                  <span className={`font-medium ${level.color}`}>{level.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {level.areas.length} منطقة
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Access Log */}
          <Card className="glass-bg p-6">
            <h3 className="text-lg font-semibold mb-4">سجل الدخول الأخير</h3>
            <div className="space-y-3">
              {accessLogs.slice(0, 3).map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {log.action === 'granted' ? (
                      <CheckCircle className="w-4 h-4 text-accent" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive" />
                    )}
                    <div>
                      <p className="font-medium">{log.area}</p>
                      {log.reason && (
                        <p className="text-xs text-muted-foreground">{log.reason}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{log.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderProcessingView = () => (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="animate-pulse-glow p-8">
        <Shield className="w-16 h-16 mx-auto text-primary mb-4" />
        <h2 className="text-xl font-semibold mb-2">جاري فحص الصلاحية...</h2>
        <p className="text-muted-foreground">يرجى الانتظار</p>
      </div>
    </div>
  );

  const renderGrantedView = () => (
    <div className="max-w-md mx-auto text-center space-y-6 animate-fade-in">
      <div className="p-8">
        <div className="relative">
          <Unlock className="w-20 h-20 mx-auto text-accent mb-4 animate-pulse-glow" />
          <CheckCircle className="w-8 h-8 absolute -top-2 -right-2 text-accent bg-background rounded-full" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-accent">تم السماح بالدخول</h2>
        <p className="text-muted-foreground">مرحباً بك في {areaInfo.name}</p>
      </div>
      
      {user && (
        <Card className="glass-bg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8 text-accent" />
            <div className="text-right">
              <p className="font-bold text-lg">{user.name}</p>
              <p className={`text-sm ${user.level.color}`}>{user.level.name}</p>
              <p className="text-xs text-muted-foreground">ID: {user.employeeId}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border/50">
            <div className="flex justify-between items-center">
              <span>المنطقة:</span>
              <span className="font-medium">{areaInfo.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>الوقت:</span>
              <span className="font-mono">
                {new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );

  const renderDeniedView = () => (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="p-8">
        <div className="relative">
          <Lock className="w-20 h-20 mx-auto text-destructive mb-4" />
          <XCircle className="w-8 h-8 absolute -top-2 -right-2 text-destructive bg-background rounded-full" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-destructive">تم رفض الدخول</h2>
        <p className="text-muted-foreground">ليس لديك صلاحية للدخول إلى هذه المنطقة</p>
      </div>
      
      <Card className="glass-bg p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-destructive" />
          <span className="font-medium">سبب الرفض</span>
        </div>
        <p className="text-sm text-muted-foreground">
          مستوى الصلاحية الحالي لا يسمح بالدخول إلى {areaInfo.name}
        </p>
      </Card>
      
      <Button 
        variant="biometric" 
        onClick={() => setCurrentStep('scan')}
        className="w-full"
      >
        <Settings className="w-4 h-4 ml-2" />
        العودة للمحاولة مرة أخرى
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            نظام التحكم في الدخول
          </h1>
          <p className="text-muted-foreground mt-2">
            تحكم آمن في الوصول للمناطق المختلفة بتقنية بصمة كف اليد
          </p>
        </div>

        {/* Content based on current step */}
        {currentStep === 'scan' && renderScanView()}
        {currentStep === 'processing' && renderProcessingView()}
        {currentStep === 'granted' && renderGrantedView()}
        {currentStep === 'denied' && renderDeniedView()}
      </div>
    </div>
  );
};