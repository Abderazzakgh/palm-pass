-- إنشاء buckets للتخزين الآمن
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp']),
  ('palm-scans', 'palm-scans', false, 10485760, ARRAY['image/png', 'image/jpeg', 'image/jpg']);

-- سياسات RLS لصور الملفات الشخصية (avatars)
CREATE POLICY "الصور الشخصية متاحة للجميع"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "المستخدمون يمكنهم رفع صورهم الشخصية"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "المستخدمون يمكنهم تحديث صورهم الشخصية"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "المستخدمون يمكنهم حذف صورهم الشخصية"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- سياسات RLS لمسح بصمات الكف (palm-scans) - خاصة جداً
CREATE POLICY "المستخدمون يمكنهم عرض بصماتهم فقط"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'palm-scans' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "المستخدمون يمكنهم رفع بصماتهم"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'palm-scans' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "المستخدمون يمكنهم تحديث بصماتهم"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'palm-scans' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "المستخدمون يمكنهم حذف بصماتهم"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'palm-scans' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- سياسة إضافية للمدراء لعرض جميع البصمات (للدعم الفني)
CREATE POLICY "المدراء يمكنهم عرض جميع البصمات"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'palm-scans' 
  AND has_role(auth.uid(), 'admin')
);