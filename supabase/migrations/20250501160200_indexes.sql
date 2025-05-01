-- Migration: Indexes
-- Description: Creates indexes for performance optimization
-- Based on 05_backend.md section 3.2 and 6 (Performance Optimization)

-- MUVERS indexes
-- Optimize downline queries and network hierarchy
CREATE INDEX IF NOT EXISTS idx_muvers_parent ON muvers(parent_muver_id);

-- Events indexes
-- Optimize event listing by date and creator
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_creator ON events(created_by_muver_id);

-- Content indexes
-- Optimize content filtering by type
CREATE INDEX IF NOT EXISTS idx_content_type ON content(type);

-- User profiles indexes
-- Optimize user lookup by email (complementing auth.users)
CREATE INDEX IF NOT EXISTS idx_user_profiles_updated ON user_profiles(updated_at);

-- Event registrations indexes
-- Optimize lookup of registrations by event and muver
CREATE INDEX IF NOT EXISTS idx_event_registrations_event ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_muver ON event_registrations(muver_id);

-- Transactions indexes
-- Optimize transaction lookup by user and status
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);

-- Create metrics update trigger as defined in 05_backend.md section 4.4
CREATE OR REPLACE FUNCTION update_metrics() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.points = NEW.sales_personal / 100 + NEW.sales_team / 200;
  NEW.level = CASE
    WHEN NEW.points >= 10000 THEN 'Diamante'
    WHEN NEW.points >= 5000 THEN 'Oro'
    WHEN NEW.points >= 1000 THEN 'Plata'
    ELSE 'Bronce'
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER metrics_trigger
BEFORE UPDATE ON muvers
FOR EACH ROW EXECUTE FUNCTION update_metrics();

-- Create function to get downline as defined in 05_backend.md section 4.3
CREATE OR REPLACE FUNCTION get_downline(muver_id UUID, max_depth INT)
RETURNS TABLE (muver_id UUID, level VARCHAR, join_date TIMESTAMP WITH TIME ZONE) AS $$
BEGIN
  RETURN QUERY
  WITH RECURSIVE downline AS (
    SELECT id, level, join_date, 1 AS depth
    FROM muvers
    WHERE id = muver_id
    UNION
    SELECT m.id, m.level, m.join_date, d.depth + 1
    FROM muvers m
    JOIN downline d ON m.parent_muver_id = d.muver_id
    WHERE d.depth < max_depth
  )
  SELECT downline.muver_id, downline.level, downline.join_date FROM downline;
END;
$$ LANGUAGE plpgsql;
