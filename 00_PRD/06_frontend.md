# Muvo App: Frontend Implementation Guide

Date: May 1, 2025
Version: 1.0
Authors: [AI-Generated, to be assigned by MUVO CBD team]
Status: Draft, pending stakeholder review

## 1. Overview

This guide details the frontend implementation for the Muvo app, a mobile and web application developed by MUVO CBD, a leading CBD e-commerce and multi-level/network marketing brand in Mexico. The frontend serves MUVERS (network marketing members) and non-MUVERS (casual users) across modules for network marketing, e-commerce, and educational content. The implementation uses React Native for mobile (iOS, Android) and Next.js for web, targeting a modular, reusable architecture optimized for a three-person development team (lead developer/designer, backend developer, frontend developer) using AI-assisted tools like Cursor. The frontend ensures scalability for 400–500 initial users, compliance with Mexican regulations (LFPDPPP, WCAG), and integration with Supabase, legacy systems, and Shopify.

### 1.1 Objectives
- Build a modular, reusable frontend for iOS, Android, and web using React Native and Next.js.
- Implement responsive, accessible UI/UX aligned with MUVO CBD branding (www.muvocbd.com).
- Ensure efficient state management and data fetching with Supabase.
- Optimize performance (<2s screen load) and accessibility (WCAG 2.1 Level AA).
- Leverage Cursor for rapid component, hook, and test generation.
- Support seamless navigation and error handling across modules.

### 1.2 Scope
- Platforms: iOS (React Native/Swift), Android (React Native/Kotlin), web (Next.js).
- Modules: MUVER (auth, purchases, recruiting, events, admin), Editorial (content), Shopify (e-commerce).
- Architecture: React Native for mobile, Next.js for web, shared utilities.
- Constraints: Three-person team, 6–9 month MVP timeline, Spanish-only UI.

### 1.3 Assumptions
- Supabase APIs are available for authentication, data, and storage.
- Legacy system and Shopify store are accessible via WebView.
- MUVO CBD branding assets (colors, typography) are derived from www.muvocbd.com.

## 2. Folder Structure

The frontend is organized into separate roots for mobile (React Native) and web (Next.js), with shared utilities to minimize duplication.

Mobile (React Native):
muvo-app/mobile/
├── src/
│   ├── components/
│   │   ├── auth/                 # Authentication components
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegistrationScreen.tsx
│   │   │   └── OnboardingScreen.tsx
│   │   ├── muver/                # MUVER module components
│   │   │   ├── MuverDashboard.tsx
│   │   │   ├── ProductPurchase.tsx
│   │   │   ├── Recruiting.tsx
│   │   │   ├── EventManagement.tsx
│   │   │   └── NetworkAdmin.tsx
│   │   ├── editorial/            # Editorial module components
│   │   │   ├── ArticleList.tsx
│   │   │   └── ArticleDetail.tsx
│   │   ├── shared/               # Shared components
│   │   │   ├── NavigationBar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LoadingIndicator.tsx
│   │   │   └── ErrorBoundary.tsx
│   ├── hooks/                    # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useMuverData.ts
│   │   ├── useContent.ts
│   │   └── useApi.ts
│   ├── navigation/               # React Navigation setup
│   │   └── AppNavigator.tsx
│   ├── redux/                    # Redux Toolkit setup
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── muverSlice.ts
│   │   │   └── contentSlice.ts
│   │   └── store.ts
│   ├── services/                 # API and Supabase clients
│   │   ├── supabaseClient.ts
│   │   └── apiClient.ts
│   ├── assets/                   # Images, fonts, etc.
│   │   ├── images/
│   │   └── fonts/
│   ├── locales/                  # i18next translations
│   │   └── es.json
│   └── tests/                    # Jest/Detox tests
│       ├── components/
│       └── hooks/

Web (Next.js):
muvo-app/web/
├── pages/                        # Next.js pages
│   ├── index.tsx                 # Home screen
│   ├── login.tsx
│   ├── register.tsx
│   ├── muver/
│   │   ├── dashboard.tsx
│   │   ├── shop.tsx
│   │   ├── recruit.tsx
│   │   ├── events.tsx
│   │   └── network.tsx
│   ├── articles/
│   │   ├── index.tsx
│   │   └── [id].tsx
│   ├── _app.tsx                  # App wrapper
│   └── _document.tsx             # Document setup
├── components/                   # Reusable components
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── Registration.tsx
│   │   └── Onboarding.tsx
│   ├── muver/
│   │   ├── MuverDashboard.tsx
│   │   ├── ProductPurchase.tsx
│   │   ├── Recruiting.tsx
│   │   ├── EventManagement.tsx
│   │   └── NetworkAdmin.tsx
│   ├── editorial/
│   │   ├── ArticleList.tsx
│   │   └── ArticleDetail.tsx
│   ├── shared/
│   │   ├── NavigationBar.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingIndicator.tsx
│   │   └── ErrorBoundary.tsx
├── hooks/                        # Custom hooks
│   ├── useAuth.ts
│   ├── useMuverData.ts
│   ├── useContent.ts
│   └── useApi.ts
├── redux/                        # Redux Toolkit setup
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── muverSlice.ts
│   │   └── contentSlice.ts
│   └── store.ts
├── services/                     # API and Supabase clients
│   ├── supabaseClient.ts
│   └── apiClient.ts
├── styles/                       # Tailwind CSS
│   └── globals.css
├── public/                       # Static assets
│   ├── images/
│   └── fonts/
├── locales/                      # i18next translations
│   └── es.json
└── tests/                        # Jest/Cypress tests
    ├── components/
    └── hooks/

Rationale:
- Separation: Mobile and web roots prevent cross-platform conflicts.
- Shared Logic: Hooks, services, and Redux slices are reused across platforms.
- AI-Friendly: Clear folder names (e.g., components/auth) for Cursor context.
- Compact: Reusable components (e.g., NavigationBar) reduce duplication.

## 3. Component Structure

Components are modular, reusable, and TypeScript-based for type safety and AI tool compatibility.

### 3.1 Authentication Components
LoginScreen
- Props: { onLogin: (token: string) => void }
- State: email: string, password: string, error: string, loading: boolean
- Functionality: Form for email/password, buttons for Google/Apple Sign-In, Supabase Auth integration.
- Example (React Native, Generated by Cursor):
```typescript
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { supabase } from '../services/supabaseClient';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError('Credenciales incorrectas');
      return;
    }
    onLogin(data.session.access_token);
  };

  return (
    <View>
      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text>{error}</Text> : null}
      <Button title={loading ? "Cargando..." : "Iniciar Sesión"} onPress={handleLogin} disabled={loading} />
    </View>
  );
};

export default LoginScreen;


RegistrationScreen
Props: { onRegister: (token: string) => void }
State: username: string, email: string, password: string, error: string, loading: boolean
Functionality: Form for username/email/password, Supabase Auth signup, redirects to OnboardingScreen.

OnboardingScreen
Props: { onComplete: () => void }
State: address: string, phone: string, error: string, loading: boolean
Functionality: Form for address/phone, saves to Supabase user_profiles, completes onboarding.

3.2 MUVER Module Components
MuverDashboard
Props: None
State: metrics: { level: string, points: number, sales_personal: number, sales_team: number }, loading: boolean
Functionality: Displays metrics cards, navigation buttons to Shop, Recruit, Events, Network.

ProductPurchase
Props: { isMuver: boolean }
State: loading: boolean
Functionality: For MUVERS, WebView to legacy system; for non-MUVERS, WebView to Shopify (www.muvocbd.com).

Recruiting
Props: None
State: qrCodeUrl: string, loading: boolean, error: string
Functionality: Fetches QR code via /api/v1/muver/qr-code, displays QR image, share button (SMS, WhatsApp).

EventManagement
Props: None
State: events: Event[], selectedEvent: Event | null, form: { title: string, date: string, type: string, location: string, zoom_link: string }, loading: boolean
Functionality: Lists events (filter by type), form to create/edit events, register button.

NetworkAdmin
Props: None
State: hierarchy: { muver_id: string, downline: Downline[] }, metrics: Metrics, loading: boolean
Functionality: Tree visualization (using react-native-tree-view or d3.js for web), displays downline and metrics.

3.3 Editorial Module Components
ArticleList
Props: None
State: articles: Article[], page: number, hasMore: boolean, loading: boolean
Functionality: Fetches articles via /api/v1/content, paginates, filters by type (short/long/pdf).

ArticleDetail
Props: { articleId: string }
State: article: Article | null, loading: boolean, error: string
Functionality: Fetches article via /api/v1/content/{id}, renders text or PDF viewer.

3.4 Shared Components
NavigationBar
Props: { onNavigate: (screen: string) => void }
Functionality: Bottom navigation for Home, Shop, Learn, Events, Dashboard.

Header
Props: { title: string, onBack?: () => void }
Functionality: Displays title, optional back button.

Footer
Props: None
Functionality: MUVO CBD logo, copyright, links to privacy policy.

LoadingIndicator
Props: { visible: boolean }
Functionality: Spinner for API loading states.

ErrorBoundary
Props: { children: ReactNode }
Functionality: Catches render errors, displays fallback UI ("Error, intenta de nuevo").

SupabaseClient (Hook)
Functionality: useApi hook for Supabase client, handles auth and API calls.
Example:
import { supabase } from '../services/supabaseClient';
import { useState, useEffect } from 'react';

export const useApi = (endpoint: string, options: { method: string, body?: any }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      const { data: result, error } = await supabase.from(endpoint).select('*');
      setLoading(false);
      if (error) {
        setError('Error al cargar datos');
        return;
      }
      setData(result);
    };
    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

4. State Management

Redux Toolkit is used for global state management, with async thunks for API calls and caching.

4.1 Setup
Store
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import muverReducer from './slices/muverSlice';
import contentReducer from './slices/contentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    muver: muverReducer,
    content: contentReducer,
  },
});

4.2 Slices
Auth Slice
State: { user: User | null, token: string | null, loading: boolean, error: string }
Actions: login, register, logout, updateProfile
Example:
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabaseClient';

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error('Credenciales incorrectas');
  return { user: data.user, token: data.session.access_token };
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, loading: false, error: '' },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

Muver Slice
State: { metrics: Metrics, hierarchy: Hierarchy, events: Event[], loading: boolean, error: string }
Actions: fetchMetrics, fetchHierarchy, fetchEvents, createEvent, registerEvent

Content Slice
State: { articles: Article[], selectedArticle: Article | null, page: number, hasMore: boolean, loading: boolean, error: string }
Actions: fetchArticles, fetchArticleById

4.3 Data Fetching
Use useApi hook for Supabase queries.
Cache API responses in Redux (TTL: 5 minutes) to reduce server load.
Handle errors with ErrorBoundary, display loading with LoadingIndicator.

5. UI/UX Guidelines

5.1 Branding
Colors: Primary (Green: #2E7D32), Secondary (White: #FFFFFF), Accent (Light Green: #A5D6A7).
Typography: Montserrat (Regular, Medium, Bold) for headings, Open Sans for body text.
Logo: MUVO CBD logo (from www.muvocbd.com) in Header/Footer.

5.2 Layout
Grid System: 8px base unit for spacing, padding, margins.
Responsive: Mobile-first (320px base width), breakpoints at 768px (tablet), 1024px (desktop).
Consistency: Uniform padding (16px), border-radius (8px) for cards/buttons.

5.3 Animations
Transitions: Fade-in for screens (300ms), slide for navigation (200ms).
Avoid: Excessive animations (e.g., no looping effects).
Library: react-native-reanimated for mobile, framer-motion for web.

5.4 Accessibility
WCAG 2.1 Level AA:
Contrast: Minimum 4.5:1 for text (e.g., black text on white background).
Labels: aria-label for buttons (e.g., "Iniciar Sesión"), alt text for images.
Keyboard: Tab navigation for forms, screens.
Test: Use Axe DevTools for mobile/web, VoiceOver (iOS), TalkBack (Android).
Spanish: All text, errors, and labels in Spanish (e.g., "Correo inválido").

5.5 Platform Consistency
iOS: Human Interface Guidelines (e.g., SF Symbols, bottom tabs).
Android: Material Design (e.g., FAB for event creation, ripple effects).
Web: Mobile-first responsive grid, wider layouts for desktop.

6. Page Layouts

6.1 Login/Registration Screens
Layout: Centered form (email, password), social login buttons (Google, Apple), error message below form.
Navigation: On success, redirect to OnboardingScreen (registration) or MuverDashboard (login).
Error: "Credenciales incorrectas" (red text, centered).
Loading: LoadingIndicator overlay.

6.2 MUVER Dashboard
Layout: Header (title: "Tablero"), cards for metrics (level, points, sales), navigation buttons (Shop, Recruit, Events, Network), Footer.
Navigation: Buttons navigate to respective screens.
Error: "Error al cargar datos" with retry button.
Loading: Skeleton loader for cards.

6.3 Product Purchase Screen
Layout: Header (title: "Tienda"), WebView for legacy system (MUVERS) or Shopify (non-MUVERS), back button.
Navigation: Back to Dashboard.
Error: "Error al cargar la tienda" with retry.
Loading: Full-screen LoadingIndicator.

6.4 Recruiting Screen
Layout: Header (title: "Reclutar"), centered QR code image, share button (SMS, WhatsApp), instructions ("Escanea para unirte"), Footer.
Navigation: Back to Dashboard.
Error: "Error al cargar QR" with retry.
Loading: LoadingIndicator over QR code.

6.5 Event Management Screen
Layout: Header (title: "Eventos"), event list (cards: title, date, type), filter (live/online), FAB to create event, form modal (title, date, type, location, Zoom link), Footer.
Navigation: Tap event to view details/register, back to Dashboard.
Error: "Error al cargar eventos" with retry.
Loading: Skeleton loader for event list.

6.6 Network Admin Screen
Layout: Header (title: "Red"), tree visualization (downline), metrics cards (sales, points), Footer.
Navigation: Back to Dashboard.
Error: "Error al cargar datos de red" with retry.
Loading: Skeleton loader for tree and cards.

6.7 Article List Screen
Layout: Header (title: "Aprender"), article list (cards: thumbnail, title, type), filter (short/long/pdf), infinite scroll, Footer.
Navigation: Tap article to ArticleDetail, back to Home.
Error: "Error al cargar artículos" with retry.
Loading: LoadingIndicator at list bottom.

6.8 Article Detail Screen
Layout: Header (title: article.title), content (text or PDF viewer), back button, Footer.
Navigation: Back to ArticleList.
Error: "Error al cargar artículo" with retry.
Loading: Full-screen LoadingIndicator.

7. Performance Optimization

Lazy Loading: Load ArticleList items on scroll (react-native-flatlist, next.js dynamic imports).
Image Optimization: Compress images (react-native-fast-image, next/image), lazy-load thumbnails.
API Caching: Cache Supabase responses in Redux (TTL: 5 minutes).
Code Splitting: Split React Native bundles, use Next.js dynamic imports for web.
Targets: Screen load <2s, re-renders <50ms, 60 FPS animations.

8. AI-Assisted Development

Tool: Cursor (latest stable)
Use Cases:
Generate components (e.g., LoginScreen.tsx with form validation).
Create hooks (e.g., useApi.ts for Supabase queries).
Write tests (Jest for components, Detox/Cypress for E2E).
Auto-document components with JSDoc.
Workflow:
1. Define screen in Figma.
2. Use Cursor to generate component, refine styles and logic.
3. Commit to Git with comments (e.g., // Adds LoginScreen with validation).
Supplementary: GitHub Copilot for real-time suggestions in VS Code.
Example Prompt for Cursor:
Generate a React Native LoginScreen component with email/password form, Supabase Auth integration, error handling, and Spanish error messages.

9. Testing

Unit Tests: Jest for components/hooks (80% coverage).
Example: Test LoginScreen form submission, error states.
E2E Tests: Detox (mobile, post-MVP), Cypress (web).
Example: Test login flow, navigation to Dashboard.
Accessibility Tests: Axe DevTools for WCAG compliance.
Manual Tests: VoiceOver (iOS), TalkBack (Android) for screen reader support.

10. Appendix

10.1 Glossary
MUVER: Member of MUVO CBD’s network marketing program.
Virtual Office: Legacy e-commerce/network platform.
Supabase: Backend service for auth, database, storage.
LFPDPPP: Mexican data privacy law.

10.2 Assumptions
Supabase APIs are available and performant.
Legacy system and Shopify store are accessible via WebView.
MUVO CBD provides branding assets post-approval.

10.3 References
React Native: reactnative.dev
Next.js: nextjs.org
Supabase: supabase.com/docs
MUVO CBD: www.muvocbd.com