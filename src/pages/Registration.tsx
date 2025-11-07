import { PalmRegistration } from '@/components/PalmRegistration';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import savanaLogo from '@/assets/savana-logo.png';

export default function Registration() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={savanaLogo} alt="Savana Logo" className="h-10" />
            <h1 className="text-xl font-bold text-foreground">سافانا</h1>
          </div>

          {/* زر العودة فقط */}
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة للرئيسية
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <PalmRegistration />
      </main>
    </div>
  );
}
