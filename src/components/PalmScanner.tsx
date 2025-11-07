import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Hand, Scan, CheckCircle, AlertCircle } from 'lucide-react';
import handBiometric from '@/assets/hand-biometric.jpg';

interface PalmScannerProps {
  onScanComplete: (success: boolean) => void;
  isScanning?: boolean;
}

export const PalmScanner: React.FC<PalmScannerProps> = ({ 
  onScanComplete, 
  isScanning = false 
}) => {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setScanState('scanning');
    setProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Random success/failure for demo
          const success = Math.random() > 0.2;
          setScanState(success ? 'success' : 'error');
          onScanComplete(success);
          
          // Reset after 3 seconds
          setTimeout(() => {
            setScanState('idle');
            setProgress(0);
          }, 3000);
          
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const getScannerStatus = () => {
    switch (scanState) {
      case 'scanning':
        return { text: 'جاري المسح...', color: 'text-primary', icon: Scan };
      case 'success':
        return { text: 'تم التحقق بنجاح', color: 'text-accent', icon: CheckCircle };
      case 'error':
        return { text: 'فشل في التحقق', color: 'text-destructive', icon: AlertCircle };
      default:
        return { text: 'ضع كف يدك على الماسح', color: 'text-muted-foreground', icon: Hand };
    }
  };

  const status = getScannerStatus();
  const StatusIcon = status.icon;

  return (
    <Card className="glass-bg p-8 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <div className="relative">
          {/* Hand scanner visual */}
          <div className="relative w-48 h-48 mx-auto">
            <div className={`
              absolute inset-0 rounded-full border-4 
              ${scanState === 'scanning' ? 'border-primary animate-pulse-glow' : 'border-border'}
              ${scanState === 'success' ? 'border-accent shadow-accent' : ''}
              ${scanState === 'error' ? 'border-destructive' : ''}
              transition-smooth
            `}>
              <img 
                src={handBiometric} 
                alt="Hand Scanner"
                className="w-full h-full object-cover rounded-full opacity-70"
              />
              
              {/* Scanning overlay */}
              {scanState === 'scanning' && (
                <div className="absolute inset-0">
                  <div className="scanner-gradient rounded-full w-full h-full"></div>
                  <div 
                    className="absolute top-0 left-0 w-full bg-primary/30 transition-all duration-100 ease-linear"
                    style={{ height: `${progress}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary rounded-full animate-scan"></div>
                  </div>
                </div>
              )}
              
              {/* Success ripple effect */}
              {scanState === 'success' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-accent rounded-full animate-ripple"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status display */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <StatusIcon className={`w-5 h-5 ${status.color}`} />
            <span className={`text-sm font-medium ${status.color}`}>
              {status.text}
            </span>
          </div>
          
          {scanState === 'scanning' && (
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Action button */}
        {scanState === 'idle' && (
          <Button 
            variant="scanner" 
            onClick={startScan}
            className="w-full"
            disabled={isScanning}
          >
            <Scan className="w-4 h-4 ml-2" />
            بدء المسح
          </Button>
        )}
        
        {scanState === 'error' && (
          <Button 
            variant="biometric" 
            onClick={startScan}
            className="w-full"
          >
            <Hand className="w-4 h-4 ml-2" />
            إعادة المحاولة
          </Button>
        )}
      </div>
    </Card>
  );
};