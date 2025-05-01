import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Placeholder data for network
const MOCK_NETWORK = [
  {
    id: '1',
    name: 'Ana García',
    level: 'Plata',
    join_date: '2025-01-15T10:00:00',
    sales: 2500,
    downline: 5,
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    level: 'Bronce',
    join_date: '2025-02-20T14:30:00',
    sales: 1200,
    downline: 2,
  },
  {
    id: '3',
    name: 'María López',
    level: 'Bronce',
    join_date: '2025-03-10T09:15:00',
    sales: 800,
    downline: 0,
  },
  {
    id: '4',
    name: 'Juan Martínez',
    level: 'Oro',
    join_date: '2025-01-05T16:45:00',
    sales: 6000,
    downline: 12,
  },
  {
    id: '5',
    name: 'Laura Sánchez',
    level: 'Plata',
    join_date: '2025-02-28T11:20:00',
    sales: 3500,
    downline: 7,
  },
];

const NetworkAdmin: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bronce':
        return '#b45309';
      case 'Plata':
        return '#6b7280';
      case 'Oro':
        return '#d97706';
      case 'Diamante':
        return '#2563eb';
      default:
        return '#6b7280';
    }
  };

  const filteredNetwork = MOCK_NETWORK.filter(member => {
    if (selectedFilter === 'all') return true;
    return member.level.toLowerCase() === selectedFilter.toLowerCase();
  });

  const renderMemberItem = ({ item }: { item: typeof MOCK_NETWORK[0] }) => (
    <TouchableOpacity style={styles.memberCard}>
      <View style={styles.memberHeader}>
        <Text style={styles.memberName}>{item.name}</Text>
        <View style={[
          styles.levelBadge, 
          { backgroundColor: `${getLevelColor(item.level)}20` }
        ]}>
          <Text style={[styles.levelText, { color: getLevelColor(item.level) }]}>
            {item.level}
          </Text>
        </View>
      </View>
      
      <Text style={styles.joinDate}>Miembro desde: {formatDate(item.join_date)}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>${item.sales}</Text>
          <Text style={styles.statLabel}>Ventas</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.downline}</Text>
          <Text style={styles.statLabel}>Equipo</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Ver Detalles</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Red</Text>
        <Text style={styles.subtitle}>Total: {MOCK_NETWORK.length} miembros</Text>
      </View>
      
      <View style={styles.filtersContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, selectedFilter === 'all' && styles.activeFilter]}
          onPress={() => setSelectedFilter('all')}
        >
          <Text style={[styles.filterText, selectedFilter === 'all' && styles.activeFilterText]}>
            Todos
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, selectedFilter === 'bronce' && styles.activeFilter]}
          onPress={() => setSelectedFilter('bronce')}
        >
          <Text style={[styles.filterText, selectedFilter === 'bronce' && styles.activeFilterText]}>
            Bronce
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, selectedFilter === 'plata' && styles.activeFilter]}
          onPress={() => setSelectedFilter('plata')}
        >
          <Text style={[styles.filterText, selectedFilter === 'plata' && styles.activeFilterText]}>
            Plata
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, selectedFilter === 'oro' && styles.activeFilter]}
          onPress={() => setSelectedFilter('oro')}
        >
          <Text style={[styles.filterText, selectedFilter === 'oro' && styles.activeFilterText]}>
            Oro
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredNetwork}
        renderItem={renderMemberItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.membersList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay miembros en esta categoría</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  filtersContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#f3f4f6',
  },
  activeFilter: {
    backgroundColor: '#4f46e5',
  },
  filterText: {
    fontSize: 14,
    color: '#4b5563',
  },
  activeFilterText: {
    color: '#fff',
  },
  membersList: {
    padding: 16,
  },
  memberCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '500',
  },
  joinDate: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  detailsButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#4b5563',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
  },
});

export default NetworkAdmin;
