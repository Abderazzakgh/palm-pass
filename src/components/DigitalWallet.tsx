import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  CreditCard, 
  Wallet, 
  Plus, 
  Settings, 
  Shield, 
  History, 
  Bell,
  User,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Download,
  Upload,
  Smartphone,
  Lock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WalletTransaction {
  id: string;
  type: 'payment' | 'topup' | 'refund' | 'transfer';
  amount: number;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  merchant?: string;
  category?: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'wallet';
  name: string;
  number?: string;
  expiryDate?: string;
  isDefault: boolean;
  isActive: boolean;
}

export const DigitalWallet: React.FC = () => {
  const { toast } = useToast();
  const [balance, setBalance] = useState(1247.85);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [autoTopup, setAutoTopup] = useState(false);

  const [transactions] = useState<WalletTransaction[]>([
    {
      id: '1',
      type: 'payment',
      amount: -45.50,
      description: 'متجر القهوة المحلي',
      timestamp: '2024-03-15 14:32',
      status: 'completed',
      merchant: 'مقهى الأصالة',
      category: 'مطاعم'
    },
    {
      id: '2',
      type: 'topup',
      amount: 500.00,
      description: 'تعبئة رصيد',
      timestamp: '2024-03-15 10:15',
      status: 'completed',
      category: 'تعبئة'
    },
    {
      id: '3',
      type: 'payment',
      amount: -125.00,
      description: 'سوبر ماركت الخليج',
      timestamp: '2024-03-14 19:45',
      status: 'completed',
      merchant: 'سوبر ماركت الخليج',
      category: 'تسوق'
    },
    {
      id: '4',
      type: 'refund',
      amount: 75.00,
      description: 'استرداد - طلب ملغي',
      timestamp: '2024-03-14 16:20',
      status: 'completed',
      category: 'استرداد'
    },
    {
      id: '5',
      type: 'payment',
      amount: -32.75,
      description: 'محطة وقود',
      timestamp: '2024-03-13 08:30',
      status: 'pending',
      merchant: 'أرامكو',
      category: 'وقود'
    }
  ]);

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'بنك الراجحي - ماستركارد',
      number: '**** **** **** 1234',
      expiryDate: '12/26',
      isDefault: true,
      isActive: true
    },
    {
      id: '2',
      type: 'bank',
      name: 'البنك الأهلي السعودي',
      number: '**** **** 5678',
      expiryDate: '',
      isDefault: false,
      isActive: true
    },
    {
      id: '3',
      type: 'wallet',
      name: 'محفظة STC Pay',
      number: '+966 5** *** 789',
      expiryDate: '',
      isDefault: false,
      isActive: false
    }
  ]);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment': return <CreditCard className="w-4 h-4 text-destructive" />;
      case 'topup': return <TrendingUp className="w-4 h-4 text-accent" />;
      case 'refund': return <Upload className="w-4 h-4 text-primary" />;
      case 'transfer': return <Download className="w-4 h-4 text-muted-foreground" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': 
        return <Badge className="bg-accent/20 text-accent text-xs">مكتملة</Badge>;
      case 'pending': 
        return <Badge variant="secondary" className="text-xs">معلقة</Badge>;
      case 'failed': 
        return <Badge variant="destructive" className="text-xs">فاشلة</Badge>;
      default: 
        return <Badge variant="outline" className="text-xs">غير معروف</Badge>;
    }
  };

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case 'card': return <CreditCard className="w-5 h-5" />;
      case 'bank': return <MapPin className="w-5 h-5" />;
      case 'wallet': return <Smartphone className="w-5 h-5" />;
      default: return <Wallet className="w-5 h-5" />;
    }
  };

  const handleTopup = () => {
    toast({
      title: "تعبئة الرصيد",
      description: "سيتم توجيهك لصفحة تعبئة الرصيد قريباً",
    });
  };

  const handleTransfer = () => {
    toast({
      title: "تحويل",
      description: "سيتم إضافة ميزة التحويل قريباً",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          المحفظة الرقمية
        </h1>
        <p className="text-muted-foreground">
          إدارة أموالك بأمان وسهولة
        </p>
      </div>

      {/* Balance Card */}
      <Card className="glass-bg p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">الرصيد الحالي</h2>
                <p className="text-sm text-muted-foreground">محفظة رقمية - بيومترية</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setBalanceVisible(!balanceVisible)}
            >
              {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
          </div>

          <div className="mb-6">
            <div className="text-4xl font-bold mb-2">
              {balanceVisible ? `${balance.toFixed(2)} ريال` : '••••••'}
            </div>
            <div className="flex items-center gap-2 text-sm text-accent">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5% هذا الشهر</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="scanner" onClick={handleTopup} className="flex-1">
              <Plus className="w-4 h-4 ml-1" />
              تعبئة رصيد
            </Button>
            <Button variant="biometric" onClick={handleTransfer} className="flex-1">
              <Download className="w-4 h-4 ml-1" />
              تحويل
            </Button>
            <Button variant="outline" size="sm">
              <History className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">المعاملات</TabsTrigger>
          <TabsTrigger value="methods">طرق الدفع</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <Card className="glass-bg">
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">المعاملات الأخيرة</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 ml-1" />
                  تصدير
                </Button>
              </div>
            </div>
            
            <div className="divide-y divide-border/20">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-secondary/50 transition-smooth">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'payment' ? 'bg-destructive/20' :
                        transaction.type === 'topup' ? 'bg-accent/20' :
                        transaction.type === 'refund' ? 'bg-primary/20' : 'bg-secondary'
                      }`}>
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">{transaction.timestamp}</p>
                          {transaction.category && (
                            <Badge variant="outline" className="text-xs">
                              {transaction.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right flex items-center gap-2">
                      <div>
                        <p className={`font-bold ${
                          transaction.amount > 0 ? 'text-accent' : 'text-foreground'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} ريال
                        </p>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">طرق الدفع</h3>
            <Button variant="biometric">
              <Plus className="w-4 h-4 ml-1" />
              إضافة طريقة جديدة
            </Button>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={`glass-bg p-4 ${
                method.isDefault ? 'ring-2 ring-primary' : ''
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      {getPaymentMethodIcon(method.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{method.name}</p>
                        {method.isDefault && (
                          <Badge className="bg-primary/20 text-primary text-xs">افتراضي</Badge>
                        )}
                        {!method.isActive && (
                          <Badge variant="secondary" className="text-xs">معطل</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{method.number}</p>
                      {method.expiryDate && (
                        <p className="text-xs text-muted-foreground">ينتهي في {method.expiryDate}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="glass-bg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              إعدادات المحفظة
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <div>
                    <p className="font-medium">المصادقة البيومترية</p>
                    <p className="text-sm text-muted-foreground">
                      استخدام بصمة اليد للمعاملات
                    </p>
                  </div>
                </div>
                <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <div>
                    <p className="font-medium">إشعارات المعاملات</p>
                    <p className="text-sm text-muted-foreground">
                      تلقي تنبيهات فورية للمعاملات
                    </p>
                  </div>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5" />
                  <div>
                    <p className="font-medium">التعبئة التلقائية</p>
                    <p className="text-sm text-muted-foreground">
                      تعبئة الرصيد تلقائياً عند انخفاضه
                    </p>
                  </div>
                </div>
                <Switch checked={autoTopup} onCheckedChange={setAutoTopup} />
              </div>
            </div>
          </Card>

          <Card className="glass-bg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              الأمان والخصوصية
            </h3>
            
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 ml-2" />
                تغيير المعلومات الشخصية
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Lock className="w-4 h-4 ml-2" />
                تغيير رمز PIN
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 ml-2" />
                إعادة تسجيل البصمة
              </Button>
              
              <Button variant="destructive" className="w-full justify-start">
                <AlertTriangle className="w-4 h-4 ml-2" />
                تجميد المحفظة
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};