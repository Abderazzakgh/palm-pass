import { QRCodeSVG } from 'qrcode.react';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QRCodeGeneratorProps {
  value: string;
  title?: string;
  size?: number;
}

export const QRCodeGenerator = ({ value, title, size = 256 }: QRCodeGeneratorProps) => {
  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = 'palm-registration-qr.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <Card className="p-8 text-center space-y-4 glass-bg">
      {title && (
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      )}
      
      <div className="flex justify-center p-6 bg-white rounded-xl">
        <QRCodeSVG
          id="qr-code-svg"
          value={value}
          size={size}
          level="H"
          includeMargin={true}
        />
      </div>
      
      <p className="text-sm text-muted-foreground">
        امسح هذا الرمز باستخدام تطبيق الجوال لإكمال التسجيل
      </p>
      
      <Button onClick={downloadQR} variant="outline" className="w-full">
        <Download className="w-4 h-4 ml-2" />
        تحميل رمز QR
      </Button>
    </Card>
  );
};