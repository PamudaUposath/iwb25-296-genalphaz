-- hospitals / blood donation centers
CREATE TABLE centers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  district VARCHAR(100) NOT NULL,
  address TEXT,
  contact_phone VARCHAR(50),
  contact_email VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- current requirements posted by a center
CREATE TABLE blood_requirements (
  id SERIAL PRIMARY KEY,
  center_id INTEGER NOT NULL REFERENCES centers(id) ON DELETE CASCADE,
  blood_type VARCHAR(5) NOT NULL,      -- e.g. O+, A-
  units_required INTEGER NOT NULL,
  units_remaining INTEGER NOT NULL,
  category VARCHAR(20) DEFAULT 'normal', -- 'normal','urgent','critical'
  notes TEXT,
  start_time TIMESTAMPTZ DEFAULT now(),
  end_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- donors (users)
CREATE TABLE donors (
  id SERIAL PRIMARY KEY,
  nic VARCHAR(20) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  date_of_birth DATE,
  weight INTEGER,
  district VARCHAR(100),
  blood_type VARCHAR(5) NOT NULL,
  last_donation_date DATE,
  points INTEGER DEFAULT 0,
  total_donations INTEGER DEFAULT 0,
  banned BOOLEAN DEFAULT FALSE,       -- for risk behaviors / ineligibility
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- donation logs (confirmed donations)
CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  donor_id INTEGER REFERENCES donors(id),
  center_id INTEGER REFERENCES centers(id),
  requirement_id INTEGER REFERENCES blood_requirements(id),
  donated_at TIMESTAMPTZ DEFAULT now(),
  verified_by VARCHAR(255),  -- hospital staff name/id
  hemoglobin_level NUMERIC,  -- optional record
  points_awarded INTEGER DEFAULT 0
);

-- QR tokens (short lived tokens encoded into QR)
CREATE TABLE qr_tokens (
  token VARCHAR(128) PRIMARY KEY,
  donor_id INTEGER REFERENCES donors(id),
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- aggregated stock cache (optional)
CREATE TABLE center_blood_stock (
  id SERIAL PRIMARY KEY,
  center_id INTEGER REFERENCES centers(id) ON DELETE CASCADE,
  blood_type VARCHAR(5),
  units INTEGER DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT now(),
  UNIQUE(center_id, blood_type)
);
