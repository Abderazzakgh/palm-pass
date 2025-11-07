import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Users,
  Shield,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Key,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  UserPlus,
  UserMinus,
  Building,
  MapPin,
  Clock,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'employee' | 'user';
  department: string;
  isActive: boolean;
  lastActivity: string;
  permissions: string[];
  biometricRegistered: boolean;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'payment' | 'access' | 'attendance' | 'admin';
}

export const UserManagement: React.FC = () => {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  const users: User[] = [
    {
      id: '1',
      name: 'أحمد محمد العلي',
      email: 'ahmed@company.com',
      phone: '+966501234567',
      role: 'admin',
      department: 'تقنية المعلومات',
      isActive: true,
      lastActivity: '2024-03-15 14:30',
      permissions: ['payment', 'access', 'attendance', 'admin'],
      biometricRegistered: true
    },
    {
      id: '2',
      name: 'فاطمة أحمد خالد',
      email: 'fatima@company.com',
      phone: '+966507654321',
      role: 'manager',
      department: 'الموارد البشرية',
      isActive: true,
      lastActivity: '2024-03-15 13:45',
      permissions: ['access', 'attendance'],
      biometricRegistered: true
    },
    {
      id: '3',
      name: 'محمد علي السالم',
      email: 'mohammed@company.com',
      phone: '+966509876543',
      role: 'employee',
      department: 'المالية',
      isActive: false,
      lastActivity: '2024-03-14 09:20',
      permissions: ['access', 'attendance'],
      biometricRegistered: false
    },
    {
      id: '4',
      name: 'سارة عبدالله',
      email: 'sara@company.com',
      phone: '+966502468135',
      role: 'user',
      department: 'التسويق',
      isActive: true,
      lastActivity: '2024-03-15 12:15',
      permissions: ['payment'],
      biometricRegistered: true
    }
  ];

  const permissions: Permission[] = [
    { id: 'payment', name: 'الدفع الإلكتروني', description: 'إجراء عمليات الدفع', category: 'payment' },
    { id: 'access', name: 'التحكم في الدخول', description: 'دخول المناطق المحمية', category: 'access' },
    { id: 'attendance', name: 'تسجيل الحضور', description: 'تسجيل أوقات الحضور والانصراف', category: 'attendance' },
    { id: 'admin', name: 'الإدارة العامة', description: 'إدارة النظام والمستخدمين', category: 'admin' },
    { id: 'reports', name: 'التقارير', description: 'عرض وتصدير التقارير', category: 'admin' },
    { id: 'settings', name: 'الإعدادات', description: 'تعديل إعدادات النظام', category: 'admin' }
  ];

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-destructive/20 text-destructive',
      manager: 'bg-primary/20 text-primary',
      employee: 'bg-accent/20 text-accent',
      user: 'bg-secondary text-secondary-foreground'
    };
    const labels = {
      admin: 'مدير نظام',
      manager: 'مدير',
      employee: 'موظف',
      user: 'مستخدم'
    };
    return (
      <Badge className={colors[role as keyof typeof colors]}>
        {labels[role as keyof typeof labels]}
      </Badge>
    );
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "تم حذف المستخدم",
      description: "تم حذف المستخدم بنجاح من النظام",
    });
  };

  const handleToggleUserStatus = (userId: string, isActive: boolean) => {
    toast({
      title: isActive ? "تم تفعيل المستخدم" : "تم إلغاء تفعيل المستخدم",
      description: `تم ${isActive ? 'تفعيل' : 'إلغاء تفعيل'} المستخدم بنجاح`,
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const renderUsersList = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="glass-bg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="البحث عن المستخدمين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              value={filterRole} 
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md"
            >
              <option value="all">جميع الأدوار</option>
              <option value="admin">مدير نظام</option>
              <option value="manager">مدير</option>
              <option value="employee">موظف</option>
              <option value="user">مستخدم</option>
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

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="glass-bg p-6 hover:shadow-glow transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {user.isActive ? (
                  <CheckCircle className="w-4 h-4 text-accent" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive" />
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">الدور:</span>
                {getRoleBadge(user.role)}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">القسم:</span>
                <span className="text-sm font-medium">{user.department}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">بصمة مسجلة:</span>
                {user.biometricRegistered ? (
                  <Badge className="bg-accent/20 text-accent">مسجلة</Badge>
                ) : (
                  <Badge variant="secondary">غير مسجلة</Badge>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                آخر نشاط: {user.lastActivity}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => setSelectedUser(user)}
              >
                <Edit className="w-3 h-3 ml-1" />
                تعديل
              </Button>
              <Button 
                variant={user.isActive ? "secondary" : "scanner"} 
                size="sm"
                onClick={() => handleToggleUserStatus(user.id, !user.isActive)}
              >
                {user.isActive ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDeleteUser(user.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add User Button */}
      <div className="text-center">
        <Button 
          variant="scanner" 
          size="lg"
          onClick={() => setShowAddUser(true)}
          className="px-8"
        >
          <UserPlus className="w-5 h-5 ml-2" />
          إضافة مستخدم جديد
        </Button>
      </div>
    </div>
  );

  const renderUserDetails = () => {
    if (!selectedUser) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">تفاصيل المستخدم</h2>
          <Button variant="outline" onClick={() => setSelectedUser(null)}>
            العودة للقائمة
          </Button>
        </div>

        <Card className="glass-bg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>الاسم الكامل</Label>
                <Input defaultValue={selectedUser.name} />
              </div>
              <div>
                <Label>البريد الإلكتروني</Label>
                <Input type="email" defaultValue={selectedUser.email} />
              </div>
              <div>
                <Label>رقم الهاتف</Label>
                <Input defaultValue={selectedUser.phone} />
              </div>
              <div>
                <Label>القسم</Label>
                <Input defaultValue={selectedUser.department} />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>الدور الوظيفي</Label>
                <select 
                  defaultValue={selectedUser.role}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md"
                >
                  <option value="admin">مدير نظام</option>
                  <option value="manager">مدير</option>
                  <option value="employee">موظف</option>
                  <option value="user">مستخدم</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <Label>حساب نشط</Label>
                <Switch defaultChecked={selectedUser.isActive} />
              </div>

              <div className="flex items-center justify-between">
                <Label>بصمة مسجلة</Label>
                <Switch defaultChecked={selectedUser.biometricRegistered} />
              </div>

              <div>
                <Label>آخر نشاط</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedUser.lastActivity}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Permissions */}
        <Card className="glass-bg p-6">
          <h3 className="text-lg font-semibold mb-4">الصلاحيات</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {permissions.map((permission) => (
              <div key={permission.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div>
                  <p className="font-medium">{permission.name}</p>
                  <p className="text-xs text-muted-foreground">{permission.description}</p>
                </div>
                <Switch 
                  defaultChecked={selectedUser.permissions.includes(permission.id)}
                />
              </div>
            ))}
          </div>
        </Card>

        <div className="flex gap-4">
          <Button variant="scanner" className="flex-1">
            حفظ التغييرات
          </Button>
          <Button variant="outline" className="flex-1">
            إعادة تعيين كلمة المرور
          </Button>
          <Button variant="destructive" className="flex-1">
            حذف المستخدم
          </Button>
        </div>
      </div>
    );
  };

  const renderPermissions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">إدارة الصلاحيات</h2>
        <Button variant="scanner">
          <Plus className="w-4 h-4 ml-2" />
          إضافة صلاحية
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {permissions.map((permission) => (
          <Card key={permission.id} className="glass-bg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold">{permission.name}</h3>
                <p className="text-sm text-muted-foreground">{permission.description}</p>
              </div>
              <Badge variant="outline">
                {permission.category === 'payment' && 'دفع'}
                {permission.category === 'access' && 'دخول'}
                {permission.category === 'attendance' && 'حضور'}
                {permission.category === 'admin' && 'إدارة'}
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="w-3 h-3 ml-1" />
                تعديل
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRoles = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">إدارة الأدوار</h2>
        <Button variant="scanner">
          <Plus className="w-4 h-4 ml-2" />
          إضافة دور
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { 
            id: 'admin', 
            name: 'مدير النظام', 
            description: 'صلاحيات كاملة للنظام',
            users: users.filter(u => u.role === 'admin').length,
            permissions: ['payment', 'access', 'attendance', 'admin', 'reports', 'settings']
          },
          { 
            id: 'manager', 
            name: 'مدير', 
            description: 'إدارة الموظفين والتقارير',
            users: users.filter(u => u.role === 'manager').length,
            permissions: ['access', 'attendance', 'reports']
          },
          { 
            id: 'employee', 
            name: 'موظف', 
            description: 'وصول أساسي للنظام',
            users: users.filter(u => u.role === 'employee').length,
            permissions: ['access', 'attendance']
          },
          { 
            id: 'user', 
            name: 'مستخدم', 
            description: 'استخدام خدمات الدفع فقط',
            users: users.filter(u => u.role === 'user').length,
            permissions: ['payment']
          }
        ].map((role) => (
          <Card key={role.id} className="glass-bg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold">{role.name}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {role.users} مستخدم مُعيّن
                </p>
              </div>
              {getRoleBadge(role.id)}
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium">الصلاحيات المُعيّنة:</p>
              <div className="flex flex-wrap gap-1">
                {role.permissions.map(permId => {
                  const perm = permissions.find(p => p.id === permId);
                  return perm ? (
                    <Badge key={permId} variant="secondary" className="text-xs">
                      {perm.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="w-3 h-3 ml-1" />
                تعديل
              </Button>
              <Button variant="destructive" size="sm" disabled={role.users > 0}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            إدارة المستخدمين
          </h1>
          <p className="text-muted-foreground mt-2">
            إدارة المستخدمين والصلاحيات والأدوار
          </p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="glass-bg w-full justify-start">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              المستخدمين
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              الصلاحيات
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              الأدوار
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            {selectedUser ? renderUserDetails() : renderUsersList()}
          </TabsContent>

          <TabsContent value="permissions">
            {renderPermissions()}
          </TabsContent>

          <TabsContent value="roles">
            {renderRoles()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};