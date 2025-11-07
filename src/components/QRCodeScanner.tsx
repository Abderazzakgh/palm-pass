import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QRCodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

export const QRCodeScanner = ({ onScanSuccess, onClose }: QRCodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const { toast } = useToast();

  const startScanner = async () => {
    try {
      const html5QrCode = new Html5Qrcode('qr-reader');
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        () => {
          // Scan error - ignore
        }
      );
      
      setIsScanning(true);
    } catch (err) {
      console.error('Error starting scanner:', err);
      toast({
        title: 'خطأ في الكاميرا',
        description: 'تأكد من السماح بالوصول للكاميرا',
        variant: 'destructive',
      });
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    stopScanner();
    onScanSuccess(decodedText);
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">مسح رمز QR</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div id="qr-reader" className="rounded-lg overflow-hidden"></div>

      {!isScanning && (
        <Button onClick={startScanner} className="w-full">
          <Camera className="w-4 h-4 ml-2" />
          بدء المسح
        </Button>
      )}

      {isScanning && (
        <div className="text-center space-y-2">
          <div className="w-full h-1 bg-accent/20 rounded-full overflow-hidden">
            <div className="h-full bg-accent animate-pulse w-1/2"></div>
          </div>
          <p className="text-sm text-muted-foreground">
            وجه الكاميرا نحو رمز QR
          </p>
        </div>
      )}
    </Card>
  );
};