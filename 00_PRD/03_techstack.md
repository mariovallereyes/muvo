# Muvo App Technology Stack

**Date:** May 1, 2025  
**Version:** 1.0  
**Authors:** [AI-Generated, to be assigned by MUVO CBD team]  
**Status:** Draft, pending stakeholder review

## 1. Overview

This document outlines the technology stack for the Muvo app, a mobile and web application developed by MUVO CBD, a leading CBD e-commerce and multi-level/network marketing brand in Mexico. The app serves MUVERS (network marketing members) and non-MUVERS (casual users), with features for e-commerce, network marketing, and educational content. The stack is optimized for a three-person development team (lead developer/designer, backend developer, frontend developer) using AI-assisted tools like Cursor, targeting native iOS, native Android, and web platforms. The stack prioritizes modularity, scalability, developer efficiency, and compliance with Mexican regulations (e.g., LFPDPPP, WCAG).

### 1.1 Objectives
- Enable rapid development with a small team using AI tools.
- Ensure scalability for 400–500 initial users, with 10x growth potential.
- Support seamless integration with Supabase, legacy systems, and Shopify.
- Deliver high-performance, accessible, Spanish-only UI aligned with MUVO CBD branding (www.muvocbd.com).
- Minimize technical debt and ensure extensibility for future features (e.g., video content, admin dashboard).

### 1.2 Constraints
- **Team Size**: Three developers, requiring high productivity and automation.
- **Timeline**: 6–9 months for MVP.
- **Budget**: In-house development, prioritizing free/open-source tools.
- **Platforms**: Mid-range Android devices (e.g., Samsung Galaxy A52), iPhones from last 5 years, modern browsers (Chrome, Safari).
- **Legacy System**: Unknown APIs/schema, requiring flexible integration.

## 2. Technology Stack

### 2.1 Frontend Technologies

#### 2.1.1 Mobile (iOS and Android)
- **Framework**: React Native (v0.75 or latest stable)
  - **Justification**: Enables code sharing (~80% shared logic) between iOS and Android, reducing development effort for a small team. Native modules ensure platform-specific UI (e.g., Swift for iOS, Kotlin for Android) for performance and adherence to Human Interface Guidelines (iOS) and Material Design (Android).
  - **Libraries**:
    - `react-native-qrcode-svg` (v6.x): QR code generation for recruiting.
    - `@react-navigation/native` (v6.x): Navigation for intuitive user flows.
    - `react-native-webview` (v13.x): Shopify and legacy system integration.
    - `react-native-safe-area-context` (v4.x): Handle device-specific layouts.
  - **Configuration**: Use TypeScript (v5.x) for type safety and AI tool compatibility (e.g., Cursor autocompletion).
  - **Alternatives**: Native Swift/Kotlin for full control, but increases effort. Flutter considered but less mature React Native ecosystem for JavaScript developers.

#### 2.1.2 Web
- **Framework**: Next.js (v15.x or latest stable)
  - **Justification**: Server-side rendering (SSR) and static site generation (SSG) optimize SEO and performance for mobile-first and desktop users. Integrates seamlessly with Supabase and supports rapid prototyping for a small team.
  - **Libraries**:
    - `next-auth` (v4.x): Authentication with Supabase Auth and OAuth providers (Apple, Google).
    - `tailwindcss` (v3.x): Rapid, responsive UI styling aligned with MUVO CBD branding (greens, whites).
    - `qrcode.react` (v3.x): QR code generation for recruiting.
    - `@supabase/supabase-js` (v2.x): Supabase client for database/storage.
  - **Configuration**: Use TypeScript, App Router for modern routing, and Vercel for deployment (free tier initially).
  - **Alternatives**: React with Vite for simplicity, but Next.js offers better SSR and ecosystem.

### 2.2 Backend Technologies

- **Primary Backend**: Supabase (latest stable, free tier initially)
  - **Justification**: Provides authentication, PostgreSQL database, storage, and serverless functions out of the box, reducing setup time for a small team. Scales seamlessly for 400–500 users and integrates natively with React Native and Next.js.
  - **Features Used**:
    - Supabase Auth: JWT-based authentication with username/password and OAuth (Apple, Google).
    - PostgreSQL: Relational database for users, network hierarchy, events, and content.
    - Storage: Store PDFs and future media (e.g., videos).
    - Edge Functions: Custom logic for QR code redirects, future integrations.
  - **Configuration**: Use Supabase CLI for schema migrations, Row-Level Security (RLS) for access control (e.g., admins edit content, MUVERS access own metrics).

- **Supplementary Backend**: Node.js (v20.x) with Express.js (v4.x)
  - **Justification**: Lightweight framework for custom APIs not handled by Supabase (e.g., legacy system proxy, complex business logic). Runs on Supabase Edge Functions or Vercel for serverless deployment.
  - **Libraries**:
    - `axios` (v1.x): API calls to legacy system or Shopify.
    - `jsonwebtoken` (v9.x): Token management for custom auth flows.
    - `supabase-js` (v2.x): Backend integration with Supabase.
  - **Alternatives**: Fastify for performance, but Express.js is simpler for small-scale APIs.

### 2.3 Database

- **Database**: Supabase PostgreSQL (v16.x or Supabase-managed version)
  - **Justification**: Relational structure suits complex network marketing hierarchies (parent-child relationships) and e-commerce transactions. Supabase’s managed Postgres offers scalability, backups, and RLS, ideal for a small team.
  - **Schema** (key tables):
    | Table            | Fields                                                                 | Purpose                              |
    |------------------|----------------------------------------------------------------------|--------------------------------------|
    | `users`          | `id`, `email`, `username`, `created_at`, `auth_provider`              | User accounts                        |
    | `user_profiles`  | `user_id`, `shipping_address`, `phone_number`, `full_name`, `updated_at` | Questionnaire responses              |
    | `network`        | `user_id`, `parent_id`, `level`, `joined_at`                         | Network hierarchy                    |
    | `user_metrics`   | `user_id`, `level`, `points`, `sales_personal`, `sales_team`, `updated_at` | Marketing metrics                    |
    | `events`         | `id`, `title`, `date`, `type` (live/online), `location`, `zoom_link`, `creator_id` | Event details                        |
    | `event_registrations` | `event_id`, `user_id`, `registered_at`                            | Event registrations                  |
    | `content`        | `id`, `title`, `body`, `type` (short/long/pdf), `file_url`, `created_at` | Editorial content                    |
    | `transactions`   | `user_id`, `amount`, `status`, `created_at`                          | E-commerce transactions              |
  - **Indexes**: `users(email)`, `network(user_id, parent_id)`, `content(type)` for performance.
  - **RLS**: Admins (`role: admin`) edit `content`; MUVERS read/write `events`, `user_metrics`.
  - **Alternatives**: Firebase Firestore for NoSQL, but less suited for relational network hierarchies.

### 2.4 Infrastructure

- **Hosting**: Supabase Hosting (free tier initially)
  - **Justification**: Fully managed hosting for database, storage, and edge functions, simplifying deployment. Scales automatically for user growth.
  - **Configuration**: Use Supabase dashboard for monitoring, CLI for deployments.

- **Web Hosting**: Vercel (free tier initially)
  - **Justification**: Optimized for Next.js, with zero-config deployments and automatic scaling. Supports serverless functions for custom APIs.
  - **Configuration**: CI/CD via GitHub integration, domain setup for www.muvoapp.com.

- **Supplementary Services** (post-MVP):
  - **Firebase Cloud Messaging**: Push notifications for event reminders.
  - **AWS S3**: Large file storage for videos or high-volume PDFs.
  - **Justification**: Firebase offers reliable push notifications; S3 scales for media storage.

- **Alternatives**: AWS Amplify for hosting, but Supabase/Vercel are simpler for initial setup.

### 2.5 DevOps and Tooling

- **Version Control**: Git (GitHub, private repo)
  - **Justification**: Industry-standard for collaboration, with GitHub Actions for CI/CD. Private repo ensures IP protection.
  - **Configuration**: Branching strategy (main, develop, feature branches), PR reviews by lead developer.

- **CI/CD**: GitHub Actions
  - **Justification**: Automates builds, tests, and deployments for React Native, Next.js, and Supabase. Free tier sufficient for small team.
  - **Workflows**:
    - Build/test mobile apps on push to `develop`.
    - Deploy Next.js to Vercel on merge to `main`.
    - Run Supabase migrations on schema changes.

- **Testing Frameworks**:
  - **Unit Tests**: Jest (v29.x) for web, XCTest (Xcode) for iOS, JUnit (Android Studio) for Android.
  - **E2E Tests**: Cypress (v13.x) for web, Detox (v20.x) for mobile (post-MVP).
  - **Justification**: Jest/Cypress are React-friendly; XCTest/JUnit are native defaults. AI tools like Cursor can generate test cases.
  - **Configuration**: 80% unit test coverage for critical paths (auth, APIs).

- **Monitoring**: Sentry (free tier initially)
  - **Justification**: Real-time error tracking for frontend and backend, with Supabase logs for database issues.
  - **Configuration**: Integrate with React Native, Next.js, and Express.js.

- **API Testing**: Postman (free tier)
  - **Justification**: Simplifies API development and debugging for backend developer.

### 2.6 Design and Prototyping

- **Tool**: Figma (free tier)
  - **Justification**: Industry-standard for UI/UX design, with plugins for code export to React Native/Next.js. Supports collaboration for designer and developers.
  - **Configuration**: Create mockups for core screens (home, registration, shop, recruit, events, dashboard, learn), export CSS for Tailwind.

### 2.7 AI-Assisted Development

- **Primary Tool**: Cursor (latest stable)
  - **Justification**: AI-powered IDE accelerates coding, autocompletion, and documentation for React Native, Next.js, and Node.js. Optimizes workflows for a small team.
  - **Use Cases**:
    - Generate boilerplate for screens, components, and APIs.
    - Autocomplete Supabase queries and TypeScript types.
    - Write inline comments and README sections.
    - Suggest test cases for Jest/XCTest/JUnit.
  - **Configuration**: Use TypeScript and clear folder names (e.g., `Screens`, `Services`) for AI context.

- **Supplementary Tool**: GitHub Copilot
  - **Justification**: Complements Cursor with real-time code suggestions, especially for backend APIs and complex logic.
  - **Configuration**: Enable in VS Code for all developers.

### 2.8 Localization and Compliance

- **Localization**: i18next (v23.x) for React Native/Next.js
  - **Justification**: Simplifies Spanish-only UI, with future-proofing for additional languages if needed.
  - **Configuration**: Store translations in `shared/locales/es.json`.

- **Compliance**: Manual audits for LFPDPPP and WCAG 2.1
  - **Justification**: Ensures data privacy (e.g., user consent for profiles) and accessibility (e.g., screen reader support).
  - **Tools**: Axe DevTools for WCAG testing, Supabase RLS for data privacy.

## 3. Integration Strategy

### 3.1 Supabase Integration
- **Authentication**: Supabase Auth with JWT tokens, integrated via `next-auth` (web) and `@supabase/supabase-js` (mobile).
- **Database**: Use Supabase client for CRUD operations, with RLS policies for security.
- **Storage**: Store PDFs in Supabase Storage, with public URLs for content access.
- **Edge Functions**: Handle QR code redirects and legacy system proxy calls.

### 3.2 Legacy System Integration
- **Initial**: WebView with legacy system URL (assumed accessible).
- **Future**: Proxy APIs via Express.js to fetch product data, map to Supabase schema.
- **Migration**: CSV/JSON export from legacy system, imported via Node.js script to Supabase.
- **Assumption**: Legacy system provides export or API access; details TBD.

### 3.3 Shopify Integration
- **Approach**: WebView (mobile) or iframe (web) for www.muvocbd.com.
- **Configuration**: Persistent navigation bar to maintain app context.
- **Future**: API layer (`GET /external-store`) for other platforms.

## 4. Performance and Scalability

- **Performance**:
  - React Native: Optimize with memoization, lazy loading for content lists.
  - Next.js: Use SSG for content pages, ISR for dynamic pages.
  - Supabase: Index critical columns, use connection pooling.
- **Scalability**:
  - Supabase: Auto-scales database/storage, monitor via dashboard.
  - Vercel: Serverless functions scale with traffic.
  - Caching: Redis (post-MVP) for high-traffic endpoints (e.g., content, metrics).
- **Target**: <2-second app load, <500ms API responses for 400–500 users.

## 5. Development Workflow

- **Setup**:
  1. Initialize GitHub repo with `muvo-app` structure.
  2. Configure Supabase project, apply schema migrations.
  3. Set up Next.js project with Vercel, React Native with Expo (v51.x).
- **Coding**:
  - Use Cursor for boilerplate (screens, APIs), Copilot for logic.
  - Follow TypeScript conventions, add inline comments (e.g., `// Fetch user metrics`).
- **Testing**:
  - Write Jest tests for components, APIs.
  - Use Postman for API validation.
  - Plan Cypress/Detox for E2E (post-MVP).
- **Deployment**:
  - Deploy Next.js to Vercel via GitHub Actions.
  - Build mobile apps for TestFlight (iOS), Play Store (Android).
- **Documentation**:
  - Maintain README.md with setup, architecture.
  - Generate API spec (OpenAPI) in `docs/api-spec.md`.

## 6. Future Considerations

- **Push Notifications**: Add Firebase Cloud Messaging for event reminders.
- **Video Content**: Use AWS S3 for storage, CloudFront for delivery.
- **Admin Dashboard**: Build with Next.js, integrate Supabase analytics.
- **Microservices**: Split monolith into services (e.g., auth, content) for >10,000 users.

## 7. Appendix

### 7.1 Glossary
- **MUVER**: Member of MUVO CBD’s network marketing program.
- **Virtual Office**: Legacy e-commerce/network platform.
- **Supabase**: Backend service for auth, database, storage.
- **LFPDPPP**: Mexican data privacy law.

### 7.2 Assumptions
- Legacy system provides API/WebView access or data export.
- MUVO CBD supplies branding assets post-approval.
- Initial user base (<500) requires no advanced scaling.

### 7.3 References
- Supabase: supabase.com/docs
- React Native: reactnative.dev
- Next.js: nextjs.org
- MUVO CBD: www.muvocbd.com