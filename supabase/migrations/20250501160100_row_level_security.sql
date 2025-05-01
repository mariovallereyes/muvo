-- Migration: Row Level Security Policies
-- Description: Sets up RLS policies for all tables
-- Based on 05_backend.md security considerations

-- Enable Row Level Security on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE muvers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- User profiles policies
-- Users can read/update their own profiles, admins can read/update all
CREATE POLICY user_profiles_select ON user_profiles FOR SELECT
  USING (auth.uid() = user_id OR auth.role() = 'admin');

CREATE POLICY user_profiles_insert ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY user_profiles_update ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id OR auth.role() = 'admin');

-- MUVERS policies
-- Anyone can read MUVER data, only the MUVER or admin can update
CREATE POLICY muvers_select ON muvers FOR SELECT
  USING (true);

CREATE POLICY muvers_insert ON muvers FOR INSERT
  WITH CHECK (auth.uid() = id OR auth.role() = 'admin');

CREATE POLICY muvers_update ON muvers FOR UPDATE
  USING (auth.uid() = id OR auth.role() = 'admin');

-- Events policies
-- Anyone can read events, only the creator or admin can update/delete
CREATE POLICY events_select ON events FOR SELECT
  USING (true);

CREATE POLICY events_insert ON events FOR INSERT
  WITH CHECK (auth.uid() = created_by_muver_id);

CREATE POLICY events_update ON events FOR UPDATE
  USING (auth.uid() = created_by_muver_id OR auth.role() = 'admin');

CREATE POLICY events_delete ON events FOR DELETE
  USING (auth.uid() = created_by_muver_id OR auth.role() = 'admin');

-- Event registrations policies
-- Anyone can read registrations, only the MUVER can register/unregister
CREATE POLICY event_registrations_select ON event_registrations FOR SELECT
  USING (true);

CREATE POLICY event_registrations_insert ON event_registrations FOR INSERT
  WITH CHECK (auth.uid() = muver_id);

CREATE POLICY event_registrations_delete ON event_registrations FOR DELETE
  USING (auth.uid() = muver_id OR auth.role() = 'admin');

-- Content policies
-- Anyone can read content, only admins can create/update/delete
CREATE POLICY content_select ON content FOR SELECT
  USING (true);

CREATE POLICY content_insert ON content FOR INSERT
  WITH CHECK (auth.role() = 'admin');

CREATE POLICY content_update ON content FOR UPDATE
  USING (auth.role() = 'admin');

CREATE POLICY content_delete ON content FOR DELETE
  USING (auth.role() = 'admin');

-- Transactions policies
-- Users can read their own transactions, admins can read all
CREATE POLICY transactions_select ON transactions FOR SELECT
  USING (auth.uid() = user_id OR auth.role() = 'admin');

CREATE POLICY transactions_insert ON transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.role() = 'admin');

-- Create audit logging function for LFPDPPP compliance
-- As specified in 05_backend.md section 5.6
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR NOT NULL,
  table_name VARCHAR NOT NULL,
  record_id UUID NOT NULL,
  old_data JSONB,
  new_data JSONB,
  ip_address VARCHAR,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Function to log access to sensitive data
CREATE OR REPLACE FUNCTION log_audit_event()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (
    user_id, action, table_name, record_id, 
    old_data, new_data, ip_address
  ) VALUES (
    auth.uid(), 
    TG_OP, 
    TG_TABLE_NAME, 
    CASE 
      WHEN TG_OP = 'DELETE' THEN OLD.id 
      ELSE NEW.id 
    END,
    CASE WHEN TG_OP = 'UPDATE' OR TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP = 'UPDATE' OR TG_OP = 'INSERT' THEN to_jsonb(NEW) ELSE NULL END,
    current_setting('request.headers', true)::json->>'x-forwarded-for'
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
