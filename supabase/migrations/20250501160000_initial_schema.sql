-- Migration: Initial Schema
-- Description: Creates the base tables for the Muvo app
-- Based on 05_backend.md schema definitions

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table
-- Stores additional user information beyond auth.users
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  shipping_address VARCHAR,
  phone_number VARCHAR,
  full_name VARCHAR,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- MUVERS table
-- Stores network marketing members and their hierarchy
CREATE TABLE muvers (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  parent_muver_id UUID REFERENCES muvers(id) NULL,
  join_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  level VARCHAR(50) DEFAULT 'Bronce',
  points NUMERIC DEFAULT 0,
  sales_personal NUMERIC DEFAULT 0,
  sales_team NUMERIC DEFAULT 0
);

-- Events table
-- Stores events created by MUVERS
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  type VARCHAR NOT NULL CHECK (type IN ('live', 'online')),
  location VARCHAR,
  zoom_link VARCHAR,
  created_by_muver_id UUID REFERENCES muvers(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Event registrations
-- Tracks which MUVERS have registered for which events
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) NOT NULL,
  muver_id UUID REFERENCES muvers(id) NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, muver_id)
);

-- Content table
-- Stores educational content (articles, PDFs)
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  body TEXT,
  type VARCHAR NOT NULL CHECK (type IN ('short', 'long', 'pdf')),
  file_url VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
-- Stores e-commerce transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  amount NUMERIC NOT NULL,
  status VARCHAR NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
