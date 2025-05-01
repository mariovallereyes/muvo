# Muvo App Setup Guide

This guide provides step-by-step instructions for setting up the Muvo app development environment, including the mobile app (React Native), web app (Next.js), and Supabase backend.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Git
- Supabase account
- Vercel account (optional, for web deployment)
- Expo CLI (for mobile development)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/muvo.git
cd muvo
```

### 2. Install Dependencies

Install root dependencies:

```bash
npm install
```

Install web app dependencies:

```bash
cd web
npm install
cd ..
```

Install mobile app dependencies:

```bash
cd mobile
npm install
cd ..
```

Alternatively, use the root script to install all dependencies:

```bash
npm run install:all
```

### 3. Set Up Supabase

1. Create a new Supabase project at [https://app.supabase.com](https://app.supabase.com)
2. Note your Supabase URL and anon key from the project settings
3. Create the required tables in Supabase:

```sql
-- Users table (handled by Supabase Auth)

-- User profiles
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  shipping_address VARCHAR,
  phone_number VARCHAR,
  full_name VARCHAR,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- MUVERS table
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
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) NOT NULL,
  muver_id UUID REFERENCES muvers(id) NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, muver_id)
);

-- Content table
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
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  amount NUMERIC NOT NULL,
  status VARCHAR NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_muvers_parent ON muvers(parent_muver_id);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_content_type ON content(type);
```

4. Set up Row Level Security (RLS) policies:

```sql
-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE muvers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY user_profiles_select ON user_profiles FOR SELECT
  USING (auth.uid() = user_id OR auth.role() = 'admin');
CREATE POLICY user_profiles_insert ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY user_profiles_update ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id OR auth.role() = 'admin');

-- MUVERS policies
CREATE POLICY muvers_select ON muvers FOR SELECT
  USING (true);
CREATE POLICY muvers_insert ON muvers FOR INSERT
  WITH CHECK (auth.uid() = id OR auth.role() = 'admin');
CREATE POLICY muvers_update ON muvers FOR UPDATE
  USING (auth.uid() = id OR auth.role() = 'admin');

-- Events policies
CREATE POLICY events_select ON events FOR SELECT
  USING (true);
CREATE POLICY events_insert ON events FOR INSERT
  WITH CHECK (auth.uid() = created_by_muver_id);
CREATE POLICY events_update ON events FOR UPDATE
  USING (auth.uid() = created_by_muver_id OR auth.role() = 'admin');
CREATE POLICY events_delete ON events FOR DELETE
  USING (auth.uid() = created_by_muver_id OR auth.role() = 'admin');

-- Event registrations policies
CREATE POLICY event_registrations_select ON event_registrations FOR SELECT
  USING (true);
CREATE POLICY event_registrations_insert ON event_registrations FOR INSERT
  WITH CHECK (auth.uid() = muver_id);
CREATE POLICY event_registrations_delete ON event_registrations FOR DELETE
  USING (auth.uid() = muver_id OR auth.role() = 'admin');

-- Content policies
CREATE POLICY content_select ON content FOR SELECT
  USING (true);
CREATE POLICY content_insert ON content FOR INSERT
  WITH CHECK (auth.role() = 'admin');
CREATE POLICY content_update ON content FOR UPDATE
  USING (auth.role() = 'admin');
CREATE POLICY content_delete ON content FOR DELETE
  USING (auth.role() = 'admin');

-- Transactions policies
CREATE POLICY transactions_select ON transactions FOR SELECT
  USING (auth.uid() = user_id OR auth.role() = 'admin');
CREATE POLICY transactions_insert ON transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.role() = 'admin');
```

### 4. Environment Variables

Create a `.env.local` file in the `web` directory:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Create a `.env` file in the `mobile` directory:

```
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
EXPO_PUBLIC_API_URL=http://localhost:3000/api/v1
EXPO_PUBLIC_APP_URL=http://localhost:3000
```

## Running the Apps

### Web App

```bash
cd web
npm run dev
```

The web app will be available at [http://localhost:3000](http://localhost:3000).

### Mobile App

```bash
cd mobile
npm start
```

This will start the Expo development server. You can run the app on:
- iOS simulator (macOS only): Press `i` in the terminal
- Android emulator: Press `a` in the terminal
- Physical device: Scan the QR code with the Expo Go app

## Testing

### Web App

```bash
cd web
npm test
```

### Mobile App

```bash
cd mobile
npm test
```

## Deployment

### Web App

The web app can be deployed to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel
4. Deploy

### Mobile App

For mobile app deployment:

1. Build the app for production:
   ```bash
   cd mobile
   npm run build:android  # For Android
   npm run build:ios      # For iOS (macOS only)
   ```

2. Submit to app stores:
   - Android: Google Play Console
   - iOS: App Store Connect

## Troubleshooting

### Common Issues

1. **Supabase Connection Issues**:
   - Verify your Supabase URL and anon key
   - Check if your IP is allowed in Supabase settings

2. **Mobile App Build Errors**:
   - Ensure you have the latest Expo CLI
   - Check for compatibility issues between packages

3. **Web App Build Errors**:
   - Clear the Next.js cache: `rm -rf .next`
   - Ensure all dependencies are installed

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Native Documentation](https://reactnative.dev/docs)
- [Expo Documentation](https://docs.expo.dev)
