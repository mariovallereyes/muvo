# Muvo App

Muvo is a mobile and web application for MUVO CBD, a Mexican CBD e-commerce and network marketing brand, serving both MUVERS (network marketing members) and non-MUVERS (casual users).

## Project Overview

The Muvo app aims to:
- Streamline MUVERS' business activities through a dedicated network marketing module
- Provide educational content about CBD benefits, health, and wellness
- Integrate with MUVO CBD's Shopify store (www.muvocbd.com)

## Technology Stack

- **Mobile**: React Native for iOS and Android
- **Web**: Next.js
- **Backend**: Supabase (Auth, Database, Storage)
- **API**: Express.js for custom endpoints
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS (web), React Native styling (mobile)
- **Testing**: Jest, Cypress (web), Detox (mobile)

## Project Structure

```
muvo/
├── 00_PRD/                      # Project documentation and requirements
├── mobile/                      # React Native app (iOS and Android)
│   ├── src/
│   │   ├── components/          # UI components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── navigation/          # React Navigation setup
│   │   ├── redux/               # Redux Toolkit state management
│   │   ├── services/            # API and Supabase clients
│   │   ├── assets/              # Images, fonts, etc.
│   │   ├── locales/             # i18next translations
│   │   └── tests/               # Jest tests
├── web/                         # Next.js web app
│   ├── pages/                   # Next.js pages
│   ├── components/              # React components
│   ├── hooks/                   # Custom React hooks
│   ├── redux/                   # Redux Toolkit state management
│   ├── services/                # API and Supabase clients
│   ├── styles/                  # Tailwind CSS
│   ├── public/                  # Static assets
│   ├── locales/                 # i18next translations
│   └── tests/                   # Jest/Cypress tests
├── shared/                      # Shared utilities (cross-platform)
│   ├── api/                     # API client
│   ├── supabase/                # Supabase SDK configuration
│   ├── models/                  # Shared data models
│   └── utils/                   # Helpers (e.g., QR code generator)
├── docs/                        # Documentation
└── .github/                     # GitHub workflows
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Supabase account
- React Native development environment (for mobile)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/muvo.git
cd muvo
```

2. Install dependencies for web app
```bash
cd web
npm install
```

3. Install dependencies for mobile app
```bash
cd ../mobile
npm install
```

4. Set up environment variables
   - Create `.env.local` files in both `web/` and `mobile/` directories
   - Add Supabase credentials and other environment variables

### Running the Apps

#### Web App
```bash
cd web
npm run dev
```

#### Mobile App
```bash
cd mobile
npm start
```

## Development Workflow

1. Create a feature branch from `develop`
2. Implement the feature
3. Write tests
4. Submit a pull request to `develop`
5. After review, merge to `develop`
6. Periodically merge `develop` to `main` for releases

## Testing

- Run web tests: `cd web && npm test`
- Run mobile tests: `cd mobile && npm test`

## Deployment

- Web: Deployed to Vercel
- Mobile: Built for App Store (iOS) and Google Play Store (Android)

## License

[Specify license information]

## Contact

[Contact information for the project team]
