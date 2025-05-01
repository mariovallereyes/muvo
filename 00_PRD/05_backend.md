# Muvo App Backend Implementation Guide

**Date:** May 1, 2025  
**Version:** 1.0  
**Authors:** [AI-Generated, to be assigned by MUVO CBD team]  
**Status:** Draft, pending stakeholder review

## 1. Overview

This guide details the backend implementation for the Muvo app, a mobile and web application developed by MUVO CBD, a leading CBD e-commerce and multi-level/network marketing brand in Mexico. The backend supports MUVERS (network marketing members) and non-MUVERS (casual users) across modules for network marketing, e-commerce, and educational content. The implementation uses Supabase as the primary backend, with Node.js/Express.js for custom APIs, targeting a modular monolith architecture for the MVP, with future microservices potential. The guide is optimized for a three-person development team (lead developer/designer, backend developer, frontend developer) using AI-assisted tools like Cursor, ensuring scalability for 400–500 initial users, compliance with Mexican regulations (LFPDPPP, WCAG), and integration with legacy systems and Shopify.

### 1.1 Objectives
- Implement a secure, scalable REST API for all app features.
- Design a Supabase database schema for network marketing, e-commerce, and content.
- Define business logic for authentication, QR codes, events, and metrics.
- Integrate with legacy “virtual office” system and Shopify.
- Ensure performance (<500ms API responses), security, and compliance.
- Leverage Cursor for rapid API, query, and test development.

### 1.2 Scope
- **Platforms**: Backend supports iOS, Android, web (React Native, Next.js).
- **Modules**: MUVER (auth, purchases, recruiting, events, admin), Editorial (content), Shopify (e-commerce).
- **Architecture**: Modular monolith, Supabase-hosted, Express.js for custom APIs.
- **Constraints**: Three-person team, 6–9 month MVP timeline, Spanish-only UI.

### 1.3 Assumptions
- Legacy system provides WebView access or CSV/JSON export.
- Shopify store (www.muvocbd.com) is accessible via WebView.
- Supabase free tier supports initial user base (400–500 users).
- MUVO CBD branding aligns with www.muvocbd.com.

## 2. API Design

The backend uses a RESTful API with JSON payloads, prefixed with `/api/v1/`. Authentication is handled via Supabase Auth JWTs, validated by Supabase or Express.js middleware. APIs are hosted on Supabase Edge Functions or Vercel (Express.js).

### 2.1 Endpoints

| Endpoint                     | Method | Description                                  | Query Params                     | Request Body                                              | Response Body                                          | Auth Required | Status Codes |
|------------------------------|--------|----------------------------------------------|----------------------------------|----------------------------------------------------------|-------------------------------------------------------|---------------|--------------|
| `/api/v1/auth/register`      | POST   | Register a new MUVER                         | `referrer` (optional, muver_id)  | `{ "username": string, "email": string, "password": string, "phone": string, "address": string }` | `{ "user_id": uuid, "token": string }`                | No            | 201, 400, 409 |
| `/api/v1/auth/login`         | POST   | Log in a user                                | None                             | `{ "email": string, "password": string }`                | `{ "user_id": uuid, "token": string }`                | No            | 200, 401      |
| `/api/v1/muver/profile`      | GET    | Get MUVER profile                            | None                             | None                                                     | `{ "username": string, "email": string, "phone": string, "address": string }` | Yes           | 200, 401, 404 |
| `/api/v1/muver/profile`      | PUT    | Update MUVER profile                         | None                             | `{ "phone": string, "address": string }`                 | `{ "username": string, "email": string, "phone": string, "address": string }` | Yes           | 200, 400, 401 |
| `/api/v1/muver/qr-code`      | GET    | Generate QR code for recruitment             | None                             | None                                                     | `{ "qr_code_url": string }`                           | Yes           | 200, 401      |
| `/api/v1/muver/network`      | GET    | Get MUVER’s downline hierarchy               | `depth` (optional, default 3)    | None                                                     | `{ "muver_id": uuid, "downline": [{ "muver_id": uuid, "level": string, "join_date": timestamp }]` | Yes           | 200, 401      |
| `/api/v1/muver/metrics`      | GET    | Get MUVER’s marketing metrics                | None                             | None                                                     | `{ "level": string, "points": number, "sales_personal": number, "sales_team": number }` | Yes           | 200, 401      |
| `/api/v1/events`             | GET    | List events                                  | `type` (live/online, optional)   | None                                                     | `[{ "id": uuid, "title": string, "date": timestamp, "type": string, "location": string, "zoom_link": string }]` | No            | 200           |
| `/api/v1/events`             | POST   | Create an event                              | None                             | `{ "title": string, "description": string, "date": timestamp, "type": string, "location": string, "zoom_link": string }` | `{ "event_id": uuid }`                                | Yes           | 201, 400, 401 |
| `/api/v1/events/{event_id}`  | GET    | Get event details                            | None                             | None                                                     | `{ "id": uuid, "title": string, "date": timestamp, "type": string, "location": string, "zoom_link": string }` | No            | 200, 404      |
| `/api/v1/events/{event_id}/register` | POST | Register for an event                        | None                             | None                                                     | `{}`                                                  | Yes           | 200, 400, 401, 404 |
| `/api/v1/content`            | GET    | List content (articles, PDFs)                | `type` (short/long/pdf, optional) | None                                                     | `[{ "id": uuid, "title": string, "type": string, "body": string, "url": string }]` | No            | 200           |
| `/api/v1/content/{id}`       | GET    | Get specific content                         | None                             | None                                                     | `{ "id": uuid, "title": string, "type": string, "body": string, "url": string }` | No            | 200, 404      |

### 2.2 Error Responses
- **400 Bad Request**: `{ "error": "Datos inválidos, verifica los campos" }` (e.g., missing required fields).
- **401 Unauthorized**: `{ "error": "Autenticación requerida" }` (e.g., missing/invalid JWT).
- **404 Not Found**: `{ "error": "Recurso no encontrado" }` (e.g., invalid event ID).
- **409 Conflict**: `{ "error": "Correo ya registrado" }` (e.g., duplicate email).
- **500 Server Error**: `{ "error": "Error del servidor, intenta más tarde" }` (log to Sentry).

### 2.3 Example API Call (Generated by Cursor)
```javascript
// POST /api/v1/auth/register (Express.js)
const register = async (req, res) => {
  const { username, email, password, phone, address } = req.body;
  try {
    // Validate inputs
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      return res.status(400).json({ error: 'Correo inválido' });
    }
    // Register with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, phone, address } }
    });
    if (error) {
      return res.status(409).json({ error: error.message });
    }
    // Insert MUVER record
    const { error: muverError } = await supabase
      .from('muvers')
      .insert({ id: data.user.id, parent_muver_id: req.query.referrer || null });
    if (muverError) {
      throw muverError;
    }
    res.status(201).json({ user_id: data.user.id, token: data.session.access_token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

## 3. Data Models (Supabase Schema)

### 3.1 Tables
| Table                | Fields                                                                 | Purpose                              |
|----------------------|----------------------------------------------------------------------|--------------------------------------|
| `users`              | `id: uuid`, `email: varchar`, `username: varchar`, `created_at: timestamp`, `auth_provider: varchar` | User accounts                        |
| `user_profiles`      | `user_id: uuid`, `shipping_address: varchar`, `phone_number: varchar`, `full_name: varchar`, `updated_at: timestamp` | Questionnaire responses              |
| `muvers`             | `id: uuid`, `parent_muver_id: uuid (nullable)`, `join_date: timestamp`, `level: varchar`, `points: numeric`, `sales_personal: numeric`, `sales_team: numeric` | MUVER hierarchy and metrics          |
| `events`             | `id: uuid`, `title: varchar`, `description: text`, `date: timestamp`, `type: varchar (live/online)`, `location: varchar`, `zoom_link: varchar`, `created_by_muver_id: uuid`, `created_at: timestamp`, `updated_at: timestamp` | Event details                        |
| `event_registrations`| `id: uuid`, `event_id: uuid`, `muver_id: uuid`, `registered_at: timestamp` | Event registrations                  |
| `content`            | `id: uuid`, `title: varchar`, `body: text`, `type: varchar (short/long/pdf)`, `file_url: varchar`, `created_at: timestamp`, `updated_at: timestamp` | Editorial content                    |
| `transactions`       | `id: uuid`, `user_id: uuid`, `amount: numeric`, `status: varchar`, `created_at: timestamp` | Future e-commerce transactions       |

### 3.2 Indexes
- `users(email)`: Speed up login/registration.
- `muvers(parent_muver_id)`: Optimize downline queries.
- `events(created_by_muver_id, date)`: Improve event listing.
- `content(type)`: Enhance content filtering.

### 3.3 Row-Level Security (RLS)
- **users**: Readable by self (`auth.uid() = id`), writable by admins (`role = 'admin'`).
- **user_profiles**: Readable/writable by self, writable by admins.
- **muvers**: Readable by self and downline, writable by admins.
- **events**: Readable by all, writable by creator or admins.
- **event_registrations**: Readable/writable by self, readable by admins.
- **content**: Readable by all, writable by admins.
- **transactions**: Readable/writable by self, readable by admins.

### 3.4 Example Schema (SQL, Generated by Cursor)
```sql
CREATE TABLE muvers (
  id UUID PRIMARY KEY REFERENCES users(id),
  parent_muver_id UUID REFERENCES muvers(id) NULL,
  join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  level VARCHAR(50) DEFAULT 'Bronce',
  points NUMERIC DEFAULT 0,
  sales_personal NUMERIC DEFAULT 0,
  sales_team NUMERIC DEFAULT 0
);

CREATE INDEX idx_muvers_parent ON muvers(parent_muver_id);

ALTER TABLE muvers ENABLE ROW LEVEL SECURITY;
CREATE POLICY muver_read ON muvers FOR SELECT
  USING (auth.uid() = id OR auth.uid() IN (
    SELECT id FROM muvers WHERE parent_muver_id = muvers.id
  ));
CREATE POLICY muver_admin ON muvers FOR ALL
  USING (auth.role() = 'admin');

## 4. Business Logic

### 4.1 Authentication
Flow: Supabase Auth handles registration/login, returns JWT.
Registration:
1. Validate inputs (email, phone: +52 format).
2. Call supabase.auth.signUp, store user in users.
3. Insert MUVER in muvers with parent_muver_id from referrer query.
Login: Call supabase.auth.signInWithPassword, return JWT.
Security: Refresh tokens every 60 minutes, store in AsyncStorage (mobile) or cookies (web).

### 4.2 QR Code Generation
Flow:
1. MUVER requests /api/v1/muver/qr-code.
2. Generate URL: https://app.muvoapp.com/register?referrer={muver_id}.
3. Use qrcode library to create QR code, return PNG URL.
Example (Edge Function, Deno):
import { create } from 'https://deno.land/x/qrcode@v2.0.0/mod.ts';

Deno.serve(async (req) => {
  const muverId = req.user.id; // From JWT
  const url = `https://app.muvoapp.com/register?referrer=${muverId}`;
  const qrCode = await create(url, { size: 256 });
  return new Response(JSON.stringify({ qr_code_url: qrCode }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

4.3 Network Hierarchy
Flow:
1. Query muvers table recursively to fetch downline up to specified depth.
2. Return array of { muver_id, level, join_date }.
Example (PostgreSQL Function):
CREATE FUNCTION get_downline(muver_id UUID, max_depth INT)
RETURNS TABLE (muver_id UUID, level VARCHAR, join_date TIMESTAMP) AS $$
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
  SELECT muver_id, level, join_date FROM downline;
END;
$$ LANGUAGE plpgsql;

4.4 Metrics Calculation
Metrics:
Level: Bronce (0–999 points), Plata (1000–4999), Oro (5000–9999), Diamante (10000+).
Points: 1 per $100 personal sales, 0.5 per $100 downline sales.
Sales: Personal (direct), team (downline aggregate).
Flow:
1. Query muvers.sales_personal, muvers.sales_team.
2. Calculate points: points = sales_personal / 100 + sales_team / 200.
3. Update muvers.level based on points threshold.
Trigger (SQL):
CREATE FUNCTION update_metrics() RETURNS TRIGGER AS $$
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

4.5 Event Management
Flow:
List: SELECT * FROM events WHERE date >= NOW() with type filter.
Create: Insert into events, validate date (future) and Zoom link (URL format).
Register: Insert into event_registrations, check event exists.
Validation: Ensure zoom_link matches https://*.zoom.us/*.

4.6 Data Migration
Strategy: CSV/JSON export from legacy system, import to Supabase.
Process:
1. Export users, network hierarchy, sales from legacy system.
2. Map to Supabase schema (e.g., legacy user_id → users.id).
3. Use Node.js script with @supabase/supabase-js to insert data.
Example Script:
const { createClient } = require('@supabase/supabase-js');
const csv = require('csv-parser');
const fs = require('fs');

const supabase = createClient('SUPABASE_URL', 'SUPABASE_KEY');

async function migrateUsers() {
  const users = [];
  fs.createReadStream('legacy_users.csv')
    .pipe(csv())
    .on('data', (row) => {
      users.push({
        id: row.legacy_id,
        email: row.email,
        username: row.username,
        created_at: row.created_date
      });
    })
    .on('end', async () => {
      const { error } = await supabase.from('users').insert(users);
      if (error) console.error(error);
      console.log('Migration complete');
    });
}
migrateUsers();

5. Security Considerations

5.1 Authentication
Supabase Auth: JWT tokens, refreshed every 60 minutes.
Middleware (Express.js):
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'Autenticación requerida' });
  const { data, error } = await supabase.auth.getUser(token);
  if (error) return res.status(401).json({ error: 'Token inválido' });
  req.user = data.user;
  next();
};

5.2 Authorization
RLS: Policies ensure MUVERS access own data, admins access all.
Roles: authenticated (MUVERS), admin (content editors).
Example Policy:
CREATE POLICY muver_profile ON user_profiles FOR ALL
USING (auth.uid() = user_id OR auth.role() = 'admin');

5.3 Input Validation
Frontend: Validate email, phone, dates before API calls.
Backend: Use express-validator:
const { body, validationResult } = require('express-validator');

app.post('/api/v1/auth/register', [
  body('email').isEmail().withMessage('Correo inválido'),
  body('phone').matches(/^\+52\d{10}$/).withMessage('Número inválido')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  // Proceed with registration
});

5.4 Data Encryption
At Rest: Supabase encrypts database/storage (AES-256).
In Transit: HTTPS for all API calls (TLS 1.3).
Sensitive Data: Hash passwords via Supabase Auth, encrypt phone_number in user_profiles.

5.5 Rate Limiting
Config: Use express-rate-limit (100 requests/hour per IP).
Example:
const rateLimit = require('express-rate-limit');
app.use('/api/v1/', rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,
  message: { error: 'Demasiadas solicitudes, intenta de nuevo más tarde' }
}));

5.6 Compliance
LFPDPPP: Obtain user consent for user_profiles, log access in audit table.
WCAG 2.1: Ensure API errors are accessible (clear Spanish messages).

6. Performance Optimization

Database:
Indexes on frequent queries (e.g., events(date)).
Connection pooling via Supabase client.
Denormalize muvers for metrics to reduce joins.
APIs:
Cache GET /content responses (Redis, post-MVP).
Paginate GET /events (e.g., ?limit=20&offset=0).
Edge Functions: Use Deno for lightweight, fast execution.
Targets:
API response: <500ms for 95% of requests.
Database query: <100ms for indexed reads.
Scale to 400–500 users, 10x growth potential.

7. AI-Assisted Development

Tool: Cursor (latest stable)
Use Cases:
Generate API routes (e.g., /api/v1/muver/metrics with Express.js).
Create SQL schemas, functions, and triggers (e.g., get_downline).
Write tests (Jest for APIs, pgTAP for SQL).
Auto-document endpoints with JSDoc/OpenAPI.
Workflow:
1. Define endpoint/schema in Postman/Supabase dashboard.
2. Use Cursor to generate code, refine types and validation.
3. Commit to Git with comments (e.g., // Adds event registration endpoint).
Supplementary: GitHub Copilot for real-time suggestions in VS Code.
Example Prompt for Cursor:
Generate an Express.js POST endpoint for /api/v1/events that creates an event in Supabase, validates inputs, and returns the event ID. Include error handling and Spanish error messages.

8. Legacy System Integration

Initial:
WebView: Load legacy URL, pass MUVER session if available.
Fallback: Deep link to legacy app.
Future:
Proxy API: Express.js endpoint (GET /legacy/products) fetches data, maps to Supabase.
Migration: Import CSV/JSON to users, muvers, transactions via Node.js script.
Assumption: Legacy system supports export or WebView access.

9. Monitoring and Logging

Tool: Sentry (free tier)
Config: Integrate with Express.js, Supabase Edge Functions.
Logs: Capture API errors, database failures, user context (ID, timestamp).
Supabase Logs: Monitor query performance, auth errors.
Example:
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'SENTRY_DSN' });

app.use((err, req, res, next) => {
  Sentry.captureException(err, { user: { id: req.user?.id } });
  res.status(500).json({ error: 'Error del servidor' });
});

10. Appendix

10.1 Glossary
MUVER: Member of MUVO CBD’s network marketing program.
Virtual Office: Legacy e-commerce/network platform.
Supabase: Backend service for auth, database, storage.
LFPDPPP: Mexican data privacy law.

10.2 Assumptions
Legacy system provides API/WebView access or data export.
Supabase free tier meets initial needs.
MUVO CBD supplies compensation plan details for metrics.

10.3 References
Supabase: supabase.com/docs
Express.js: expressjs.com
PostgreSQL: postgresql.org
MUVO CBD: www.muvocbd.com