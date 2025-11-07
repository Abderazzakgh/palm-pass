import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Database,
  Server,
  Activity,
  BarChart3,
  Download,
  Upload,
  RefreshCw,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Cpu,
  Wifi,
  Shield,
  FileText,
  Calendar,
  Filter
} from 'lucide-react';

interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  service: string;
  message: string;
  details?: string;
}

interface BackupItem {
  id: string;
  name: string;
  size: string;
  date: string;
  type: 'automatic' | 'manual';
  status: 'completed' | 'in_progress' | 'failed';
}

export const SystemMonitoring: React.FC = () => {
  const [selectedLogLevel, setSelectedLogLevel] = useState<string>('all');
  const [searchLogs, setSearchLogs] = useState('');

  const systemLogs: SystemLog[] = [
    {
      id: '1',
      timestamp: '2024-03-15 14:35:22',
      level: 'info',
      service: 'Authentication',
      message: 'User login successful',
      details: 'User: ahmed@company.com, IP: 192.168.1.100'
    },
    {
      id: '2',
      timestamp: '2024-03-15 14:34:15',
      level: 'warning',
      service: 'Payment',
      message: 'Payment processing delay detected',
      details: 'Transaction ID: TXN123456, Delay: 5.2s'
    },
    {
      id: '3',
      timestamp: '2024-03-15 14:33:08',
      level: 'error',
      service: 'Biometric',
      message: 'Biometric scanner connection failed',
      details: 'Device: Scanner-03, Location: Main Entrance'
    },
    {
      id: '4',
      timestamp: '2024-03-15 14:32:45',
      level: 'info',
      service: 'Database',
      message: 'Automated backup completed',
      details: 'Backup size: 2.3GB, Duration: 45s'
    },
    {
      id: '5',
      timestamp: '2024-03-15 14:31:30',
      level: 'debug',
      service: 'API',
      message: 'Rate limit threshold reached',
      details: 'Endpoint: /api/auth/verify, Client: mobile-app'
    }
  ];

  const backups: BackupItem[] = [
    {
      id: '1',
      name: 'النسخ الاحتياطي اليومي',
      size: '2.3 GB',
      date: '2024-03-15 02:00:00',
      type: 'automatic',
      status: 'completed'
    },
    {
      id: '2',
      name: 'نسخة احتياطية يدوية',
      size: '2.1 GB',
      date: '2024-03-14 16:30:00',
      type: 'manual',
      status: 'completed'
    },
    {
      id: '3',
      name: 'النسخ الاحتياطي الأسبوعي',
      size: '15.7 GB',
      date: '2024-03-10 01:00:00',
      type: 'automatic',
      status: 'completed'
    },
    {
      id: '4',
      name: 'نسخة احتياطية طوارئ',
      size: '1.8 GB',
      date: '2024-03-15 14:20:00',
      type: 'manual',
      status: 'in_progress'
    }
  ];

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-destructive';
      case 'warning': return 'text-yellow-500';
      case 'info': return 'text-accent';
      case 'debug': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getLogLevelBadge = (level: string) => {
    const colors = {
      error: 'bg-destructive/20 text-destructive',
      warning: 'bg-yellow-500/20 text-yellow-500',
      info: 'bg-accent/20 text-accent',
      debug: 'bg-muted text-muted-foreground'
    };
    return <Badge className={colors[level as keyof typeof colors]}>{level.toUpperCase()}</Badge>;
  };

  const getBackupStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-accent" />;
      case 'in_progress': return <RefreshCw className="w-4 h-4 text-primary animate-spin" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const filteredLogs = systemLogs.filter(log => {
    const matchesLevel = selectedLogLevel === 'all' || log.level === selectedLogLevel;
    const matchesSearch = log.message.toLowerCase().includes(searchLogs.toLowerCase()) ||
                         log.service.toLowerCase().includes(searchLogs.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const renderSystemStatus = () => (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-bg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">استخدام المعالج</p>
              <p className="text-2xl font-bold text-accent">23%</p>
              <p className="text-xs text-accent">طبيعي</p>
            </div>
            <Cpu className="w-8 h-8 text-accent/30" />
          </div>
        </Card>

        <Card className="glass-bg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">استخدام الذاكرة</p>
              <p className="text-2xl font-bold text-primary">68%</p>
              <p className="text-xs text-primary">جيد</p>
            </div>
            <HardDrive className="w-8 h-8 text-primary/30" />
          </div>
        </Card>

        <Card className="glass-bg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">مساحة التخزين</p>
              <p className="text-2xl font-bold text-destructive">87%</p>
              <p className="text-xs text-destructive">يحتاج تنظيف</p>
            </div>
            <Database className="w-8 h-8 text-destructive/30" />
          </div>
        </Card>

        <Card className="glass-bg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">حالة الشبكة</p>
              <p className="text-2xl font-bold text-accent">99.9%</p>
              <p className="text-xs text-accent">مستقر</p>
            </div>
            <Wifi className="w-8 h-8 text-accent/30" />
          </div>
        </Card>
      </div>

      {/* Services Status */}
      <Card className="glass-bg p-6">
        <h3 className="text-lg font-semibold mb-4">حالة الخدمات</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'خدمة المصادقة', status: 'running', uptime: '99.97%' },
            { name: 'قاعدة البيانات', status: 'running', uptime: '99.99%' },
            { name: 'خدمة الدفع', status: 'running', uptime: '99.95%' },
            { name: 'API Gateway', status: 'running', uptime: '99.98%' },
            { name: 'خدمة الإشعارات', status: 'warning', uptime: '98.45%' },
            { name: 'خدمة النسخ الاحتياطي', status: 'running', uptime: '100%' }
          ].map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  service.status === 'running' ? 'bg-accent' : 
                  service.status === 'warning' ? 'bg-yellow-500' : 'bg-destructive'
                }`}></div>
                <div>
                  <p className="font-medium text-sm">{service.name}</p>
                  <p className="text-xs text-muted-foreground">Uptime: {service.uptime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Metrics */}
      <Card className="glass-bg p-6">
        <h3 className="text-lg font-semibold mb-4">مقاييس الأداء</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">1.2s</p>
            <p className="text-sm text-muted-foreground">متوسط زمن الاستجابة</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">456</p>
            <p className="text-sm text-muted-foreground">الطلبات في الدقيقة</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-destructive">0.02%</p>
            <p className="text-sm text-muted-foreground">معدل الأخطاء</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderLogs = () => (
    <div className="space-y-6">
      {/* Log Filters */}
      <Card className="glass-bg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Input
                placeholder="البحث في السجلات..."
                value={searchLogs}
                onChange={(e) => setSearchLogs(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              value={selectedLogLevel} 
              onChange={(e) => setSelectedLogLevel(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md"
            >
              <option value="all">جميع المستويات</option>
              <option value="error">أخطاء</option>
              <option value="warning">تحذيرات</option>
              <option value="info">معلومات</option>
              <option value="debug">تصحيح</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 ml-2" />
              تصفية
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </Button>
          </div>
        </div>
      </Card>

      {/* Logs List */}
      <Card className="glass-bg p-6">
        <h3 className="text-lg font-semibold mb-4">سجلات النظام</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-muted-foreground font-mono">
                      {log.timestamp}
                    </span>
                    {getLogLevelBadge(log.level)}
                    <Badge variant="outline" className="text-xs">
                      {log.service}
                    </Badge>
                  </div>
                  <p className={`font-medium ${getLogLevelColor(log.level)}`}>
                    {log.message}
                  </p>
                  {log.details && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {log.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderBackups = () => (
    <div className="space-y-6">
      {/* Backup Settings */}
      <Card className="glass-bg p-6">
        <h3 className="text-lg font-semibold mb-4">إعدادات النسخ الاحتياطي</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>تكرار النسخ التلقائي</Label>
              <select className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md">
                <option>يومي في 2:00 ص</option>
                <option>كل 12 ساعة</option>
                <option>أسبوعي</option>
                <option>شهري</option>
              </select>
            </div>
            <div>
              <Label>مدة الاحتفاظ</Label>
              <select className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md">
                <option>30 يوم</option>
                <option>60 يوم</option>
                <option>90 يوم</option>
                <option>سنة واحدة</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>موقع التخزين</Label>
              <select className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md">
                <option>التخزين المحلي</option>
                <option>Amazon S3</option>
                <option>Google Cloud</option>
                <option>Azure Blob</option>
              </select>
            </div>
            <Button variant="scanner" className="w-full">
              <Upload className="w-4 h-4 ml-2" />
              إنشاء نسخة احتياطية الآن
            </Button>
          </div>
        </div>
      </Card>

      {/* Backup History */}
      <Card className="glass-bg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">سجل النسخ الاحتياطية</h3>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 ml-2" />
            تحديث
          </Button>
        </div>
        
        <div className="space-y-3">
          {backups.map((backup) => (
            <div key={backup.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-4">
                {getBackupStatusIcon(backup.status)}
                <div>
                  <p className="font-medium">{backup.name}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{backup.date}</span>
                    <span>{backup.size}</span>
                    <Badge variant={backup.type === 'automatic' ? 'default' : 'secondary'} className="text-xs">
                      {backup.type === 'automatic' ? 'تلقائي' : 'يدوي'}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-3 h-3 ml-1" />
                  تحميل
                </Button>
                <Button variant="scanner" size="sm">
                  استعادة
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Report Generator */}
      <Card className="glass-bg p-6">
        <h3 className="text-lg font-semibold mb-4">إنشاء التقارير</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>نوع التقرير</Label>
              <select className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md">
                <option>تقرير الأداء اليومي</option>
                <option>تقرير الأمان الأسبوعي</option>
                <option>تقرير الاستخدام الشهري</option>
                <option>تقرير الأخطاء</option>
              </select>
            </div>
            <div>
              <Label>الفترة الزمنية</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Input type="date" />
                <Input type="date" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>تنسيق التصدير</Label>
              <select className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
                <option>JSON</option>
              </select>
            </div>
            <Button variant="scanner" className="w-full">
              <BarChart3 className="w-4 h-4 ml-2" />
              إنشاء التقرير
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent Reports */}
      <Card className="glass-bg p-6">
        <h3 className="text-lg font-semibold mb-4">التقارير الحديثة</h3>
        <div className="space-y-3">
          {[
            { name: 'تقرير الأداء اليومي - 15 مارس', date: '2024-03-15', size: '2.3 MB', format: 'PDF' },
            { name: 'تقرير الأمان الأسبوعي', date: '2024-03-14', size: '5.7 MB', format: 'Excel' },
            { name: 'تقرير الاستخدام الشهري - فبراير', date: '2024-03-01', size: '12.4 MB', format: 'PDF' },
            { name: 'تقرير الأخطاء - مارس', date: '2024-03-13', size: '890 KB', format: 'CSV' }
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{report.name}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{report.date}</span>
                    <span>{report.size}</span>
                    <Badge variant="outline" className="text-xs">
                      {report.format}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-3 h-3 ml-1" />
                  تحميل
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            مراقبة النظام
          </h1>
          <p className="text-muted-foreground mt-2">
            مراقبة أداء النظام والسجلات والنسخ الاحتياطية
          </p>
        </div>

        <Tabs defaultValue="status" className="space-y-6">
          <TabsList className="glass-bg w-full justify-start">
            <TabsTrigger value="status" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              حالة النظام
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              السجلات
            </TabsTrigger>
            <TabsTrigger value="backups" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              النسخ الاحتياطية
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              التقارير
            </TabsTrigger>
          </TabsList>

          <TabsContent value="status">
            {renderSystemStatus()}
          </TabsContent>

          <TabsContent value="logs">
            {renderLogs()}
          </TabsContent>

          <TabsContent value="backups">
            {renderBackups()}
          </TabsContent>

          <TabsContent value="reports">
            {renderReports()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};