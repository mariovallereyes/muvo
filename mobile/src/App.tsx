import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, Platform, LogBox } from 'react-native';

// Import screens
import HomeScreen from './screens/HomeScreen';
import ArticleListScreen from './screens/ArticleListScreen';
import ArticleDetailScreen from './screens/ArticleDetailScreen';

// Import shared components
import Footer from './components/shared/Footer';
import ErrorBoundary from './components/shared/ErrorBoundary';

// Import error handler
import { setupGlobalErrorHandlers } from './utils/errorHandler';

// Set up global error handlers
setupGlobalErrorHandlers();

// Disable yellow warnings to clean up logs
LogBox.ignoreAllLogs();

// Define the root stack parameter list
export type RootStackParamList = {
  Home: undefined;
  ArticleList: undefined;
  ArticleDetail: { articleId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  // Add logging to track initialization
  useEffect(() => {
    console.log('App.tsx - Component mounted');
    console.log('Platform:', Platform.OS);
    console.log('Platform Version:', Platform.Version);

    // Set up global error handler
    if (global.ErrorUtils) {
      const originalGlobalHandler = global.ErrorUtils.getGlobalHandler();
      global.ErrorUtils.setGlobalHandler((error, isFatal) => {
        console.log('Global error caught:', error.message);
        console.log('Stack trace:', error.stack);
        console.log('Is fatal:', isFatal);
        originalGlobalHandler(error, isFatal);
      });
    }

    return () => {
      console.log('App.tsx - Component unmounted');
    };
  }, []);

  // Only use web-specific features on web platform
  const isWeb = Platform.OS === 'web';
  console.log('App.tsx - isWeb:', isWeb);

  // Wrap everything in an ErrorBoundary
  return (
    <ErrorBoundary>
      {!isWeb ? (
        // iOS/Android layout
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#4f46e5',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'MUVO CBD' }}
              />
              <Stack.Screen
                name="ArticleList"
                component={ArticleListScreen}
                options={{ title: 'Artículos' }}
              />
              <Stack.Screen
                name="ArticleDetail"
                component={ArticleDetailScreen}
                options={{ title: 'Detalle' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      ) : (
        // Web-specific layout with footer
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <View style={{ flex: 1 }}>
                <Stack.Navigator
                  initialRouteName="Home"
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: '#4f46e5',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                >
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'MUVO CBD' }}
                  />
                  <Stack.Screen
                    name="ArticleList"
                    component={ArticleListScreen}
                    options={{ title: 'Artículos' }}
                  />
                  <Stack.Screen
                    name="ArticleDetail"
                    component={ArticleDetailScreen}
                    options={{ title: 'Detalle' }}
                  />
                </Stack.Navigator>
              </View>
              <Footer />
            </View>
          </NavigationContainer>
        </SafeAreaProvider>
      )}
    </ErrorBoundary>
  );
}
