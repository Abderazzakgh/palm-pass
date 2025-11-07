import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import savanaLogo from "@/assets/savana-logo.png";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 ml-2" />
          العودة للرئيسية
        </Button>

        <div className="flex items-center gap-4 mb-8">
          <img src={savanaLogo} alt="سافانا" className="w-16 h-16 rounded-xl shadow-glow" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            سياسة الخصوصية
          </h1>
        </div>

        <Card className="p-8 space-y-6 glass-bg">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. المقدمة</h2>
            <p className="text-muted-foreground leading-relaxed">
              نحن في سافانا نلتزم بحماية خصوصيتك وأمان بياناتك البيومترية. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. البيانات التي نجمعها</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="font-semibold text-foreground">2.1 البيانات البيومترية:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>بصمات كف اليد (تُخزَّن بشكل مشفر)</li>
                <li>القوالب البيومترية المُستخلصة من المسح</li>
                <li>معلومات المطابقة والتحقق</li>
              </ul>

              <p className="font-semibold text-foreground mt-4">2.2 البيانات الشخصية:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>الاسم الكامل</li>
                <li>البريد الإلكتروني</li>
                <li>رقم الهاتف</li>
                <li>الصورة الشخصية (اختياري)</li>
                <li>رقم الموظف أو المعرّف الفريد</li>
              </ul>

              <p className="font-semibold text-foreground mt-4">2.3 بيانات المعاملات:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>تاريخ ووقت المعاملات</li>
                <li>المبالغ المالية</li>
                <li>بيانات التاجر</li>
                <li>حالة المعاملة</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. كيفية استخدام البيانات</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
              <li>التحقق من هويتك عند الدفع</li>
              <li>معالجة المعاملات المالية</li>
              <li>تسجيل الحضور والانصراف</li>
              <li>التحكم في الوصول للمناطق المحمية</li>
              <li>تحسين خدماتنا وأمان النظام</li>
              <li>الامتثال للمتطلبات القانونية والتنظيمية</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. حماية البيانات</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="font-semibold text-foreground">4.1 التشفير:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>جميع البيانات البيومترية مشفرة بتقنية AES-256</li>
                <li>الاتصالات محمية بـ TLS/SSL</li>
                <li>تخزين آمن في قواعد بيانات محمية</li>
              </ul>

              <p className="font-semibold text-foreground mt-4">4.2 التحكم في الوصول:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>الوصول محدود للموظفين المصرح لهم فقط</li>
                <li>سجلات تدقيق شاملة لجميع عمليات الوصول</li>
                <li>مصادقة متعددة العوامل للمسؤولين</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. حقوقك</h2>
            <p className="text-muted-foreground mb-3">بموجب قانون حماية البيانات الشخصية السعودي (PDPL)، لديك الحق في:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
              <li>الوصول إلى بياناتك الشخصية</li>
              <li>تصحيح البيانات غير الدقيقة</li>
              <li>حذف بياناتك (حق النسيان)</li>
              <li>الاعتراض على معالجة بياناتك</li>
              <li>نقل بياناتك إلى مزود خدمة آخر</li>
              <li>سحب موافقتك في أي وقت</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. مشاركة البيانات</h2>
            <p className="text-muted-foreground leading-relaxed">
              لا نشارك بياناتك البيومترية مع أطراف ثالثة إلا في الحالات التالية:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4 mt-3">
              <li>بموافقتك الصريحة</li>
              <li>للامتثال للمتطلبات القانونية</li>
              <li>لحماية حقوقنا وسلامتنا</li>
              <li>مع مزودي الخدمات الموثوقين (تحت اتفاقيات سرية صارمة)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">7. الاحتفاظ بالبيانات</h2>
            <p className="text-muted-foreground leading-relaxed">
              نحتفظ بالبيانات البيومترية طالما كان حسابك نشطاً. عند حذف حسابك:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4 mt-3">
              <li>يتم حذف جميع البيانات البيومترية فوراً</li>
              <li>نحتفظ ببعض البيانات المالية للامتثال القانوني (7 سنوات)</li>
              <li>يمكنك طلب حذف جميع البيانات في أي وقت</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">8. ملفات تعريف الارتباط (Cookies)</h2>
            <p className="text-muted-foreground leading-relaxed">
              نستخدم ملفات تعريف الارتباط الأساسية فقط لضمان عمل النظام. لا نستخدم ملفات تعريف ارتباط تتبعية أو إعلانية.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">9. اتصل بنا</h2>
            <p className="text-muted-foreground leading-relaxed">
              للاستفسارات حول خصوصيتك أو لممارسة حقوقك:
            </p>
            <div className="mt-3 p-4 bg-muted/50 rounded-lg space-y-2">
              <p className="text-foreground font-semibold">مسؤول حماية البيانات</p>
              <p className="text-muted-foreground">البريد الإلكتروني: privacy@savana.sa</p>
              <p className="text-muted-foreground">الهاتف: 920000000</p>
              <p className="text-muted-foreground">العنوان: الرياض، المملكة العربية السعودية</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">10. التحديثات</h2>
            <p className="text-muted-foreground leading-relaxed">
              قد نقوم بتحديث هذه السياسة من وقت لآخر. سنخطرك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار في التطبيق.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
