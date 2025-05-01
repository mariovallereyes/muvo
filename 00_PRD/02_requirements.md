
- **Rationale**:
  - **Separation**: Distinct roots prevent cross-platform conflicts.
  - **Shared Module**: Reduces duplication for API calls, Supabase SDK, and models.
  - **AI-Friendly**: Clear folder names and inline comments (e.g., `// Maneja registro de usuarios`) for tools like Cursor.
  - **Compact**: Minimal boilerplate, reusable components/services.

### 4.2 Database and Legacy Integration

#### 4.2.1 Supabase Database Schema
The Supabase database supports network marketing and modularity:

| Table            | Fields                                                                 | Purpose                              |
|------------------|----------------------------------------------------------------------|--------------------------------------|
| `users`          | `id`, `email`, `username`, `created_at`, `auth_provider`              | Store user accounts                  |
| `user_profiles`  | `user_id`, `shipping_address`, `phone_number`, `full_name`, `updated_at` | Store questionnaire responses        |
| `network`        | `user_id`, `parent_id`, `level`, `joined_at`                         | Network hierarchy (parent-child)     |
| `user_metrics`   | `user_id`, `level`, `points`, `sales_personal`, `sales_team`, `updated_at` | Network marketing metrics            |
| `events`         | `id`, `title`, `date`, `type` (live/online), `location`, `zoom_link`, `creator_id` | Event details                        |
| `event_registrations` | `event_id`, `user_id`, `registered_at`                            | Event registrations                  |
| `content`        | `id`, `title`, `body`, `type` (short/long/pdf), `file_url`, `created_at` | Editorial content                    |
| `transactions`   | `user_id`, `amount`, `status`, `created_at`                          | Future e-commerce transactions       |

- **Indexes**: `users(email)`, `network(user_id, parent_id)`, `content(type)` for performance.
- **RBAC**: Admins (`role: admin`) edit `content`; MUVERS read/write `events`, `user_metrics`.

#### 4.2.2 Legacy Migration
- **Strategy**: Generic CSV or API-based data feed from legacy “virtual office” system.
- **Process**:
  1. Export legacy data (users, network hierarchy, sales) to CSV or JSON.
  2. Map to Supabase schema (e.g., legacy `user_id` → `users.id`).
  3. Import using Supabase CLI or Node.js script.
- **Tools**: Node.js, Supabase migration tools.
- **Assumption**: Legacy system supports data export; details TBD.

### 4.3 Backend and APIs
- **Primary Backend**: Supabase (auth, database, storage).
- **Supplementary Services** (post-MVP):
  - Firebase for push notifications.
  - AWS S3 for large file storage (e.g., videos).
- **API Design** (REST, hosted on Supabase or Next.js API routes):
  - `GET /users/{id}/metrics`: Fetch MUVER metrics.
  - `GET /events`: List events (filter by type).
  - `POST /events`: Create event.
  - `POST /events/register`: Register for event.
  - `GET /content`: List content (filter by type).
  - `GET /content/{id}`: Fetch specific content.
  - `POST /register?referrer={id}`: Register new MUVER.
- **Documentation**: OpenAPI spec in `docs/api-spec.md`.

### 4.4 UI/UX Requirements
- **Branding**: Align with www.muvocbd.com (warm greens, whites, Montserrat or similar typography).
- **Style**: Clean, minimalist, with vibrant CTAs (e.g., “Comprar Ahora”).
- **Animations**: Subtle transitions (fade-in for content, slide for navigation).
- **Accessibility**: WCAG 2.1 Level AA (high-contrast text, alt text, keyboard navigation).
- **Platform-Specific**:
  - **iOS**: Human Interface Guidelines (SF Symbols, native navigation).
  - **Android**: Material Design (FAB for event creation, ripple effects).
  - **Web**: Mobile-first responsive grid, desktop-friendly wider layouts.
- **Wireframes** (text-based):
  - **Home**: Logo header, sections (Tienda, Aprender, Eventos, Tablero), “Unirse como MUVER” CTA.
  - **Registration**: Form (username, email, password), Apple/Google buttons, questionnaire (address, phone).
  - **Tienda**: MUVERS: “Ir a Oficina Virtual” button; Non-MUVERS: Shopify WebView with navigation bar.
  - **Reclutar**: Large QR code, “Compartir” button (SMS, WhatsApp).
  - **Eventos**: Event cards (title, date, type), filter, creation form.
  - **Tablero**: Metric cards (level, points, sales), sales trend graph.
  - **Aprender**: Content grid (thumbnails, titles), article/PDF viewer.

### 4.5 Development Workflows
- **AI-Assisted Tools**:
  - **Cursor**: Code generation (React components, Supabase queries), autocompletion, documentation.
  - **GitHub Copilot**: Accelerate frontend/backend coding.
  - **ChatGPT Plugins**: Generate API specs, test cases.
- **Workflow**:
  1. Designer creates Figma mockups, exports to code.
  2. Backend developer sets up Supabase schema, APIs using Cursor.
  3. Frontend developer builds screens, uses Cursor for boilerplate.
  4. Lead developer reviews, optimizes AI-generated code.
- **Testing**:
  - Unit tests: Jest (web), XCTest (iOS), JUnit (Android).
  - E2E tests: Cypress (web), Detox (mobile, post-MVP).
  - AI-generated test cases via Cursor.

## 5. Dependencies and Constraints

### 5.1 Dependencies
- **Supabase**: Authentication, database, storage (free tier initially).
- **Legacy System**: Integration via WebView or APIs (details TBD).
- **Shopify**: In-app browser for www.muvocbd.com.
- **Libraries**:
  - `qrcode` (web), `react-native-qrcode-svg` (mobile) for QR codes.
  - `axios` or `fetch` for API clients.
  - Tailwind CSS or styled-components for web styling.
- **Tools**:
  - Git (GitHub, private repo) for version control.
  - Figma for design mockups.
  - Postman for API testing.
  - Sentry for error monitoring.

### 5.2 Constraints
- **Team Size**: Three developers (lead developer/designer, backend, frontend).
- **Timeline**: 6–9 months for MVP (assumed, to be refined).
- **Platform Compatibility**: Mid-range Android devices (e.g., Samsung Galaxy A52), iPhones from last 5 years, modern browsers (Chrome, Safari).
- **Budget**: In-house development, prioritize free/open-source tools.
- **Legacy System**: Unknown APIs/schema require flexible integration.

## 6. Milestones and Deliverables

### 6.1 MVP Scope
- **MUVER Module**: Authentication, product purchases (legacy), recruiting (QR codes), events (basic), dashboard (metrics).
- **Editorial Module**: Content browsing, basic CMS.
- **Shopify Integration**: In-app browser for Shopify store.

### 6.2 Milestones
1. **Month 1–2**: Supabase setup, database schema, API design, Figma mockups.
2. **Month 3–5**: MUVER module, Shopify integration.
3. **Month 6–7**: Editorial module, CMS, UI polish.
4. **Month 8–9**: Testing, bug fixes, beta release.

### 6.3 Deliverables
- Supabase database schema and migrations.
- REST API specification (OpenAPI).
- Figma mockups for core screens.
- Codebase with iOS, Android, web roots.
- Documentation: README, API spec, setup guide.

## 7. Future Considerations
- **Admin Dashboard**: Web-based analytics for user activity, sales, content engagement.
- **E-commerce Migration**: Full in-app purchasing for MUVERS.
- **Content Expansion**: Videos, user-generated content.
- **Scalability**: Load balancing, CDN for content delivery.
- **Push Notifications**: Firebase integration for event reminders.

## 8. Appendix

### 8.1 Glossary
- **MUVER**: Member of MUVO CBD’s network marketing program.
- **Virtual Office**: Legacy e-commerce and network management platform.
- **Supabase**: Backend service for auth, database, storage.
- **LFPDPPP**: Mexican Federal Law on Protection of Personal Data Held by Private Parties.

### 8.2 Assumptions
- Legacy system provides API/WebView access or data export.
- MUVO CBD team supplies branding assets post-approval.
- Initial user base (<500) requires no advanced scaling.

### 8.3 References
- MUVO CBD website: www.muvocbd.com (branding).
- Supabase documentation: supabase.com/docs.
- Mexican data privacy law: LFPDPPP.
- WCAG 2.1: www.w3.org/WAI/standards-guidelines/wcag/.