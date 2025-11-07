import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3,
  Users,
  Building,
  Shield,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  MapPin,
  Activity,
  Settings,
  Download,
  Filter
} from 'lucide-react';

interface SystemStats {
  totalUsers: number;
  activeDevices: number;
  todayTransactions: number;
  successRate: number;
  monthlyRevenue: number;
  averageResponseTime: number;
}

interface RecentActivity {
  id: string;
  type: 'payment' | 'attendance' | 'access' | 'registration';
  user: string;
  location: string;
  time: string;
  status: 'success' | 'failed' | 'pending';
  amount?: number;
}

export const AdminDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  
  const stats: SystemStats = {
    totalUsers: 1247,
    activeDevices: 23,
    todayTransactions: 456,
    successRate: 98.5,
    monthlyRevenue: 125400,
    averageResponseTime: 1.2
  };

  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      type: 'payment',
      user: 'أحمد محمد',
      location: 'مقهى الواحة - الفرع الرئيسي',
      time: '14:35',
      status: 'success',
      amount: 45.50
    },
    {
      id: '2',
      type: 'attendance',
      user: 'سارة أحمد',
      location: 'شركة التقنية المتطورة',
      time: '14:30',
      status: 'success'
    },
    {
      id: '3',
      type: 'access',
      user: 'محمد علي',
      location: 'غرفة الخوادم - الطابق الثالث',
      time: '14:25',
      status: 'failed'
    },
    {
      id: '4',
      type: 'payment',
      user: 'فاطمة خالد',
      location: 'متجر الإلكترونيات',
      time: '14:20',
      status: 'success',
      amount: 230.00
    },
    {
      id: '5',
      type: 'registration',
      user: 'عبدالله سعد',
      location: 'فرع الرياض',
      time: '14:15',
      status: 'pending'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'payment': return <DollarSign className="w-4 h-4 text-primary" />;
      case 'attendance': return <Clock className="w-4 h-4 text-accent" />;
      case 'access': return <Shield className="w-4 h-4 text-destructive" />;
      case 'registration': return <Users className="w-4 h-4 text-muted-foreground" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'payment': return 'دفع';
      case 'attendance': return 'حضور';
      case 'access': return 'دخول';
      case 'registration': return 'تسجيل';
      default: return type;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-accent" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'pending': return <Clock className="w-4 h-4 text-primary" />;
      default: return null;
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-bg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">إجمالي المستخدمين</p>
              <p className="text-3xl font-bold text-primary">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-accent flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% من الشهر الماضي
              </p>
            </div>
            <Users className="w-12 h-12 text-primary/30" />
          </div>
        </Card>

        <Card className="glass-bg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">الأجهزة النشطة</p>
              <p className="text-3xl font-bold text-accent">{stats.activeDevices}</p>
              <p className="text-sm text-accent">متصل الآن</p>
            </div>
            <Building className="w-12 h-12 text-accent/30" />
          </div>
        </Card>

        <Card className="glass-bg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">معاملات اليوم</p>
              <p className="text-3xl font-bold text-destructive">{stats.todayTransactions}</p>
              <p className="text-sm text-accent flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +8% من الأمس
              </p>
            </div>
            <BarChart3 className="w-12 h-12 text-destructive/30" />
          </div>
        </Card>

        <Card className="glass-bg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">معدل النجاح</p>
              <p className="text-3xl font-bold text-accent">{stats.successRate}%</p>
              <p className="text-sm text-accent">أداء ممتاز</p>
            </div>
            <CheckCircle className="w-12 h-12 text-accent/30" />
          </div>
        </Card>

        <Card className="glass-bg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">الإيرادات الشهرية</p>
              <p className="text-3xl font-bold text-primary">{stats.monthlyRevenue.toLocaleString()} ريال</p>
              <p className="text-sm text-accent flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +15% نمو
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-primary/30" />
          </div>
        </Card>

        <Card className="glass-bg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">زمن الاستجابة</p>
              <p className="text-3xl font-bold text-accent">{stats.averageResponseTime}s</p>
              <p className="text-sm text-accent">متوسط</p>
            </div>
            <Activity className="w-12 h-12 text-accent/30" />
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-bg p-6">
          <h3 className="text-lg font-semibold mb-4">المعاملات اليومية</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[120, 150, 180, 200, 170, 190, 230].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full tech-gradient rounded-t-lg"
                  style={{ height: `${(height / 230) * 100}%` }}
                ></div>
                <span className="text-xs text-muted-foreground mt-2">
                  {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'][index]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-bg p-6">
          <h3 className="text-lg font-semibold mb-4">توزيع أنواع المعاملات</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span>الدفع الإلكتروني</span>
              </div>
              <span className="font-semibold">65%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-accent rounded"></div>
                <span>الحضور والانصراف</span>
              </div>
              <span className="font-semibold">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-destructive rounded"></div>
                <span>التحكم في الدخول</span>
              </div>
              <span className="font-semibold">10%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="glass-bg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">النشاط المباشر</h3>
          <div className="flex gap-2">
            <Button variant="biometric" size="sm">
              <Filter className="w-4 h-4 ml-2" />
              تصفية
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </Button>
          </div>
        </div>
        
        <div className="flex gap-4">
          {['today', 'week', 'month'].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'scanner' : 'biometric'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period === 'today' && 'اليوم'}
              {period === 'week' && 'هذا الأسبوع'}
              {period === 'month' && 'هذا الشهر'}
            </Button>
          ))}
        </div>
      </Card>

      {/* Activity List */}
      <Card className="glass-bg p-6">
        <h3 className="text-lg font-semibold mb-4">آخر العمليات</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getActivityIcon(activity.type)}
                  {getStatusIcon(activity.status)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-sm bg-primary/20 text-primary px-2 py-1 rounded">
                      {getActivityLabel(activity.type)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {activity.location}
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div className="font-medium">{activity.time}</div>
                {activity.amount && (
                  <div className="text-sm text-accent">{activity.amount} ريال</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderSystemTab = () => (
    <div className="space-y-6">
      {/* System Health */}
      <Card className="glass-bg p-6">
        <h3 className="text-lg font-semibold mb-4">حالة النظام</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
              <span>خدمة المصادقة</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-accent text-sm">نشط</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
              <span>قاعدة البيانات</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-accent text-sm">نشط</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
              <span>خدمة الدفع</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-primary text-sm">نشط</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
              <span>استخدام المعالج</span>
              <span className="text-accent font-medium">23%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
              <span>استخدام الذاكرة</span>
              <span className="text-primary font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
              <span>مساحة التخزين</span>
              <span className="text-accent font-medium">67%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Connected Devices */}
      <Card className="glass-bg p-6">
        <h3 className="text-lg font-semibold mb-4">الأجهزة المتصلة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'جهاز المدخل الرئيسي', location: 'الدور الأرضي', status: 'online', lastSeen: '2 دقائق' },
            { name: 'جهاز المقهى', location: 'الطابق الأول', status: 'online', lastSeen: '5 دقائق' },
            { name: 'جهاز غرفة الخوادم', location: 'الطابق الثالث', status: 'offline', lastSeen: '1 ساعة' },
            { name: 'جهاز القسم المالي', location: 'الطابق الثاني', status: 'online', lastSeen: '1 دقيقة' },
            { name: 'جهاز الموارد البشرية', location: 'الطابق الثاني', status: 'online', lastSeen: '3 دقائق' },
            { name: 'جهاز الاستقبال', location: 'الدور الأرضي', status: 'maintenance', lastSeen: '30 دقيقة' }
          ].map((device, index) => (
            <Card key={index} className="glass-bg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{device.name}</h4>
                <div className={`w-2 h-2 rounded-full ${
                  device.status === 'online' ? 'bg-accent' :
                  device.status === 'offline' ? 'bg-destructive' : 'bg-primary'
                }`}></div>
              </div>
              <p className="text-sm text-muted-foreground">{device.location}</p>
              <p className="text-xs text-muted-foreground">آخر اتصال: {device.lastSeen}</p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              لوحة التحكم الإدارية
            </h1>
            <p className="text-muted-foreground mt-2">
              إدارة ومراقبة أنظمة المصادقة البيومترية
            </p>
          </div>
          <Button variant="scanner">
            <Settings className="w-4 h-4 ml-2" />
            إعدادات النظام
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="glass-bg w-full justify-start">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              النشاط المباشر
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              حالة النظام
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {renderOverviewTab()}
          </TabsContent>

          <TabsContent value="activity">
            {renderActivityTab()}
          </TabsContent>

          <TabsContent value="system">
            {renderSystemTab()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};