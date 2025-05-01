
- **Rationale**:
  - **Separation**: Distinct roots prevent cross-platform conflicts.
  - **Shared Module**: Reduces duplication for API calls, Supabase SDK, and models.
  - **AI-Friendly**: Clear folder names and inline comments (e.g., `// Handles user registration`) aid tools like Cursor.
  - **Compact**: Minimal boilerplate, with reusable components/services.

### 4.2 Database and Legacy Integration

#### 4.2.1 Supabase Database Schema
The Supabase database is designed for network marketing and modularity:

| Table            | Fields                                                                 |気づ

System: It looks like the Markdown content was cut off at the end of the `Supabase Database Schema` table due to a character limit or formatting issue. I'll complete the PRD content by continuing from where it was truncated, ensuring the full document is provided in raw Markdown format within a code snippet, as requested. I'll also verify that the entire PRD is included, properly formatted, and matches the structure and details from the previous response. The content will be wrapped in the `<xaiArtifact>` tag with the same `artifact_id` to indicate it's an updated version of the PRD.

Below is the complete PRD in raw Markdown format, starting from the beginning to ensure no sections are missed, and completing the table and subsequent sections that were cut off. You can copy this directly into a `.md` file (e.g., `muvo-prd.md`) to use or edit.

---

<xaiArtifact artifact_id="b576a0b0-459e-4f2f-98c2-35c4cdc661cd" artifact_version_id="7a67ea13-5bf6-4de3-a4af-086523c186ef" title="Muvo App Product Requirements Document (PRD)" contentType="text/markdown">

```markdown
# Muvo App Product Requirements Document (PRD)

**Date:** May 1, 2025  
**Version:** 1.0  
**Authors:** [AI-Generated, to be assigned by MUVO CBD team]  
**Status:** Draft, pending stakeholder review

## 1. Introduction

### 1.1 Purpose
This Product Requirements Document (PRD) defines the functional, non-functional, and technical requirements for the Muvo app, a mobile and web application developed by MUVO CBD, a leading CBD e-commerce and multi-level/network marketing brand in Mexico. The app targets two user groups: **MUVERS** (members of MUVO CBD’s network marketing program) and **non-MUVERS** (casual users interested in CBD products and education). The app aims to streamline MUVERS’ business activities, provide educational content, and integrate with MUVO CBD’s Shopify store (www.muvocbd.com).

### 1.2 Objectives
- **Core Objective 1: MUVER Member Module**: Enable MUVERS to purchase products, recruit new members, manage events, and track network marketing metrics via a modern, scalable platform.
- **Core Objective 2: Editorial and Learning Module**: Offer accessible, admin-controlled content (articles, PDFs) on CBD benefits, health, and wellness for all users.
- **Core Objective 3: Shopify Integration**: Provide seamless navigation of the Shopify store for non-MUVERS, with plans for future e-commerce extensibility.
- **Technical Goals**: Build native iOS, native Android, and web apps with a modular, AI-friendly codebase, leveraging Supabase and AI-assisted tools (e.g., Cursor) for a three-person development team.

### 1.3 Scope
The Muvo app will be developed for:
- **Platforms**: Native iOS (Swift or React Native), native Android (Kotlin or React Native), web (Next.js).
- **Initial User Base**: 400–500 users (primarily MUVERS).
- **MVP Features**: Core MUVER module (authentication, product purchases, recruiting, event management, admin), basic editorial module, Shopify integration.
- **Constraints**: Development by a three-person team (lead developer/designer, backend developer, frontend developer), Spanish-only, compliance with Mexican regulations.

### 1.4 Assumptions
- The legacy “virtual office” system’s database type is unknown; a generic migration strategy will be proposed.
- Legacy system APIs for e-commerce integration are available or can be accessed via WebView.
- MUVO CBD’s branding guidelines (colors, typography) are derived from www.muvocbd.com.
- Supabase free tier is sufficient for the initial user base; additional services (e.g., Firebase) may be added later.

## 2. Functional Requirements

### 2.1 MUVER Member Module
This module is exclusive to registered MUVERS and supports their network marketing activities.

#### 2.1.1 Authentication and Registration
- **User Flow**:
  1. User selects “Register” or “Login” from the app’s home screen.
  2. Registration: Input username, password, email; optional Apple Sign-In (iOS) or Google Sign-In (Android).
  3. Post-registration: Complete a questionnaire (shipping address, phone number; 3–5 fields, mandatory).
  4. Login: Username/password or social login, with password recovery via email.
- **Technical Details**:
  - Use Supabase Auth for username/password and OAuth (Apple, Google).
  - Store user data in a `users` table (see Section 4.2.1).
  - Questionnaire responses stored in a `user_profiles` table.
- **Success Criteria**:
  - 95% of users complete registration in under 2 minutes.
  - Social logins functional on 100% of supported devices.

#### 2.1.2 Product Purchases
- **User Flow**:
  1. MUVER navigates to “Shop” section.
  2. Initial Phase: Redirect to legacy “virtual office” system via WebView or deep link.
  3. Future Phase: Display product catalog, add to cart, and checkout within the app.
- **Technical Details**:
  - Initial Integration: WebView with URL to legacy system (assumed to be accessible).
  - Future Integration: REST API endpoints (`GET /products`, `POST /cart`, `POST /checkout`) for product data and transactions.
  - Non-MUVERS redirected to Shopify store (www.muvocbd.com) via in-app browser.
- **Success Criteria**:
  - Seamless navigation to legacy system with <2-second load time.
  - API design supports future migration without frontend changes.

#### 2.1.3 Recruiting New MUVERS
- **User Flow**:
  1. MUVER navigates to “Recruit” section.
  2. App displays a unique QR code linked to their user ID.
  3. New user scans QR code, is directed to a registration page pre-populated with the recruiter’s ID.
  4. New user completes registration and is added to the recruiter’s downline.
- **Technical Details**:
  - Generate QR codes using a library (e.g., `qrcode` for web, native equivalents for mobile).
  - Dynamic registration page hosted at `/register?referrer={user_id}`.
  - Store network hierarchy in a `network` table (parent-child relationships).
  - Ensure flexibility for structure changes (e.g., adjustable depth of pyramid levels).
- **Success Criteria**:
  - QR code generation and scanning functional on 100% of supported devices.
  - New MUVER registered under correct recruiter in <1 minute.

#### 2.1.4 Event Management
- **User Flow**:
  1. MUVER navigates to “Events” section.
  2. View list of upcoming events (live or Zoom).
  3. Options: Register for an event, create a new event (title, date, location/Zoom link), or manage existing events.
- **Technical Details**:
  - Store events in an `events` table (fields: `id`, `title`, `date`, `type`, `location`, `zoom_link`, `creator_id`).
  - API endpoints: `GET /events`, `POST /events`, `POST /events/register`.
  - Simple UI: List view with filter (live/online) and form for event creation.
- **Success Criteria**:
  - Event creation and registration complete in <30 seconds.
  - Scalable design supports 100+ events without performance degradation.

#### 2.1.5 Network Marketing Admin
- **User Flow**:
  1. MUVER navigates to “Dashboard” section.
  2. View metrics: current level (e.g., Bronze, Silver), points, milestones to next level, total sales, downline performance.
- **Technical Details**:
  - Proposed **Proposed Metrics** (based on industry standards):
    - **Level**: Tiered ranks (e.g., Bronze → Diamond) based on sales volume and downline size.
    - **Points**: Earned via personal sales (1 point per $100) and downline sales (0.5 points per $100).
    - **Milestones**: Thresholds for next level (e.g., 1000 points + 5 recruits for Silver).
    - **Sales**: Personal and team sales (monthly, lifetime).
    - **Downline**: Number of recruits and their levels.
  - Store metrics in `user_metrics` table, updated via cron jobs or real-time triggers.
  - API endpoint: `GET /users/{id}/metrics`.
- **Success Criteria**:
  - Metrics displayed in <1 second.
  - Accurate reflection of network hierarchy and sales data.

### 2.2 Editorial and Learning Module
- **User Flow**:
  1. User (MUVER or non-MUVER) navigates to “Learn” section.
  2. Browse content: short articles (<500 words), long articles (>500 words), PDFs.
  3. Admins upload/edit content via a CMS.
- **Technical Details**:
  - Store content in Supabase storage (PDFs) and `content` table (articles: `id`, `title`, `body`, `type`, `created_at`).
  - CMS: Simple admin interface (Next.js or Supabase dashboard) for content management.
  - API endpoints: `GET /content`, `GET /content/{id}`.
  - Public access, no authentication required.
- **Success Criteria**:
  - Content loads in <2 seconds.
  - CMS supports 10+ content uploads daily without errors.

### 2.3 Shopify Integration
- **User Flow**:
  1. Non-MUVER navigates to “Shop” section.
  2. Browse www.muvocbd.com within an in-app browser.
  3. Seamless return to app features via navigation bar.
- **Technical Details**:
  - Use WebView (mobile) or iframe (web) for Shopify store.
  - Ensure navigation bar persists for app feature access.
  - Future: Modular API layer (`GET /external-store`) for other platforms.
- **Success Criteria**:
  - Shopify store loads in <3 seconds.
  - No navigation conflicts between app and store.

## 3. Non-Functional Requirements

### 3.1 Performance
- App loads in <2 seconds on mid-range devices (e.g., Samsung Galaxy A52, iPhone SE 2020).
- API response time: <500ms for 95% of requests.
- Initial user base: 400–500 users, no significant peak load.

### 3.2 Scalability
- Modular architecture (monolith with microservices-ready components) supports 10x user growth.
- Supabase database optimized for read-heavy operations (e.g., content, metrics).
- Caching (e.g., Redis) planned for high-traffic endpoints.

### 3.3 Security
- Supabase Auth for secure user authentication (JWT tokens).
- Data encryption at rest and in transit (HTTPS, Supabase defaults).
- Role-based access control (RBAC) for admin CMS and MUVER data.
- Compliance with Mexican data privacy laws (e.g., LFPDPPP).

### 3.4 Accessibility
- WCAG 2.1 Level AA compliance (e.g., high-contrast mode, screen reader support).
- Spanish-only interface, optimized for Mexican users.
- Test on common assistive technologies (e.g., VoiceOver, TalkBack).

### 3.5 Reliability
- 99.9% uptime for Supabase and app services.
- Error monitoring via Sentry or Supabase logs.
- Automated backups for Supabase database (daily).

## 4. Technical Architecture

### 4.1 Codebase Structure (IMPORTANT: THIS WILL CHANGE OVER TIME)
The codebase is split into three roots (`ios`, `android`, `web`) with a shared utilities module to minimize redundancy. Below is the proposed structure, optimized for AI navigation and a small team:

muvo-app/
├── ios/                          # Native iOS app (Swift or React Native)
│   ├── MuvoApp.xcodeproj/        # Xcode project
│   ├── Source/                   # Source code
│   │   ├── Screens/              # UI screens (e.g., RegisterScreen.swift)
│   │   ├── Components/           # Reusable UI components
│   │   ├── Services/             # API and Supabase services
│   │   └── Models/               # Data models (e.g., User, Event)
│   └── Tests/                    # Unit and UI tests
├── android/                      # Native Android app (Kotlin or React Native)
│   ├── app/                      # Android Studio project
│   │   ├── src/main/             # Source code
│   │   │   ├── java/com/muvo/    # Packages for screens, services, models
│   │   │   └── res/              # Resources (layouts, drawables)
│   │   └── build.gradle          # Build configuration
│   └── tests/                    # Unit and instrumentation tests
├── web/                          # Web app (Next.js)
│   ├── pages/                    # Next.js pages (e.g., index.js, register.js)
│   ├── components/               # Reusable React components
│   ├── services/                 # API and Supabase services
│   ├── styles/                   # Tailwind CSS or styled-components
│   ├── public/                   # Static assets
│   └── tests/                    # Jest tests
├── shared/                       # Shared utilities (cross-platform)
│   ├── api/                      # API client (e.g., axios, fetch)
│   ├── supabase/                 # Supabase SDK configuration
│   ├── models/                   # Shared data models (JSON schemas)
│   └── utils/                    # Helpers (e.g., QR code generator)
├── docs/                         # Documentation
│   ├── README.md                 # Project overview
│   └── api-spec.md               # API documentation
└── .gitignore                    # Git ignore file

- **Rationale**:
  - **Separation**: Distinct roots prevent cross-platform conflicts.
  - **Shared Module**: Reduces duplication for API calls, Supabase SDK, and models.
  - **AI-Friendly**: Clear folder names and inline comments (e.g., `// Handles user registration`) aid tools like Cursor.
  - **Compact**: Minimal boilerplate, with reusable components/services.

### 4.2 Database and Legacy Integration

#### 4.2.1 Supabase Database Schema
The Supabase database is designed for network marketing and modularity:

| Table            | Fields                                                                 | Purpose                              |
|------------------|----------------------------------------------------------------------|--------------------------------------|
| `users`          | `id`, `email`, `username`, `created_at`, `auth_provider`              | Store user accounts                  |
| `user_profiles`  | `user_id`, `shipping_address`, `phone_number`, `updated_at`           | Store questionnaire responses        |
| `network`        | `user_id`, `parent_id`, `level`, `joined_at`                         | Network hierarchy (parent-child)     |
| `user_metrics`   | `user_id`, `level`, `points`, `sales_personal`, `sales_team`, `updated_at` | Network marketing metrics            |
| `events`         | `id`, `title`, `date`, `type` (live/online), `location`, `zoom_link`, `creator_id` | Event details                        |
| `event_registrations` | `event_id`, `user_id`, `registered_at`                            | Event registrations                  |
| `content`        | `id`, `title`, `body`, `type` (short/long/pdf), `file_url`, `created_at` | Editorial content                    |
| `transactions`   | `user_id`, `amount`, `status`, `created_at`                          | Future e-commerce transactions       |

- **Indexes**: `users(email)`, `network(user_id, parent_id)`, `content(type)` for performance.
- **RBAC**: Admins (`role: admin`) can edit `content`; MUVERS can read/write `events`, `user_metrics`.

#### 4.2.2 Legacy Migration
- **Strategy**: Assume a generic CSV or API-based data feed from the legacy “virtual office” system.
- **Process**:
  1. Export legacy data (users, network hierarchy, sales) to CSV or JSON.
  2. Map to Supabase schema (e.g., legacy `user_id` → `users.id`).
  3. Use Supabase CLI or script to import data.
- **Tools**: Node.js script or Supabase migration tools.
- **Assumption**: Legacy system provides export functionality; details TBD.

### 4.3 Backend and APIs
- **Primary Backend**: Supabase (auth, database, storage).
- **Supplementary Services**:
  - Firebase for push notifications (optional, post-MVP).
  - AWS S3 for large file storage (future PDFs/videos).
- **API Design** (REST, hosted on Supabase or Next.js API routes):
  - `GET /users/{id}/metrics`: Fetch MUVER metrics.
  - `GET /events`: List events.
  - `POST /events`: Create event.
  - `GET /content`: List content.
  - `POST /register?referrer={id}`: Register new MUVER.
- **Documentation**: OpenAPI spec in `docs/api-spec.md`.

### 4.4 Development Workflows
- **AI-Assisted Tools**:
  - **Cursor**: Use for code generation (e.g., React components, Supabase queries), autocompletion, and inline documentation.
  - **GitHub Copilot**: Suggest for frontend/backend developers to accelerate coding.
  - **ChatGPT Plugins**: Use for generating API specs or test cases.
- **Workflow**:
  1. Designer creates Figma mockups, exports to code via plugins.
  2. Backend developer sets up Supabase schema, APIs using Cursor.
  3. Frontend developer builds screens, uses Cursor for boilerplate.
  4. Lead developer reviews code, ensures AI-generated code is optimized.
- **Testing**:
  - Unit tests: Jest (web), XCTest (iOS), JUnit (Android).
  - E2E tests: Cypress (web), Detox (mobile, post-MVP).
  - AI-generated test cases via Cursor.

## 5. UI/UX Guidelines

### 5.1 Design Principles
- **Branding**: Align with www.muvocbd.com (warm greens, whites, modern typography like Montserrat or similar).
- **Style**: Clean, minimalist, with vibrant accents for CTAs (e.g., “Shop Now”).
- **Animations**: Subtle transitions (e.g., fade-in for content, slide for navigation).
- **Accessibility**: High-contrast text, alt text for images, keyboard navigation.

### 5.2 Wireframe Descriptions
- **Home Screen**:
  - Header: MUVO CBD logo, user profile icon.
  - Sections: “Shop” (MUVERS/non-MUVERS), “Learn” (content), “Events” (MUVERS), “Dashboard” (MUVERS).
  - CTA: Prominent “Join as MUVER” button for non-MUVERS.
- **Registration Screen**:
  - Form: Username, email, password fields; Apple/Google login buttons.
  - Post-registration: Questionnaire (address, phone; 3 fields, “Submit” button).
- **Shop Screen**:
  - MUVERS: Button to legacy system (“Go to Virtual Office”).
  - Non-MUVERS: WebView of Shopify store, persistent app navigation bar.
- **Recruit Screen**:
  - Large QR code display, “Share” button (links to SMS, WhatsApp).
  - Instructions: “Scan to join my team.”
- **Events Screen**:
  - List: Event cards (title, date, type), filter by live/online.
  - Create: Form (title, date, location/Zoom link).
- **Dashboard Screen**:
  - Metrics: Cards for level, points, sales, downline size.
  - Chart: Sales trend (line graph, monthly).
- **Learn Screen**:
  - Grid: Content cards (thumbnail, title, type).
  - Detail: Full article or PDF viewer.

### 5.3 Platform-Specific Optimizations
- **iOS**: Adhere to Human Interface Guidelines (e.g., SF Symbols, native navigation).
- **Android**: Follow Material Design (e.g., FAB for event creation, ripple effects).
- **Web**: Mobile-first (responsive grid), desktop-friendly (wider layouts).

## 6. Development Plan

### 6.1 MVP SCOPE
- **MUVER Module**: Authentication, product purchases (legacy integration), recruiting (QR codes), events (basic), dashboard (core metrics).
- **Editorial Module**: Content browsing, basic CMS.
- **Shopify Integration**: In-app browser for www.muvocbd.com.
- **Timeline**: 6–9 months (assumed, to be refined by team).

### 6.2 Milestones
1. **Month 1–2**: Supabase setup, database schema, API design, Figma mockups.
2. **Month 3–5**: Core MUVER module, Shopify integration.
3. **Month 6–7**: Editorial module, CMS, UI polish.
4. **Month 8–9**: Testing, bug fixes, beta release.

### 6.3 Recommended Tools
- **Version Control**: Git (GitHub, private repo).
- **Design**: Figma (mockups, export to code).
- **API Testing**: Postman.
- **Monitoring**: Sentry, Supabase analytics.
- **CI/CD**: GitHub Actions (build, test, deploy).

## 7. Future Considerations
- **Admin Dashboard**: Web-based “God’s view” for analytics (user activity, sales, content engagement).
- **E-commerce Migration**: Full in-app purchasing for MUVERS.
- **Content Expansion**: Videos, user-generated content.
- **Scalability**: Load balancing, CDN for content delivery.

## 8. Appendix

### 8.1 Glossary
- **MUVER**: Member of MUVO CBD’s network marketing program.
- **Virtual Office**: Legacy e-commerce and network management platform.
- **Supabase**: Backend service for auth, database, storage.

### 8.2 Assumptions
- Legacy system APIs or WebView access will be provided.
- MUVO CBD team will supply detailed branding assets post-PRD approval.
- Initial user base (<500) does not require advanced scaling.

### 8.3 References
- MUVO CBD website: www.muvocbd.com (branding inspiration).
- Supabase documentation: supabase.com/docs.
- Mexican data privacy law: LFPDPPP.