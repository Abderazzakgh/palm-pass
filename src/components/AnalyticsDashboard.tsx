import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CreditCard, 
  Clock, 
  Shield, 
  Eye,
  Download,
  Calendar,
  DollarSign,
  Activity,
  BarChart3,
  PieChart,
  Target
} from 'lucide-react';

interface AnalyticsData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
  color: string;
}

export const AnalyticsDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  const analyticsData: AnalyticsData[] = [
    {
      title: 'إجمالي المعاملات',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: CreditCard,
      color: 'text-primary'
    },
    {
      title: 'معدل النجاح',
      value: '98.7%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: 'text-accent'
    },
    {
      title: 'المستخدمين النشطين',
      value: '856',
      change: '+8.3%',
      trend: 'up',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'متوسط وقت المعاملة',
      value: '2.3 ثانية',
      change: '-0.5 ثانية',
      trend: 'up',
      icon: Clock,
      color: 'text-accent'
    },
    {
      title: 'إجمالي الإيرادات',
      value: '125,400 ريال',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-primary'
    },
    {
      title: 'حوادث الأمان',
      value: '0',
      change: '0%',
      trend: 'stable',
      icon: Shield,
      color: 'text-accent'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'payment',
      user: 'أحمد محمد',
      amount: '450 ريال',
      time: '14:32',
      status: 'success'
    },
    {
      id: '2',
      type: 'login',
      user: 'فاطمة أحمد',
      amount: '-',
      time: '14:28',
      status: 'success'
    },
    {
      id: '3',
      type: 'payment',
      user: 'محمد علي',
      amount: '125 ريال',
      time: '14:25',
      status: 'success'
    },
    {
      id: '4',
      type: 'failed',
      user: 'سارة خالد',
      amount: '200 ريال',
      time: '14:20',
      status: 'failed'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'payment': return <CreditCard className="w-4 h-4 text-primary" />;
      case 'login': return <Users className="w-4 h-4 text-accent" />;
      case 'failed': return <Shield className="w-4 h-4 text-destructive" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': 
        return <Badge className="bg-accent/20 text-accent">نجح</Badge>;
      case 'failed': 
        return <Badge variant="destructive">فشل</Badge>;
      default: 
        return <Badge variant="secondary">معلق</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            تحليلات النظام
          </h1>
          <p className="text-muted-foreground">
            مراقبة الأداء والإحصائيات المفصلة
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 ml-1" />
            تصدير التقرير
          </Button>
          <Button variant="biometric" size="sm">
            <Eye className="w-4 h-4 ml-1" />
            عرض مباشر
          </Button>
        </div>
      </div>

      {/* Period Selection */}
      <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">اليوم</TabsTrigger>
          <TabsTrigger value="week">هذا الأسبوع</TabsTrigger>
          <TabsTrigger value="month">هذا الشهر</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedPeriod} className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyticsData.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="glass-bg p-6 hover:shadow-glow transition-smooth">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      item.color === 'text-primary' ? 'bg-primary/20' : 'bg-accent/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      item.trend === 'up' ? 'text-accent' : 
                      item.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                    }`}>
                      {item.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                      {item.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                      <span>{item.change}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-2xl font-bold mb-1">{item.value}</p>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <Card className="glass-bg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">أداء المعاملات</h3>
                <Button variant="ghost" size="sm">
                  <BarChart3 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">معاملات ناجحة</span>
                  <span className="text-sm font-medium">98.7%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '98.7%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">معاملات فاشلة</span>
                  <span className="text-sm font-medium">1.3%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-destructive h-2 rounded-full" style={{ width: '1.3%' }}></div>
                </div>
              </div>
            </Card>

            {/* Usage Distribution */}
            <Card className="glass-bg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">توزيع الاستخدام</h3>
                <Button variant="ghost" size="sm">
                  <PieChart className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm">المدفوعات</span>
                  </div>
                  <span className="text-sm font-medium">65%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span className="text-sm">الحضور والانصراف</span>
                  </div>
                  <span className="text-sm font-medium">25%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-muted rounded-full"></div>
                    <span className="text-sm">التحكم في الدخول</span>
                  </div>
                  <span className="text-sm font-medium">10%</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="glass-bg">
            <div className="p-6 border-b border-border/50">
              <h3 className="text-lg font-semibold">النشاط الأخير</h3>
            </div>
            
            <div className="divide-y divide-border/20">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-secondary/50 transition-smooth">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getActivityIcon(activity.type)}
                      <div>
                        <p className="font-medium text-sm">{activity.user}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.type === 'payment' ? 'عملية دفع' : 
                           activity.type === 'login' ? 'تسجيل دخول' : 'عملية فاشلة'}
                          {activity.amount !== '-' && ` - ${activity.amount}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};