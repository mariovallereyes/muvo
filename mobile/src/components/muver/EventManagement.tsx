import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Placeholder data for events
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Introducción a CBD',
    date: '2025-05-15T18:00:00',
    type: 'online',
    location: '',
    zoom_link: 'https://zoom.us/j/123456789',
  },
  {
    id: '2',
    title: 'Taller de Ventas',
    date: '2025-05-20T10:00:00',
    type: 'live',
    location: 'Ciudad de México, Centro',
    zoom_link: '',
  },
  {
    id: '3',
    title: 'Beneficios del CBD',
    date: '2025-05-25T19:00:00',
    type: 'online',
    location: '',
    zoom_link: 'https://zoom.us/j/987654321',
  },
];

const EventManagement: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderEventItem = ({ item }: { item: typeof MOCK_EVENTS[0] }) => (
    <TouchableOpacity style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={[
          styles.eventTypeBadge, 
          item.type === 'online' ? styles.onlineBadge : styles.liveBadge
        ]}>
          <Text style={styles.eventTypeText}>
            {item.type === 'online' ? 'En línea' : 'Presencial'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.eventDate}>{formatDate(item.date)}</Text>
      
      {item.type === 'live' && item.location && (
        <Text style={styles.eventLocation}>Ubicación: {item.location}</Text>
      )}
      
      {item.type === 'online' && item.zoom_link && (
        <Text style={styles.eventZoomLink}>Enlace: {item.zoom_link}</Text>
      )}
      
      <View style={styles.eventActions}>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Registrarse</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Compartir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Eventos</Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Crear Evento</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={MOCK_EVENTS}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.eventsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay eventos disponibles</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  eventsList: {
    padding: 16,
  },
  eventCard: {
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
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  eventTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  onlineBadge: {
    backgroundColor: '#e0f2fe',
  },
  liveBadge: {
    backgroundColor: '#fef3c7',
  },
  eventTypeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  eventDate: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  eventZoomLink: {
    fontSize: 14,
    color: '#4f46e5',
    marginBottom: 8,
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  registerButton: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  shareButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  shareButtonText: {
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

export default EventManagement;
