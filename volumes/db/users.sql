DO $$
BEGIN
    CREATE TABLE IF NOT EXISTS public.users (
        id uuid PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        display_name TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL
    );
END
$$;

-- Function and trigger for users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    display_name TEXT;
BEGIN
    display_name := NEW.raw_user_meta_data->>'display_name';
    INSERT INTO public.users (id, email, display_name)
    VALUES (NEW.id, NEW.email, display_name);
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();



CREATE OR REPLACE FUNCTION public.handle_user_deleted()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    DELETE FROM public.users
    WHERE id = OLD.id;
    RETURN OLD;
END;
$$;

CREATE TRIGGER on_auth_user_deleted
AFTER DELETE ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_user_deleted();