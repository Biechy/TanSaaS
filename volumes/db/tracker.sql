DO $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.tracker (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_url TEXT NOT NULL,
    visitor_id UUID NOT NULL,
    user_id UUID DEFAULT NULL REFERENCES users(id) ON DELETE SET DEFAULT,
    created_at TIMESTAMPTZ DEFAULT now()
  );
END
$$;