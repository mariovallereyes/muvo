import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { supabase } from './utils/supabaseClient';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Simple test to check if Supabase connection works
    const checkConnection = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('user_profiles').select('count').limit(1);

        if (error) {
          console.error('Supabase connection error:', error);
        } else {
          console.log('Supabase connection successful');
          setInitialized(true);
        }
      } catch (error) {
        console.error('Error checking Supabase connection:', error);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {loading ? (
          <ActivityIndicator size="large" color="#4f46e5" />
        ) : (
          <>
            <Text style={styles.title}>MUVO App</Text>
            <Text style={styles.subtitle}>
              {initialized
                ? 'Connected to Supabase successfully!'
                : 'Failed to connect to Supabase'}
            </Text>
          </>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
  },
});
