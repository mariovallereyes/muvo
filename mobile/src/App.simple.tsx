import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Platform, LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ErrorBoundary from './components/shared/ErrorBoundary';

// Disable yellow box warnings to clean up logs
LogBox.ignoreAllLogs();

// A simplified version of the app without any complex components
export default function App() {
  // Add extensive logging to track initialization
  useEffect(() => {
    console.log('App.simple.tsx - Component mounted');
    console.log('Platform:', Platform.OS);
    console.log('Platform Version:', Platform.Version);

    // Log any unhandled errors
    const errorHandler = (error: Error, isFatal?: boolean) => {
      console.log('Global error caught:', error.message);
      console.log('Stack trace:', error.stack);
      console.log('Is fatal:', isFatal);
    };

    // Set up global error handler
    if (global.ErrorUtils) {
      const originalGlobalHandler = global.ErrorUtils.getGlobalHandler();
      global.ErrorUtils.setGlobalHandler((error, isFatal) => {
        errorHandler(error, isFatal);
        originalGlobalHandler(error, isFatal);
      });
    }

    return () => {
      console.log('App.simple.tsx - Component unmounted');
    };
  }, []);

  console.log('App.simple.tsx - Rendering component');

  // Wrap everything in an ErrorBoundary to catch any rendering errors
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <View style={styles.container}>
          <Text style={styles.title}>MUVO App</Text>
          <Text style={styles.subtitle}>Simplified Version</Text>
          <Text style={styles.debug}>Platform: {Platform.OS}</Text>
          <StatusBar style="auto" />
        </View>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  debug: {
    fontSize: 14,
    color: '#999',
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 10,
  },
  errorDetail: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
