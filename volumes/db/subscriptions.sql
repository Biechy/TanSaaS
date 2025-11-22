DO $$
BEGIN
    CREATE TABLE IF NOT EXISTS public.subscription_plans (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,                     
        description TEXT,                               
        stripe_product_id VARCHAR(100) NOT NULL,
        stripe_price_id VARCHAR(100) NOT NULL,
        stripe_price_url VARCHAR(100) NOT NULL,
        price_amount INTEGER NOT NULL,
        currency VARCHAR(10) NOT NULL DEFAULT 'eur',
        billing_interval VARCHAR(20) NOT NULL CHECK (billing_interval IN ('day', 'week', 'month', 'year', 'lifetime')) DEFAULT 'month',
        trial_period_days INTEGER DEFAULT 0,
        features JSONB DEFAULT '{}'::jsonb,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_subscriptions (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        user_stripe_id VARCHAR(255) NOT NULL,
        subscription_plan_id INTEGER  NOT NULL REFERENCES subscription_plans(id),
        stripe_subscription_id VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid', 'trialing')),
        current_period_start TIMESTAMP,
        current_period_end TIMESTAMP,
        cancel_at_period_end BOOLEAN DEFAULT false,
        canceled_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user_id)
    );
END
$$;


-- Index to optimize queries
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_subscription_plan_id ON user_subscriptions(subscription_plan_id);

-- Function and trigger for user_subscriptions
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_user_subscriptions_updated_at
BEFORE UPDATE ON user_subscriptions
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Function and trigger for subscription_plans
CREATE OR REPLACE FUNCTION public.set_subscription_plans_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_subscription_plans_updated_at
BEFORE UPDATE ON subscription_plans
FOR EACH ROW EXECUTE FUNCTION set_subscription_plans_updated_at();

