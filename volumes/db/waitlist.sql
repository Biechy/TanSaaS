DO $$
BEGIN
  IF current_setting('custom.waitlist_enabled', false) = 'true' THEN
    CREATE TABLE IF NOT EXISTS public.waitlist (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    );
  END IF;
END
$$;
