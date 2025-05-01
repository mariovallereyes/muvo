export default {
  name: "Muvo",
  slug: "muvo",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "light",
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#ffffff"
    }
  },
  extra: {
    supabaseUrl: "https://badxprshgmjfzvcerbyu.supabase.co",
    supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZHhwcnNoZ21qZnp2Y2VyYnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MzA5MzQsImV4cCI6MjAzMTEwNjkzNH0.Nh8JZwBDqYlsQnXQao_ySgA-QP9eYCGCJZkFvLbLBXY"
  }
};
