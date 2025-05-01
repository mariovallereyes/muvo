import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import AppNavigator from './navigation/AppNavigator';
import { store } from './redux/store';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ErrorBoundary>
            <AuthProvider>
              <StatusBar style="auto" />
              <AppNavigator />
            </AuthProvider>
          </ErrorBoundary>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
