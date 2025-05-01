# Muvo App System Flow Documentation

**Date:** May 1, 2025  
**Version:** 1.0  
**Authors:** [AI-Generated, to be assigned by MUVO CBD team]  
**Status:** Draft, pending stakeholder review

## 1. Overview

This document details the system flows for the Muvo app, a mobile and web application developed by MUVO CBD, a leading CBD e-commerce and multi-level/network marketing brand in Mexico. The app serves MUVERS (network marketing members) and non-MUVERS (casual users), with modules for network marketing, e-commerce, and educational content. The flows cover user interactions, data movement, integration points, error handling, security, and performance, optimized for a three-person development team using AI-assisted tools like Cursor. The app targets native iOS, native Android, and web platforms, with Supabase as the primary backend, integrating with legacy systems and Shopify.

### 1.1 Objectives
- Define clear user workflows for registration, MUVER activities, content browsing, and e-commerce.
- Map data flows between frontend, backend, Supabase, legacy systems, and Shopify.
- Specify integration points with APIs, storage, and external services.
- Outline robust error handling and logging for reliability.
- Ensure security, performance, and compliance with Mexican regulations (LFPDPPP, WCAG).
- Leverage AI tools (Cursor) for efficient code generation and testing.

### 1.2 Scope
- **Platforms**: iOS (React Native/Swift), Android (React Native/Kotlin), web (Next.js).
- **Users**: 400–500 initial users (primarily MUVERS).
- **Modules**: MUVER (authentication, purchases, recruiting, events, admin), Editorial (content), Shopify (e-commerce).
- **Constraints**: Three-person team, Spanish-only UI, 6–9 month MVP timeline.

### 1.3 Assumptions
- Legacy “virtual office” system provides WebView access or CSV/JSON export.
- Shopify store (www.muvocbd.com) is accessible via WebView/iframe.
- Supabase free tier supports initial user base and storage needs.
- MUVO CBD branding aligns with www.muvocbd.com (greens, whites, Montserrat typography).

## 2. User Workflows

### 2.1 MUVER Registration and Login
- **New MUVER**:
  1. User opens app, taps “Registrarse” (Register) on home screen.
  2. Enters username, email, password, or selects Apple Sign-In (iOS) or Google Sign-In (Android).
  3. Submits form; app validates inputs (email format, password strength).
  4. On success, completes questionnaire (shipping address, phone number [+52 format], optional full name; 3–5 fields).
  5. Redirects to MUVER dashboard showing level, points, and actions (Shop, Recruit, Events).
  - **Edge Cases**:
    - Invalid email/phone: Display “Correo inválido” or “Número de teléfono inválido”.
    - Network failure: Show “Sin conexión, intenta de nuevo” and retry option.
  - **Success Criteria**: Registration completes in <2 minutes, 95% completion rate.
- **Existing MUVER**:
  1. User taps “Iniciar Sesión” (Login), enters username/password or uses social login.
  2. On success, redirects to MUVER dashboard.
  - **Edge Cases**:
    - Wrong credentials: Display “Credenciales incorrectas”.
    - Forgot password: Email reset link via Supabase Auth.
  - **Success Criteria**: Login completes in <10 seconds.
- **Non-MUVER**:
  1. User browses home screen, accesses “Tienda” (Shopify) or “Aprender” (content) without login.
  - **Edge Cases**: Attempting MUVER features prompts login/registration.
  - **Success Criteria**: Public content loads in <2 seconds.

### 2.2 MUVER Module Workflows

#### 2.2.1 Product Purchases
- **Flow**:
  1. MUVER taps “Tienda” on dashboard.
  2. Initial Phase: App loads WebView with legacy “virtual office” URL (assumed accessible).
  3. MUVER browses products, adds to cart, checks out in legacy system.
  4. Future Phase: App fetches products via `GET /products`, adds to cart via `POST /cart`, checks out via `POST /checkout`.
  - **Edge Cases**:
    - WebView fails: Show “Error al cargar la tienda, intenta de nuevo” and retry.
    - Legacy system downtime: Log error, notify user to try later.
  - **Success Criteria**: WebView loads in <2 seconds, checkout completes in legacy system.

#### 2.2.2 Recruiting New MUVERS
- **Flow**:
  1. MUVER taps “Reclutar” on dashboard.
  2. App displays unique QR code linked to `/register?referrer={user_id}`.
  3. New user scans QR code using device camera, opens registration page in app or browser.
  4. New user registers, app assigns them to recruiter’s downline in `network` table.
  - **Edge Cases**:
    - QR scan fails: Prompt “Escanea de nuevo o ingresa manualmente”.
    - Invalid referrer ID: Log error, default to no referrer.
  - **Success Criteria**: QR code generates in <1 second, registration completes in <1 minute.

#### 2.2.3 Event Management
- **Flow**:
  1. MUVER taps “Eventos” on dashboard.
  2. App lists upcoming events (live/online) via `GET /events`.
  3. **Register**: MUVER taps event, submits `POST /events/register`, receives confirmation.
  4. **Create**: MUVER fills form (title, date, type, location/Zoom link), submits `POST /events`.
  5. **Manage**: MUVER edits/deletes own events via `PATCH /events/{id}` or `DELETE /events/{id}`.
  - **Edge Cases**:
    - Invalid Zoom link: Show “Enlace de Zoom inválido”.
    - Event full: Display “Evento completo, intenta otro”.
  - **Success Criteria**: Event creation/registration in <30 seconds, supports 100+ events.

#### 2.2.4 Network Marketing Admin
- **Flow**:
  1. MUVER taps “Tablero” on dashboard.
  2. App fetches metrics via `GET /users/{id}/metrics`: level (e.g., Bronce), points, sales (personal/team), downline size.
  3. Displays cards for metrics, line graph for sales trends.
  - **Edge Cases**:
    - API failure: Show cached metrics with “Datos no actualizados” warning.
    - No metrics: Display “Aún no hay datos, ¡empieza a vender!”.
  - **Success Criteria**: Metrics load in <1 second, 100% data accuracy.

### 2.3 Editorial and Learning Module
- **Flow**:
  1. User taps “Aprender” on home screen.
  2. App lists content (short articles, long articles, PDFs) via `GET /content`.
  3. User taps item, views article or PDF via `GET /content/{id}`.
  4. Admin uploads content via CMS (Next.js or Supabase dashboard).
  - **Edge Cases**:
    - Content unavailable: Show “Contenido no disponible, intenta otro”.
    - Large PDF: Lazy-load with progress indicator.
  - **Success Criteria**: Content loads in <2 seconds, CMS supports 10+ daily uploads.

### 2.4 Shopify Integration
- **Flow**:
  1. Non-MUVER taps “Tienda” on home screen.
  2. App loads Shopify store (www.muvocbd.com) in WebView (mobile) or iframe (web).
  3. User browses products, checks out in Shopify, returns to app via navigation bar.
  - **Edge Cases**:
    - WebView fails: Show “Error al cargar la tienda, intenta de nuevo”.
    - Navigation conflict: Ensure persistent app bar overrides Shopify UI.
  - **Success Criteria**: Store loads in <3 seconds, seamless transitions.

## 3. Data Flows

### 3.1 Diagram
```mermaid
graph TD
    A[User (MUVER/Non-MUVER)] --> B[Frontend (React Native/Next.js)]
    B --> C{Supabase Auth}
    C -->|Authenticated| D[MUVER Module]
    C -->|Not Authenticated| E[Public Content/Shopify]
    D --> F[Supabase Database]
    D --> G[Supabase Storage]
    D --> H[Express.js APIs]
    E --> G
    E --> I[Shopify WebView]
    F --> J[Legacy System (WebView/Proxy)]
    H --> J
    J --> K[External APIs (e.g., Zoom)]
    G --> L[Content Files (PDFs)]
    B --> M[Sentry (Error Logging)]