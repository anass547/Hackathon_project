-- L'Artisan — PostgreSQL schema for Supabase
-- Roles: client, worker (artisan). Auth via Supabase Auth; we store profiles.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============== PROFILES (linked to Supabase auth.users) ==============
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('client', 'worker')),
  full_name TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============== ARTISANS (workers with profession & geo) ==============
CREATE TABLE IF NOT EXISTS artisans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  profession TEXT NOT NULL, -- Zlayji, Sebbagh, Gebbas, Plombier, Electricien
  description TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  city TEXT NOT NULL,
  base_hourly_rate_mad NUMERIC(10,2),
  current_level TEXT NOT NULL DEFAULT 'Apprenti' CHECK (current_level IN ('Apprenti', 'Compagnon', 'Maitre', 'Maitre Maalem')),
  is_available BOOLEAN DEFAULT true,
  refusal_count INT DEFAULT 0, -- recent refusals (soft penalty)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_artisans_city ON artisans(city);
CREATE INDEX idx_artisans_geo ON artisans(latitude, longitude);
CREATE INDEX idx_artisans_available ON artisans(is_available) WHERE is_available = true;

-- ============== ARTISAN STATS (for ranking / meritocracy) ==============
CREATE TABLE IF NOT EXISTS artisan_stats (
  artisan_id UUID PRIMARY KEY REFERENCES artisans(id) ON DELETE CASCADE,
  total_jobs INT DEFAULT 0,
  on_time_ratio NUMERIC(5,4) DEFAULT 1.0,
  avg_rating NUMERIC(3,2) DEFAULT 0,
  avg_response_time_minutes INT DEFAULT 0,
  work_quality_score NUMERIC(5,4) DEFAULT 0,   -- 0-1 from ratings
  reliability_score NUMERIC(5,4) DEFAULT 1.0,
  communication_score NUMERIC(5,4) DEFAULT 0,
  price_quality_score NUMERIC(5,4) DEFAULT 0,
  innovation_score NUMERIC(5,4) DEFAULT 0,
  global_score NUMERIC(5,4) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============== JOBS ==============
CREATE TYPE job_status AS ENUM (
  'requested',      -- created, waiting match
  'pending',        -- matched, waiting worker response
  'accepted',       -- worker accepted
  'in_progress',    -- worker started
  'completed',      -- worker marked done, in 48h guarantee window
  'closed',         -- 48h passed, no complaint
  'complaint',      -- client complained
  'reassigned',     -- another worker assigned after complaint
  'completed_after_complaint'
);

CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  artisan_id UUID REFERENCES artisans(id) ON DELETE SET NULL,
  status job_status NOT NULL DEFAULT 'requested',
  problem_type TEXT NOT NULL,
  description TEXT,
  city TEXT NOT NULL,
  severity INT CHECK (severity >= 1 AND severity <= 5),
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  estimated_price_min_mad NUMERIC(10,2),
  estimated_price_max_mad NUMERIC(10,2),
  estimated_duration_hours NUMERIC(5,2),
  guarantee_until TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_jobs_client ON jobs(client_id);
CREATE INDEX idx_jobs_artisan ON jobs(artisan_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_city ON jobs(city);

-- ============== JOB PHOTOS (before / after) ==============
CREATE TABLE IF NOT EXISTS job_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('before', 'after')),
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_job_photos_job ON job_photos(job_id);

-- ============== RATINGS ==============
CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE UNIQUE,
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  artisan_id UUID NOT NULL REFERENCES artisans(id) ON DELETE CASCADE,
  stars INT NOT NULL CHECK (stars >= 1 AND stars <= 5),
  comment TEXT,
  work_quality NUMERIC(3,2),
  communication NUMERIC(3,2),
  price_quality NUMERIC(3,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ratings_artisan ON ratings(artisan_id);

-- ============== PAYMENTS (mock escrow) ==============
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE UNIQUE,
  amount_mad NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'reserved' CHECK (status IN ('reserved', 'released', 'refunded')),
  transaction_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============== NOTIFICATIONS LOG (for demo / Twilio) ==============
CREATE TABLE IF NOT EXISTS notification_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  artisan_id UUID REFERENCES artisans(id) ON DELETE SET NULL,
  channel TEXT NOT NULL, -- sms, push, etc.
  payload JSONB,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER artisans_updated_at BEFORE UPDATE ON artisans FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER artisan_stats_updated_at BEFORE UPDATE ON artisan_stats FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- RLS (Row Level Security) — enable and add policies in Supabase dashboard or migrations as needed
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- etc.
