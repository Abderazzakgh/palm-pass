import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Clock,
  Shield,
  CreditCard,
  Users,
  Settings
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'security';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface NotificationSystemProps {
  onClose?: () => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'عملية دفع ناجحة',
      message: 'تم إتمام عملية الدفع بمبلغ 250 ريال بنجاح',
      time: 'منذ دقيقتين',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'security',
      title: 'تسجيل دخول جديد',
      message: 'تم اكتشاف محاولة دخول من جهاز جديد',
      time: 'منذ 10 دقائق',
      read: false,
      priority: 'high'
    },
    {
      id: '3',
      type: 'info',
      title: 'تحديث النظام',
      message: 'تم تحديث نظام الأمان إلى الإصدار 2.1.4',
      time: 'منذ ساعة',
      read: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'warning',
      title: 'صيانة مجدولة',
      message: 'سيتم إجراء صيانة للنظام يوم الجمعة من 2-4 صباحاً',
      time: 'منذ 3 ساعات',
      read: true,
      priority: 'medium'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-accent" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'info': return <Info className="w-5 h-5 text-primary" />;
      case 'security': return <Shield className="w-5 h-5 text-destructive" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-md mx-4">
        <Card className="glass-bg">
          {/* Header */}
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">الإشعارات</h2>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {unreadCount > 0 && (
              <Button 
                variant="link" 
                size="sm" 
                onClick={markAllAsRead}
                className="p-0 h-auto text-xs mt-2"
              >
                تعليم الكل كمقروء
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>لا توجد إشعارات جديدة</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-border/20 transition-smooth ${
                    !notification.read ? 'bg-primary/5' : ''
                  } hover:bg-secondary/50`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium text-sm ${
                            !notification.read ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                          <Badge 
                            variant={notification.priority === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {notification.priority === 'high' ? 'عاجل' : 
                             notification.priority === 'medium' ? 'متوسط' : 'عادي'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-smooth"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-border/50">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="biometric" size="sm">
                <Settings className="w-4 h-4 ml-1" />
                الإعدادات
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 ml-1" />
                إدارة الإشعارات
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};