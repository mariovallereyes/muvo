import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Platform,
  useWindowDimensions
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
  // Only use these features on web to avoid iOS issues
  const isWeb = Platform.OS === 'web';
  const width = isWeb ? useWindowDimensions().width : 0;

  // Determine if we should use grid layout based on screen width and platform
  // Default to false for non-web platforms to ensure compatibility
  const useGridLayout = isWeb ? (width > 768) : false;

  useEffect(() => {
    console.log('HomeScreen - Running useEffect');

    async function testSupabaseConnection() {
      console.log('HomeScreen - Testing Supabase connection');
      try {
        setLoading(true);

        // Add a timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Connection timeout')), 5000)
        );

        // Simple query to test connection
        const connectionPromise = supabase.from('user_profiles').select('count').limit(1);

        // Race between the query and the timeout
        const result = await Promise.race([connectionPromise, timeoutPromise]) as any;
        const { data, error } = result || { data: null, error: 'Unknown error' };

        if (error) {
          console.error('Supabase connection error:', error);
          setError(typeof error === 'string' ? error : error.message || 'Unknown error');
        } else {
          console.log('Supabase connection successful:', data);
          setConnected(true);
        }
      } catch (err: any) {
        console.error('Error testing Supabase connection:', err);
        setError(err?.message || 'Unknown error');
        // Continue with the app even if Supabase fails
        setConnected(false);
      } finally {
        setLoading(false);
      }
    }

    // Wrap in try-catch to prevent any uncaught errors
    try {
      testSupabaseConnection();
    } catch (err: any) {
      console.error('Uncaught error in useEffect:', err);
      setLoading(false);
      setError(err?.message || 'Uncaught error');
    }
  }, []);

  // Module data for rendering cards
  const modules = [
    {
      id: 'articles',
      title: 'Contenido Educativo',
      description: 'Aprende sobre los beneficios del CBD, salud y bienestar con nuestros artículos y recursos.',
      action: () => navigation.navigate('ArticleList'),
      icon: '📚'
    },
    {
      id: 'products',
      title: 'Tienda',
      description: 'Descubre y compra productos de CBD de alta calidad en nuestra tienda en línea.',
      action: () => console.log('Navigate to Products'),
      icon: '🛒'
    },
    {
      id: 'events',
      title: 'Eventos',
      description: 'Participa en eventos exclusivos para MUVERS y aprende más sobre nuestros productos.',
      action: () => console.log('Navigate to Events'),
      icon: '📅'
    },
    {
      id: 'profile',
      title: 'Mi Perfil',
      description: 'Gestiona tu perfil, revisa tus métricas y administra tu red de MUVERS.',
      action: () => console.log('Navigate to Profile'),
      icon: '👤'
    }
  ];

  const renderModuleCard = (module: typeof modules[0]) => (
    <TouchableOpacity
      key={module.id}
      style={[
        styles.moduleCard,
        useGridLayout && styles.gridCard
      ]}
      onPress={module.action}
    >
      <Text style={styles.moduleIcon}>{module.icon}</Text>
      <Text style={styles.moduleTitle}>{module.title}</Text>
      <Text style={styles.moduleDescription}>{module.description}</Text>
      <View style={styles.moduleAction}>
        <Text style={styles.moduleActionText}>Explorar →</Text>
      </View>
    </TouchableOpacity>
  );

  // Use different layouts for web and native to ensure compatibility
  if (isWeb) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>MUVO CBD</Text>
          <Text style={styles.subtitle}>Bienestar Natural</Text>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Bienvenido a Muvo</Text>
          <Text style={styles.welcomeText}>
            La aplicación oficial de MUVO CBD para e-commerce y marketing en red
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4f46e5" style={styles.loader} />
        ) : connected ? (
          <Text style={styles.connectionSuccess}>Conectado a Supabase</Text>
        ) : (
          <Text style={styles.connectionError}>Error de conexión: {error}</Text>
        )}

        <View style={[
          styles.modulesContainer,
          useGridLayout && styles.modulesGrid
        ]}>
          {modules.map(renderModuleCard)}
        </View>
      </ScrollView>
    );
  }

  // Simpler layout for iOS/Android to avoid potential issues
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
        {modules.map((module) => (
          <TouchableOpacity
            key={module.id}
            style={styles.menuItem}
            onPress={module.action}
          >
            <Text style={styles.menuItemText}>{module.title}</Text>
          </TouchableOpacity>
        ))}
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
  welcomeSection: {
    padding: 24,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#166534', // Green-800
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#4b5563', // Gray-600
    textAlign: 'center',
    marginBottom: 16,
  },
  loader: {
    marginTop: 20,
  },
  connectionSuccess: {
    textAlign: 'center',
    marginTop: 10,
    color: '#10b981',
    fontSize: 14,
    marginBottom: 16,
  },
  connectionError: {
    textAlign: 'center',
    marginTop: 10,
    color: '#ef4444',
    fontSize: 14,
    marginBottom: 16,
  },
  modulesContainer: {
    padding: 16,
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moduleCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: '100%',
  },
  gridCard: {
    width: '48%', // Almost half width with some spacing
    marginBottom: 20,
  },
  moduleIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#166534', // Green-800
    marginBottom: 8,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#4b5563', // Gray-600
    marginBottom: 16,
    lineHeight: 20,
  },
  moduleAction: {
    marginTop: 'auto',
  },
  moduleActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#166534', // Green-800
  },
  // Keep the old styles for backward compatibility
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
