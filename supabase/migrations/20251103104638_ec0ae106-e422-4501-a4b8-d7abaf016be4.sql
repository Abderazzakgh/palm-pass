-- إضافة جدول لتخزين رموز QR للربط بين البصمة والحساب
CREATE TABLE IF NOT EXISTS public.palm_registration_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT UNIQUE NOT NULL,
  palm_scan_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  is_used BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  linked_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.palm_registration_tokens ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own tokens
CREATE POLICY "Users can view their own tokens"
ON public.palm_registration_tokens
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can update their own tokens (for linking)
CREATE POLICY "Users can update their own tokens"
ON public.palm_registration_tokens
FOR UPDATE
USING (auth.uid() = user_id);

-- Policy: System can insert tokens (for scanner device)
CREATE POLICY "System can insert tokens"
ON public.palm_registration_tokens
FOR INSERT
WITH CHECK (true);

-- إضافة جدول لتخزين بطاقات الدفع
CREATE TABLE IF NOT EXISTS public.payment_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  card_token TEXT NOT NULL,
  last_four TEXT NOT NULL,
  card_brand TEXT,
  cardholder_name TEXT,
  expiry_month INTEGER,
  expiry_year INTEGER,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payment_cards ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own cards
CREATE POLICY "Users can view their own cards"
ON public.payment_cards
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own cards
CREATE POLICY "Users can insert their own cards"
ON public.payment_cards
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own cards
CREATE POLICY "Users can update their own cards"
ON public.payment_cards
FOR UPDATE
USING (auth.uid() = user_id);

-- Policy: Users can delete their own cards
CREATE POLICY "Users can delete their own cards"
ON public.payment_cards
FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_payment_cards_updated_at
BEFORE UPDATE ON public.payment_cards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- تحديث جدول profiles لإضافة palm_scan_id
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS palm_scan_id TEXT UNIQUE;