# Muvo App Project Structure

```
muvo/                                # Project root
├── .github/                         # GitHub configuration
│   └── workflows/                   # GitHub Actions workflows
│       └── main.yml                 # CI/CD workflow configuration
├── 00_PRD/                          # Project documentation and requirements
│   ├── 00_instructions              # General rules and guidelines for the project
│   ├── 01_prd.md                    # Product Requirements Document
│   ├── 02_requirements.md           # Detailed project requirements
│   ├── 03_techstack.md              # Technology stack decisions and architecture
│   ├── 04_flow.md                   # System and user flow documentation
│   ├── 05_backend.md                # Backend implementation guide
│   ├── 06_frontend.md               # Frontend implementation guide
│   ├── last_project_structure.md    # This file - documents current project structure
│   └── status.md                    # Project status tracking
├── docs/                            # Project documentation
│   ├── api-spec.md                  # API specification
│   └── setup-guide.md               # Setup guide for developers
├── mobile/                          # React Native mobile app
│   ├── index.js                     # Entry point for the mobile app
│   ├── package.json                 # Mobile app dependencies and scripts
│   ├── .env                         # Environment variables for mobile app
│   └── src/                         # Source code for mobile app
│       ├── App.tsx                  # Main App component
│       ├── assets/                  # Static assets for mobile
│       │   ├── fonts/               # Custom fonts
│       │   └── images/              # Images and icons
│       ├── components/              # React Native components
│       │   ├── auth/                # Authentication components
│       │   ├── editorial/           # Editorial module components
│       │   ├── muver/               # MUVER module components
│       │   └── shared/              # Shared components
│       │       ├── ErrorBoundary.tsx # Error handling component
│       │       └── LoadingIndicator.tsx # Loading spinner component
│       ├── hooks/                   # Custom React hooks
│       ├── locales/                 # i18n translations
│       ├── navigation/              # React Navigation setup
│       │   └── AppNavigator.tsx     # Navigation configuration
│       ├── redux/                   # Redux state management
│       │   ├── slices/              # Redux Toolkit slices
│       │   │   └── authSlice.ts     # Authentication state slice
│       │   └── store.ts             # Redux store configuration
│       ├── services/                # API and service integrations
│       └── tests/                   # Test files
│           ├── components/          # Component tests
│           └── hooks/               # Hook tests
├── shared/                          # Shared code between mobile and web
│   ├── api/                         # API client
│   │   └── apiClient.ts             # Axios API client configuration
│   ├── models/                      # Shared data models
│   │   └── types.ts                 # TypeScript type definitions
│   ├── supabase/                    # Supabase integration
│   │   └── client.ts                # Supabase client configuration
│   └── utils/                       # Shared utilities
│       └── qrCodeGenerator.ts       # QR code generation utility
├── supabase/                        # Supabase configuration and migrations
│   └── migrations/                  # Database migrations
│       ├── 20250501160000_initial_schema.sql      # Initial database schema
│       ├── 20250501160100_row_level_security.sql  # RLS policies
│       ├── 20250501160200_indexes.sql             # Performance indexes
│       └── 20250501160300_storage_buckets.sql     # Storage configuration
├── web/                             # Next.js web app
│   ├── components/                  # React components for web
│   │   ├── auth/                    # Authentication components
│   │   ├── editorial/               # Editorial module components
│   │   ├── muver/                   # MUVER module components
│   │   └── shared/                  # Shared components
│   │       ├── Footer.tsx           # Footer component
│   │       └── Header.tsx           # Header component
│   ├── hooks/                       # Custom React hooks
│   ├── locales/                     # i18n translations
│   ├── package.json                 # Web app dependencies and scripts
│   ├── pages/                       # Next.js pages
│   │   ├── _app.tsx                 # Next.js App component
│   │   ├── index.tsx                # Homepage
│   │   ├── articles/                # Editorial content pages
│   │   └── muver/                   # MUVER module pages
│   ├── public/                      # Static assets for web
│   │   ├── fonts/                   # Custom fonts
│   │   └── images/                  # Images and icons
│   ├── redux/                       # Redux state management
│   │   ├── slices/                  # Redux Toolkit slices
│   │   └── store.ts                 # Redux store configuration
│   ├── services/                    # API and service integrations
│   ├── styles/                      # CSS styles
│   │   └── globals.css              # Global styles with Tailwind
│   ├── .env.local                   # Environment variables for web app
│   ├── postcss.config.js            # PostCSS configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── tests/                       # Test files
│       ├── components/              # Component tests
│       └── hooks/                   # Hook tests
├── .gitignore                       # Git ignore rules
├── package.json                     # Root dependencies and scripts
└── README.md                        # Project overview and setup instructions
```

This structure follows the modular architecture defined in the project documentation, with separate roots for mobile (React Native) and web (Next.js) applications, plus shared utilities. The structure is designed to support the three main modules of the Muvo app:

1. **MUVER Module**: Network marketing features for MUVERS (authentication, product purchases, recruiting, event management, admin)
2. **Editorial Module**: Educational content about CBD benefits, health, and wellness
3. **Shopify Integration**: E-commerce functionality

The project uses:
- **React Native** for mobile (iOS and Android)
- **Next.js** for web
- **Supabase** for backend (authentication, database, storage)
- **Redux Toolkit** for state management
- **TypeScript** for type safety
- **Tailwind CSS** for web styling

Key additions since the last update:
- GitHub workflow configuration in `.github/workflows/main.yml`
- Supabase migrations in `supabase/migrations/` for database schema, security policies, and storage
- Environment files for Supabase configuration
- This structure documentation file

This structure is optimized for a three-person development team using AI-assisted tools like Cursor, targeting an initial user base of 400-500 users with 10x growth potential.
