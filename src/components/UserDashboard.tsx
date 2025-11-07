import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { 
  User, 
  Wallet, 
  History, 
  Settings, 
  Hand, 
  Plus,
  CreditCard,
  Shield,
  Clock
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'topup';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export const UserDashboard: React.FC = () => {
  const [user, setUser] = useState({
    name: 'مستخدم النظام',
    email: '',
    balance: 0,
    palmPrintRegistered: false,
    memberSince: '2024-01-15'
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, palm_id, created_at')
          .eq('user_id', authUser.id)
          .single();

        const { data: txs } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (profile) {
          setUser({
            name: profile.full_name || 'مستخدم النظام',
            email: authUser.email || '',
            balance: 485.50,
            palmPrintRegistered: !!profile.palm_id,
            memberSince: profile.created_at
          });
        }

        if (txs) {
          setTransactions(txs.map(tx => ({
            id: tx.id,
            type: tx.type === 'payment' ? 'payment' : tx.type === 'topup' ? 'topup' : 'refund',
            amount: tx.type === 'payment' ? -Number(tx.amount) : Number(tx.amount),
            description: tx.description || '',
            date: new Date(tx.created_at).toLocaleDateString('ar-SA'),
            status: tx.status as 'completed' | 'pending' | 'failed'
          })));
        }
      }
    };
    fetchUserData();
  }, []);


  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment': return <CreditCard className="w-4 h-4 text-destructive" />;
      case 'topup': return <Plus className="w-4 h-4 text-accent" />;
      case 'refund': return <Plus className="w-4 h-4 text-accent" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const formatAmount = (amount: number) => {
    const prefix = amount > 0 ? '+' : '';
    return `${prefix}${amount.toFixed(2)} ريال`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-bg border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{user.name}</h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button variant="biometric" size="sm">
              <Settings className="w-4 h-4 ml-2" />
              الإعدادات
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="glass-bg w-full justify-start">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              المعاملات
            </TabsTrigger>
            <TabsTrigger value="biometric" className="flex items-center gap-2">
              <Hand className="w-4 h-4" />
              البيومتري
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Balance Card */}
            <Card className="glass-bg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الرصيد الحالي</p>
                  <p className="text-3xl font-bold text-primary">{user.balance.toFixed(2)} ريال</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="scanner" size="sm">
                    <Plus className="w-4 h-4 ml-2" />
                    شحن الرصيد
                  </Button>
                </div>
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-bg p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">إجمالي المعاملات</p>
                    <p className="text-xl font-bold">{transactions.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="glass-bg p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">حالة الأمان</p>
                    <p className="text-xl font-bold text-accent">محمي</p>
                  </div>
                </div>
              </Card>

              <Card className="glass-bg p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">عضو منذ</p>
                    <p className="text-xl font-bold">{new Date(user.memberSince).toLocaleDateString('ar-SA')}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="glass-bg p-6">
              <h3 className="text-lg font-semibold mb-4">المعاملات الأخيرة</h3>
              <div className="space-y-3">
                {transactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${transaction.amount < 0 ? 'text-destructive' : 'text-accent'}`}>
                      {formatAmount(transaction.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="glass-bg p-6">
              <h3 className="text-lg font-semibold mb-4">تاريخ المعاملات</h3>
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <span className={`font-semibold ${transaction.amount < 0 ? 'text-destructive' : 'text-accent'}`}>
                        {formatAmount(transaction.amount)}
                      </span>
                      <p className="text-xs text-muted-foreground">مكتملة</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="biometric" className="space-y-6">
            <Card className="glass-bg p-6">
              <h3 className="text-lg font-semibold mb-4">إعدادات البيومتري</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-accent/30 rounded-lg bg-accent/5">
                  <div className="flex items-center gap-3">
                    <Hand className="w-6 h-6 text-accent" />
                    <div>
                      <p className="font-medium">بصمة كف اليد</p>
                      <p className="text-sm text-muted-foreground">مسجلة ونشطة</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-accent">نشط</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="biometric" className="h-auto p-4 justify-start">
                    <Plus className="w-4 h-4 ml-2" />
                    <div className="text-right">
                      <p className="font-medium">إضافة بصمة جديدة</p>
                      <p className="text-xs text-muted-foreground">نسخة احتياطية</p>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <Settings className="w-4 h-4 ml-2" />
                    <div className="text-right">
                      <p className="font-medium">إعدادات الأمان</p>
                      <p className="text-xs text-muted-foreground">تخصيص الحماية</p>
                    </div>
                  </Button>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">نصائح الأمان</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• تأكد من نظافة كف اليد قبل المسح</li>
                    <li>• لا تشارك معلومات حسابك مع الآخرين</li>
                    <li>• قم بتحديث بصمتك بانتظام</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};