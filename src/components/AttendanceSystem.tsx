import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PalmScanner } from './PalmScanner';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar,
  Timer,
  Coffee,
  LogOut,
  LogIn,
  User,
  Clock3,
  TrendingUp
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  type: 'check-in' | 'check-out' | 'break-start' | 'break-end';
  time: string;
  date: string;
  status: 'success' | 'failed';
}

export const AttendanceSystem: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'scan' | 'processing' | 'success' | 'failed'>('scan');
  const [attendanceType, setAttendanceType] = useState<'check-in' | 'check-out' | 'break'>('check-in');
  const [user, setUser] = useState<{ name: string; department: string; employeeId: string } | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
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
  const [todayRecords, setTodayRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      type: 'check-in',
      time: '08:30',
      date: '2024-03-15',
      status: 'success'
    },
    {
      id: '2',
      type: 'break-start',
      time: '12:15',
      date: '2024-03-15',
      status: 'success'
    },
    {
      id: '3',
      type: 'break-end',
      time: '13:00',
      date: '2024-03-15',
      status: 'success'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScanComplete = async (success: boolean) => {
    setCurrentStep('processing');
    
    if (success && userId) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, department, employee_id')
          .eq('user_id', userId)
          .single();

        // Save attendance record
        const { error } = await supabase
          .from('attendance_records')
          .insert([
            {
              user_id: userId,
              type: attendanceType,
              location: 'الفرع الرئيسي'
            }
          ]);

        setTimeout(() => {
          if (!error) {
            setUser({
              name: profile?.full_name || 'مستخدم النظام',
              department: profile?.department || 'القسم العام',
              employeeId: profile?.employee_id || 'EMP001'
            });
            setCurrentStep('success');
            
            const newRecord: AttendanceRecord = {
              id: Date.now().toString(),
              type: attendanceType === 'break' ? 'break-start' : attendanceType,
              time: currentTime.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
              date: currentTime.toISOString().split('T')[0],
              status: 'success'
            };
            setTodayRecords(prev => [...prev, newRecord]);

            toast({
              title: "تم التسجيل بنجاح",
              description: `تم تسجيل ${attendanceType === 'check-in' ? 'الحضور' : attendanceType === 'check-out' ? 'الانصراف' : 'الاستراحة'} بنجاح`,
            });
            
            setTimeout(() => {
              setCurrentStep('scan');
              setUser(null);
            }, 5000);
          } else {
            throw error;
          }
        }, 2000);
      } catch (error) {
        setCurrentStep('failed');
        toast({
          title: "فشل في التسجيل",
          description: "حدث خطأ أثناء حفظ البيانات",
          variant: "destructive"
        });
        setTimeout(() => setCurrentStep('scan'), 3000);
      }
    } else {
      setTimeout(() => {
        setCurrentStep('failed');
        setTimeout(() => setCurrentStep('scan'), 3000);
      }, 2000);
    }
  };

  const getAttendanceTypeInfo = () => {
    switch (attendanceType) {
      case 'check-in':
        return { 
          title: 'تسجيل الحضور', 
          icon: LogIn, 
          color: 'text-accent',
          bgColor: 'bg-accent/20'
        };
      case 'check-out':
        return { 
          title: 'تسجيل الانصراف', 
          icon: LogOut, 
          color: 'text-destructive',
          bgColor: 'bg-destructive/20'
        };
      case 'break':
        return { 
          title: 'استراحة', 
          icon: Coffee, 
          color: 'text-primary',
          bgColor: 'bg-primary/20'
        };
    }
  };

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'check-in': return <LogIn className="w-4 h-4 text-accent" />;
      case 'check-out': return <LogOut className="w-4 h-4 text-destructive" />;
      case 'break-start': return <Coffee className="w-4 h-4 text-primary" />;
      case 'break-end': return <Clock3 className="w-4 h-4 text-primary" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getRecordLabel = (type: string) => {
    switch (type) {
      case 'check-in': return 'حضور';
      case 'check-out': return 'انصراف';
      case 'break-start': return 'بداية استراحة';
      case 'break-end': return 'نهاية استراحة';
      default: return type;
    }
  };

  const typeInfo = getAttendanceTypeInfo();
  const TypeIcon = typeInfo.icon;

  const renderScanView = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Time Display */}
      <Card className="glass-bg p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">الوقت الحالي</h2>
        </div>
        <div className="text-4xl font-mono font-bold text-primary mb-2">
          {currentTime.toLocaleTimeString('ar-SA')}
        </div>
        <div className="text-lg text-muted-foreground">
          {currentTime.toLocaleDateString('ar-SA', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Scanner Section */}
        <div className="space-y-6">
          {/* Action Selection */}
          <Card className="glass-bg p-6">
            <h3 className="text-lg font-semibold mb-4">اختر نوع العملية</h3>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={attendanceType === 'check-in' ? 'scanner' : 'biometric'}
                onClick={() => setAttendanceType('check-in')}
                className="flex-col h-20 text-sm"
              >
                <LogIn className="w-5 h-5 mb-1" />
                حضور
              </Button>
              <Button
                variant={attendanceType === 'check-out' ? 'scanner' : 'biometric'}
                onClick={() => setAttendanceType('check-out')}
                className="flex-col h-20 text-sm"
              >
                <LogOut className="w-5 h-5 mb-1" />
                انصراف
              </Button>
              <Button
                variant={attendanceType === 'break' ? 'scanner' : 'biometric'}
                onClick={() => setAttendanceType('break')}
                className="flex-col h-20 text-sm"
              >
                <Coffee className="w-5 h-5 mb-1" />
                استراحة
              </Button>
            </div>
          </Card>

          {/* Current Action */}
          <Card className="glass-bg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${typeInfo.bgColor}`}>
                <TypeIcon className={`w-6 h-6 ${typeInfo.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{typeInfo.title}</h3>
                <p className="text-muted-foreground">ضع كف يدك على الماسح</p>
              </div>
            </div>
            <PalmScanner onScanComplete={handleScanComplete} />
          </Card>
        </div>

        {/* Today's Records */}
        <div className="space-y-6">
          <Card className="glass-bg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">سجل اليوم</h3>
            </div>
            
            <div className="space-y-3">
              {todayRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getRecordIcon(record.type)}
                    <div>
                      <p className="font-medium">{getRecordLabel(record.type)}</p>
                      <p className="text-sm text-muted-foreground">{record.time}</p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
              ))}
              
              {todayRecords.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>لا توجد سجلات لهذا اليوم</p>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="glass-bg p-6">
            <h3 className="text-lg font-semibold mb-4">إحصائيات سريعة</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <div className="text-2xl font-bold text-accent">8:30</div>
                <div className="text-sm text-muted-foreground">وقت الحضور</div>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">8:45</div>
                <div className="text-sm text-muted-foreground">ساعات العمل</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderProcessingView = () => (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="animate-pulse-glow p-8">
        <TypeIcon className="w-16 h-16 mx-auto text-primary mb-4" />
        <h2 className="text-xl font-semibold mb-2">جاري التحقق...</h2>
        <p className="text-muted-foreground">يرجى الانتظار</p>
      </div>
    </div>
  );

  const renderSuccessView = () => (
    <div className="max-w-md mx-auto text-center space-y-6 animate-fade-in">
      <div className="p-8">
        <CheckCircle className="w-20 h-20 mx-auto text-accent mb-4 animate-pulse-glow" />
        <h2 className="text-2xl font-bold mb-2 text-accent">تم بنجاح!</h2>
        <p className="text-muted-foreground">{typeInfo.title} مسجل</p>
      </div>
      
      {user && (
        <Card className="glass-bg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            <div className="text-right">
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-muted-foreground">{user.department}</p>
              <p className="text-sm text-muted-foreground">ID: {user.employeeId}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border/50">
            <div className="flex justify-between items-center">
              <span>الوقت:</span>
              <span className="font-mono font-bold">
                {currentTime.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>التاريخ:</span>
              <span>{currentTime.toLocaleDateString('ar-SA')}</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );

  const renderFailedView = () => (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="p-8">
        <XCircle className="w-20 h-20 mx-auto text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-destructive">فشل في التحقق</h2>
        <p className="text-muted-foreground">يرجى المحاولة مرة أخرى</p>
      </div>
      
      <Button 
        variant="biometric" 
        onClick={() => setCurrentStep('scan')}
        className="w-full"
      >
        <Timer className="w-4 h-4 ml-2" />
        إعادة المحاولة
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            نظام الحضور والانصراف
          </h1>
          <p className="text-muted-foreground mt-2">
            تسجيل الحضور والانصراف بتقنية بصمة كف اليد
          </p>
        </div>

        {/* Content based on current step */}
        {currentStep === 'scan' && renderScanView()}
        {currentStep === 'processing' && renderProcessingView()}
        {currentStep === 'success' && renderSuccessView()}
        {currentStep === 'failed' && renderFailedView()}
      </div>
    </div>
  );
};