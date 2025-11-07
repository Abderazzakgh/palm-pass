import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database,
  Server,
  Shield,
  Zap,
  Cloud,
  CheckCircle,
  AlertTriangle,
  Settings,
  Code,
  Key,
  Users,
  CreditCard,
  FileText,
  Activity,
  Lock,
  Globe,
  Smartphone,
  Clock
} from 'lucide-react';

interface IntegrationStatus {
  service: string;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  description: string;
  icon: React.ReactNode;
}

export const SystemIntegration: React.FC = () => {
  const [integrations] = useState<IntegrationStatus[]>([
    {
      service: 'Supabase Database',
      status: 'pending',
      description: 'قاعدة البيانات الرئيسية للمستخدمين والمعاملات',
      icon: <Database className="w-5 h-5" />
    },
    {
      service: 'Authentication Service',
      status: 'pending',
      description: 'خدمة المصادقة والتحقق من الهوية',
      icon: <Shield className="w-5 h-5" />
    },
    {
      service: 'Payment Gateway',
      status: 'pending',
      description: 'بوابة الدفع الإلكتروني',
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      service: 'File Storage',
      status: 'pending',
      description: 'تخزين الملفات والصور',
      icon: <FileText className="w-5 h-5" />
    },
    {
      service: 'Real-time Features',
      status: 'pending',
      description: 'الميزات الفورية والإشعارات',
      icon: <Zap className="w-5 h-5" />
    },
    {
      service: 'Edge Functions',
      status: 'pending',
      description: 'دوال الخادم والمعالجة الخلفية',
      icon: <Code className="w-5 h-5" />
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-accent';
      case 'error': return 'text-destructive';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4 text-accent" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'pending': return <Clock className="w-4 h-4 text-muted-foreground" />;
      default: return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            تكامل النظام
          </h1>
          <p className="text-muted-foreground">
            إعداد وربط جميع الخدمات اللازمة لتشغيل النظام
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="glass-bg w-full justify-start">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              قاعدة البيانات
            </TabsTrigger>
            <TabsTrigger value="auth" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              المصادقة
            </TabsTrigger>
            <TabsTrigger value="apis" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              APIs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Supabase Integration Call-to-Action */}
            <Card className="glass-bg p-8 text-center border-primary/30">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Cloud className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">ربط المشروع مع Supabase</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                لتفعيل جميع ميزات النظام مثل قاعدة البيانات، المصادقة، وتخزين الملفات، 
                يجب ربط المشروع مع Supabase أولاً.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="scanner" size="lg" className="px-8">
                  <Database className="w-5 h-5 ml-2" />
                  ربط مع Supabase
                </Button>
                <Button variant="outline" size="lg">
                  <FileText className="w-5 h-5 ml-2" />
                  دليل التكامل
                </Button>
              </div>
            </Card>

            {/* Integration Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration) => (
                <Card key={integration.service} className="glass-bg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                        {integration.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{integration.service}</h4>
                      </div>
                    </div>
                    {getStatusIcon(integration.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {integration.description}
                  </p>
                  <Badge 
                    variant={integration.status === 'connected' ? 'default' : 'secondary'}
                    className={`${getStatusColor(integration.status)}`}
                  >
                    {integration.status === 'connected' ? 'متصل' :
                     integration.status === 'error' ? 'خطأ' :
                     integration.status === 'pending' ? 'في الانتظار' : 'منفصل'}
                  </Badge>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            <Card className="glass-bg p-6">
              <h3 className="text-xl font-semibold mb-4">إعداد قاعدة البيانات</h3>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <h4 className="font-medium mb-2">الجداول المطلوبة:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• users - بيانات المستخدمين</li>
                    <li>• biometric_data - بيانات البصمات</li>
                    <li>• transactions - المعاملات المالية</li>
                    <li>• attendance_records - سجلات الحضور</li>
                    <li>• access_logs - سجلات الدخول</li>
                    <li>• notifications - الإشعارات</li>
                  </ul>
                </div>
                <Button variant="outline" className="w-full">
                  <Database className="w-4 h-4 ml-2" />
                  إنشاء الجداول تلقائياً
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="auth" className="space-y-6">
            <Card className="glass-bg p-6">
              <h3 className="text-xl font-semibold mb-4">إعداد المصادقة</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <h4 className="font-medium">المصادقة البيومترية</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      تسجيل وتحقق من بصمات كف اليد
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="w-4 h-4 text-primary" />
                      <h4 className="font-medium">المصادقة التقليدية</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      البريد الإلكتروني وكلمة المرور
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 ml-2" />
                  تكوين إعدادات المصادقة
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="apis" className="space-y-6">
            <Card className="glass-bg p-6">
              <h3 className="text-xl font-semibold mb-4">APIs والدوال</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-medium mb-2">Edge Functions</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• process-payment</li>
                      <li>• biometric-auth</li>
                      <li>• send-notifications</li>
                      <li>• generate-reports</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-medium mb-2">External APIs</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Payment Gateway</li>
                      <li>• SMS Service</li>
                      <li>• Email Service</li>
                      <li>• AI/ML Services</li>
                    </ul>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Code className="w-4 h-4 ml-2" />
                  إنشاء Edge Functions
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Card className="glass-bg p-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">النظام جاهز للإنتاج</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              بعد ربط Supabase، سيكون النظام جاهزاً للاستخدام في بيئة الإنتاج
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="scanner">
                <Smartphone className="w-4 h-4 ml-2" />
                تجربة النظام
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 ml-2" />
                التوثيق
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};