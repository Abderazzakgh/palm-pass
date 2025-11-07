import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Shield, 
  Brain, 
  Zap, 
  Eye, 
  Volume2,
  Moon,
  Sun,
  Globe,
  Lock,
  Bell,
  Smartphone,
  Wifi,
  Database,
  Cpu,
  Activity
} from 'lucide-react';

export const SmartSettings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [biometricSensitivity, setBiometricSensitivity] = useState([75]);
  const [autoLock, setAutoLock] = useState(true);
  const [smartDetection, setSmartDetection] = useState(true);
  const [voiceConfirmation, setVoiceConfirmation] = useState(false);
  const [aiAnalytics, setAiAnalytics] = useState(true);

  const securitySettings = [
    {
      title: 'التشفير المتقدم',
      description: 'تشفير AES-256 للبيانات البيومترية',
      enabled: true,
      locked: true
    },
    {
      title: 'المصادقة الثنائية',
      description: 'طبقة حماية إضافية للحسابات الحساسة',
      enabled: autoLock,
      onChange: setAutoLock
    },
    {
      title: 'كشف التلاعب',
      description: 'اكتشاف محاولات التلاعب بالنظام',
      enabled: smartDetection,
      onChange: setSmartDetection
    }
  ];

  const aiFeatures = [
    {
      title: 'التحليل الذكي للسلوك',
      description: 'تحليل أنماط الاستخدام لتحسين الأمان',
      enabled: aiAnalytics,
      onChange: setAiAnalytics,
      beta: true
    },
    {
      title: 'التنبؤ بالأعطال',
      description: 'تحديد المشاكل المحتملة قبل حدوثها',
      enabled: true,
      locked: true,
      beta: true
    },
    {
      title: 'التحسين التلقائي',
      description: 'تحسين الأداء بناءً على البيانات',
      enabled: true,
      locked: true
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          الإعدادات الذكية
        </h1>
        <p className="text-muted-foreground">
          تخصيص النظام وفقاً لاحتياجاتك
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="security">أمان</TabsTrigger>
          <TabsTrigger value="ai">ذكاء اصطناعي</TabsTrigger>
          <TabsTrigger value="advanced">متقدم</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="glass-bg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              الإعدادات العامة
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <div>
                    <p className="font-medium">الوضع المظلم</p>
                    <p className="text-sm text-muted-foreground">
                      واجهة داكنة لراحة أكبر للعينين
                    </p>
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <div>
                    <p className="font-medium">الإشعارات</p>
                    <p className="text-sm text-muted-foreground">
                      تلقي تنبيهات العمليات والأنشطة
                    </p>
                  </div>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5" />
                  <div>
                    <p className="font-medium">التأكيد الصوتي</p>
                    <p className="text-sm text-muted-foreground">
                      تأكيد صوتي للعمليات المهمة
                    </p>
                  </div>
                </div>
                <Switch checked={voiceConfirmation} onCheckedChange={setVoiceConfirmation} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <p className="font-medium">حساسية المسح البيومتري</p>
                </div>
                <div className="space-y-2">
                  <Slider
                    value={biometricSensitivity}
                    onValueChange={setBiometricSensitivity}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>منخفض (أسرع)</span>
                    <span>متوسط</span>
                    <span>عالي (أدق)</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    الحالي: {biometricSensitivity[0]}%
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-bg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              اللغة والمنطقة
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>اللغة الافتراضية</span>
                <Badge variant="outline">العربية</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>المنطقة الزمنية</span>
                <Badge variant="outline">GMT+3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>تنسيق العملة</span>
                <Badge variant="outline">ريال سعودي</Badge>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="glass-bg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              إعدادات الأمان
            </h3>
            
            <div className="space-y-6">
              {securitySettings.map((setting, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5" />
                    <div>
                      <p className="font-medium">{setting.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {setting.locked && (
                      <Badge variant="secondary" className="text-xs">
                        مطلوب
                      </Badge>
                    )}
                    <Switch 
                      checked={setting.enabled} 
                      onCheckedChange={setting.onChange}
                      disabled={setting.locked}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass-bg p-6">
            <h3 className="text-lg font-semibold mb-4">مستوى الأمان الحالي</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>مستوى الحماية</span>
                <Badge className="bg-accent/20 text-accent">ممتاز</Badge>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div className="bg-accent h-3 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <p className="text-sm text-muted-foreground">
                نظامك محمي بأعلى معايير الأمان المتاحة
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* AI Features */}
        <TabsContent value="ai" className="space-y-6">
          <Card className="glass-bg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              ميزات الذكاء الاصطناعي
            </h3>
            
            <div className="space-y-6">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{feature.title}</p>
                        {feature.beta && (
                          <Badge variant="secondary" className="text-xs">
                            تجريبي
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={feature.enabled} 
                    onCheckedChange={feature.onChange}
                    disabled={feature.locked}
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass-bg p-6">
            <h3 className="text-lg font-semibold mb-4">أداء الذكاء الاصطناعي</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>دقة التحليل</span>
                <span className="font-bold text-accent">98.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>سرعة المعالجة</span>
                <span className="font-bold text-primary">1.2 ثانية</span>
              </div>
              <div className="flex justify-between items-center">
                <span>التحسينات المطبقة</span>
                <span className="font-bold">247</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card className="glass-bg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              الإعدادات المتقدمة
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5" />
                  <div>
                    <p className="font-medium">ضغط البيانات</p>
                    <p className="text-sm text-muted-foreground">
                      تحسين استخدام مساحة التخزين
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5" />
                  <div>
                    <p className="font-medium">الشبكة التكيفية</p>
                    <p className="text-sm text-muted-foreground">
                      تحسين الأداء حسب جودة الاتصال
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5" />
                  <div>
                    <p className="font-medium">مراقبة الأداء</p>
                    <p className="text-sm text-muted-foreground">
                      تتبع مفصل لأداء النظام
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="glass-bg p-6">
            <h3 className="text-lg font-semibold mb-4">معلومات النظام</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">إصدار النظام</p>
                <p className="font-bold">2.1.4</p>
              </div>
              <div>
                <p className="text-muted-foreground">آخر تحديث</p>
                <p className="font-bold">15 مارس 2024</p>
              </div>
              <div>
                <p className="text-muted-foreground">حالة الاتصال</p>
                <Badge className="bg-accent/20 text-accent">متصل</Badge>
              </div>
              <div>
                <p className="text-muted-foreground">استخدام الذاكرة</p>
                <p className="font-bold">68%</p>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button variant="destructive" className="flex-1">
              إعادة تعيين المصنع
            </Button>
            <Button variant="biometric" className="flex-1">
              تصدير الإعدادات
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};