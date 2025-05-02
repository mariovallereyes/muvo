import { registerRootComponent } from 'expo';
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

// Wrap all potential errors in proper Error objects
const wrapErrors = () => {
  // Override global Promise to ensure all rejections use Error objects
  const originalReject = Promise.reject;
  Promise.reject = (reason) => {
    if (reason instanceof Error) {
      return originalReject(reason);
    }
    return originalReject(new Error(String(reason)));
  };

  // Override global throw for development
  if (__DEV__) {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('Unhandled promise rejection')) {
        originalConsoleError('Detected unhandled promise rejection:', ...args);
      }
      originalConsoleError(...args);
    };
  }
};

// Call the error wrapper immediately
wrapErrors();

// Super minimal app with no dependencies
function MinimalSafeApp() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>MUVO App</Text>
        <Text style={styles.subtitle}>Minimal Safe Version</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

// Register the minimal component
registerRootComponent(MinimalSafeApp);
