import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function NavigationDropdown() {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate('/')}>
          الرئيسية
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/registration')}>
          التسجيل
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/auth')}>
          تسجيل الدخول
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/link-account')}>
          ربط الحساب
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/privacy')}>
          الخصوصية
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/terms')}>
          الشروط والأحكام
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}