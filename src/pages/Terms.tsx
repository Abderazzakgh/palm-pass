import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import savanaLogo from "@/assets/savana-logo.png";

const Terms = () => {
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
            شروط الاستخدام
          </h1>
        </div>

        <Card className="p-8 space-y-6 glass-bg">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. القبول بالشروط</h2>
            <p className="text-muted-foreground leading-relaxed">
              باستخدامك لنظام سافانا للدفع البيومتري، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام النظام.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. الأهلية</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>للاستخدام الشخصي، يجب أن:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>تكون بعمر 18 عاماً أو أكثر</li>
                <li>تمتلك الأهلية القانونية للدخول في عقد ملزم</li>
                <li>لا تكون محظوراً من استخدام خدماتنا بموجب القوانين السعودية</li>
                <li>تقدم معلومات دقيقة وكاملة عند التسجيل</li>
              </ul>
              
              <p className="mt-4">للاستخدام المؤسسي، يجب أن:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>تمثل كياناً قانونياً مسجلاً</li>
                <li>تمتلك الصلاحيات اللازمة للتعاقد نيابة عن المؤسسة</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. التسجيل والحساب</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="font-semibold text-foreground">3.1 عملية التسجيل:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>يجب تقديم معلومات دقيقة وحديثة</li>
                <li>يجب توفير بصمة كف يد واضحة وقابلة للاستخدام</li>
                <li>يجب ربط طريقة دفع صالحة (بطاقة ائتمانية أو حساب بنكي)</li>
                <li>حسابك شخصي ولا يجوز مشاركته مع الآخرين</li>
              </ul>

              <p className="font-semibold text-foreground mt-4">3.2 أمان الحساب:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>أنت مسؤول عن جميع الأنشطة في حسابك</li>
                <li>يجب إبلاغنا فوراً بأي استخدام غير مصرح به</li>
                <li>لا تشارك بياناتك البيومترية مع أي شخص</li>
                <li>نحن لسنا مسؤولين عن أي خسارة ناتجة عن الاستخدام غير المصرح</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. استخدام الخدمة</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="font-semibold text-foreground">4.1 الاستخدام المسموح:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>إجراء معاملات الدفع المشروعة</li>
                <li>تسجيل الحضور والانصراف (للموظفين)</li>
                <li>الوصول إلى المناطق المصرح بها</li>
                <li>إدارة حسابك ومعلوماتك الشخصية</li>
              </ul>

              <p className="font-semibold text-foreground mt-4">4.2 الاستخدام المحظور:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>انتحال شخصية أخرى أو استخدام بيانات بيومترية مزيفة</li>
                <li>إجراء معاملات احتيالية أو غير قانونية</li>
                <li>محاولة اختراق النظام أو الوصول غير المصرح به</li>
                <li>استخدام الخدمة لأغراض تجارية دون ترخيص</li>
                <li>تعطيل أو الإضرار بالنظام أو خدماته</li>
                <li>جمع بيانات المستخدمين الآخرين</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. المعاملات المالية</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="font-semibold text-foreground">5.1 الرسوم:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>رسوم الخدمة: 1٪ من قيمة المعاملة (حد أدنى 1 ريال)</li>
                <li>الاشتراك الشهري للشركات: يتم تحديده حسب خطة الاشتراك</li>
                <li>قد تطبق رسوم إضافية من البنك أو مزود خدمة الدفع</li>
                <li>نحتفظ بالحق في تعديل الرسوم مع إشعار مسبق</li>
              </ul>

              <p className="font-semibold text-foreground mt-4">5.2 المدفوعات والاسترداد:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>جميع المعاملات نهائية ما لم تكن هناك مشكلة تقنية</li>
                <li>طلبات الاسترداد يجب تقديمها خلال 30 يوماً</li>
                <li>نراجع كل طلب استرداد على حدة</li>
                <li>قد يستغرق الاسترداد 5-10 أيام عمل</li>
              </ul>

              <p className="font-semibold text-foreground mt-4">5.3 حدود المعاملات:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>الحد الأقصى للمعاملة الواحدة: 10,000 ريال</li>
                <li>الحد الأقصى اليومي: 50,000 ريال</li>
                <li>الحد الأقصى الشهري: 200,000 ريال</li>
                <li>يمكن زيادة الحدود بعد التحقق الإضافي</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. البيانات البيومترية</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>بتسجيلك في النظام، فإنك توافق على:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>جمع ومعالجة بصمات كف يدك</li>
                <li>تخزين البيانات البيومترية بشكل آمن ومشفر</li>
                <li>استخدام البيانات للتحقق من الهوية فقط</li>
                <li>حقك في حذف البيانات البيومترية في أي وقت</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">7. الملكية الفكرية</h2>
            <p className="text-muted-foreground leading-relaxed">
              جميع حقوق الملكية الفكرية في النظام وتقنياته محفوظة لشركة سافانا. لا يجوز نسخ أو تعديل أو توزيع أي جزء من النظام دون إذن كتابي مسبق.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">8. إخلاء المسؤولية</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>النظام يُقدَّم "كما هو" دون أي ضمانات. نحن لسنا مسؤولين عن:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>انقطاع الخدمة أو الأعطال الفنية</li>
                <li>أخطاء في المعاملات الناتجة عن مشاكل بالأجهزة</li>
                <li>الأضرار الناتجة عن استخدامك للنظام</li>
                <li>أي خسارة للبيانات أو الأرباح</li>
                <li>أفعال الأطراف الثالثة (البنوك، التجار، إلخ)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">9. تحديد المسؤولية</h2>
            <p className="text-muted-foreground leading-relaxed">
              في حال ثبوت مسؤوليتنا، فإن الحد الأقصى للتعويض لن يتجاوز مبلغ الرسوم التي دفعتها خلال الثلاثة أشهر السابقة للحادثة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">10. إنهاء الخدمة</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="font-semibold text-foreground">10.1 من قبلك:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>يمكنك إغلاق حسابك في أي وقت</li>
                <li>يجب تسوية جميع المعاملات المعلقة قبل الإغلاق</li>
                <li>سيتم حذف البيانات البيومترية فوراً</li>
              </ul>

              <p className="font-semibold text-foreground mt-4">10.2 من قبلنا:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>نحتفظ بالحق في تعليق أو إنهاء حسابك لأي سبب</li>
                <li>سنبلغك قبل 30 يوماً من الإنهاء (ما لم يكن لأسباب أمنية)</li>
                <li>الإنهاء الفوري في حالات الاحتيال أو الاستخدام غير القانوني</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">11. حل النزاعات</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>في حالة نشوء نزاع:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>يجب محاولة الحل الودي أولاً</li>
                <li>إذا تعذر ذلك، يتم اللجوء للتحكيم وفقاً لقواعد التحكيم السعودي</li>
                <li>مكان التحكيم: الرياض، المملكة العربية السعودية</li>
                <li>لغة التحكيم: العربية</li>
                <li>القانون المطبق: الأنظمة واللوائح السعودية</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">12. التعديلات</h2>
            <p className="text-muted-foreground leading-relaxed">
              نحتفظ بالحق في تعديل هذه الشروط في أي وقت. التعديلات الجوهرية ستُعلَن قبل 30 يوماً من تطبيقها. استمرارك في استخدام الخدمة يعني موافقتك على الشروط المعدلة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">13. الاتصال</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              لأي استفسارات حول هذه الشروط:
            </p>
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <p className="text-foreground font-semibold">قسم الشؤون القانونية</p>
              <p className="text-muted-foreground">البريد الإلكتروني: legal@savana.sa</p>
              <p className="text-muted-foreground">الهاتف: 920000000</p>
              <p className="text-muted-foreground">العنوان: الرياض، المملكة العربية السعودية</p>
            </div>
          </section>

          <section>
            <p className="text-sm text-muted-foreground">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
