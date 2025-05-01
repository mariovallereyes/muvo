import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { RootStackParamList } from '../../navigation/AppNavigator';

type MuverDashboardNavigationProp = StackNavigationProp<RootStackParamList, 'MuverDashboard'>;

const MuverDashboard: React.FC = () => {
  const navigation = useNavigation<MuverDashboardNavigationProp>();
  const { user, userProfile, muverDetails, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido, {userProfile?.full_name || 'MUVER'}</Text>
        <Text style={styles.subtitle}>Nivel: {muverDetails?.level || 'Bronce'}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{muverDetails?.points || 0}</Text>
          <Text style={styles.statLabel}>Puntos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${muverDetails?.sales_personal || 0}</Text>
          <Text style={styles.statLabel}>Ventas Personales</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${muverDetails?.sales_team || 0}</Text>
          <Text style={styles.statLabel}>Ventas de Equipo</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('ProductPurchase', { isMuver: true })}
        >
          <Text style={styles.menuItemText}>Comprar Productos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Recruiting')}
        >
          <Text style={styles.menuItemText}>Reclutar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('EventManagement')}
        >
          <Text style={styles.menuItemText}>Eventos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('NetworkAdmin')}
        >
          <Text style={styles.menuItemText}>Mi Red</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('ArticleList')}
        >
          <Text style={styles.menuItemText}>Aprender</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    marginTop: -20,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  menuContainer: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  logoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  logoutButtonText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default MuverDashboard;
