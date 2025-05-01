import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { supabase } from '../utils/supabaseClient';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testSupabaseConnection() {
      try {
        setLoading(true);
        // Simple query to test connection
        const { data, error } = await supabase.from('user_profiles').select('count').limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
          setError(error.message);
        } else {
          console.log('Supabase connection successful:', data);
          setConnected(true);
        }
      } catch (err: any) {
        console.error('Error testing Supabase connection:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    testSupabaseConnection();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MUVO CBD</Text>
        <Text style={styles.subtitle}>Bienestar Natural</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4f46e5" style={styles.loader} />
      ) : connected ? (
        <Text style={styles.connectionSuccess}>Conectado a Supabase</Text>
      ) : (
        <Text style={styles.connectionError}>Error de conexión: {error}</Text>
      )}

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('ArticleList')}
        >
          <Text style={styles.menuItemText}>Artículos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
        >
          <Text style={styles.menuItemText}>Productos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
        >
          <Text style={styles.menuItemText}>Eventos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
        >
          <Text style={styles.menuItemText}>Mi Perfil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4f46e5',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  loader: {
    marginTop: 20,
  },
  connectionSuccess: {
    textAlign: 'center',
    marginTop: 10,
    color: '#10b981',
    fontSize: 14,
  },
  connectionError: {
    textAlign: 'center',
    marginTop: 10,
    color: '#ef4444',
    fontSize: 14,
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4b5563',
  },
});

export default HomeScreen;
