import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ArticleListNavigationProp = StackNavigationProp<RootStackParamList, 'ArticleList'>;

// Placeholder data for articles
const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'Beneficios del CBD para el dolor crónico',
    type: 'long',
    summary: 'Descubre cómo el CBD puede ayudar a aliviar el dolor crónico y mejorar tu calidad de vida.',
    image_url: 'https://via.placeholder.com/300x200',
    created_at: '2025-04-15T10:00:00',
  },
  {
    id: '2',
    title: 'Guía rápida: Cómo usar aceite de CBD',
    type: 'short',
    summary: 'Aprende a usar correctamente el aceite de CBD para obtener los mejores resultados.',
    image_url: 'https://via.placeholder.com/300x200',
    created_at: '2025-04-10T14:30:00',
  },
  {
    id: '3',
    title: 'CBD y ansiedad: Lo que debes saber',
    type: 'long',
    summary: 'Estudios recientes sobre el CBD y su efecto en trastornos de ansiedad.',
    image_url: 'https://via.placeholder.com/300x200',
    created_at: '2025-04-05T09:15:00',
  },
  {
    id: '4',
    title: 'Diferencias entre CBD y THC',
    type: 'short',
    summary: 'Conoce las principales diferencias entre estos dos compuestos del cannabis.',
    image_url: 'https://via.placeholder.com/300x200',
    created_at: '2025-03-28T16:45:00',
  },
  {
    id: '5',
    title: 'Manual de productos MUVO CBD',
    type: 'pdf',
    summary: 'Catálogo completo de productos MUVO CBD con descripciones detalladas.',
    image_url: 'https://via.placeholder.com/300x200',
    created_at: '2025-03-20T11:20:00',
  },
];

const ArticleList: React.FC = () => {
  const navigation = useNavigation<ArticleListNavigationProp>();
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'short':
        return 'Artículo Corto';
      case 'long':
        return 'Artículo Largo';
      case 'pdf':
        return 'PDF';
      default:
        return 'Artículo';
    }
  };

  const filteredArticles = MOCK_ARTICLES.filter(article => {
    if (selectedFilter === 'all') return true;
    return article.type === selectedFilter;
  });

  const handleArticlePress = (articleId: string) => {
    navigation.navigate('ArticleDetail', { articleId });
  };

  const renderArticleItem = ({ item }: { item: typeof MOCK_ARTICLES[0] }) => (
    <TouchableOpacity 
      style={styles.articleCard}
      onPress={() => handleArticlePress(item.id)}
    >
      <Image 
        source={{ uri: item.image_url }}
        style={styles.articleImage}
        resizeMode="cover"
      />
      
      <View style={styles.articleContent}>
        <View style={styles.articleHeader}>
          <Text style={styles.articleTitle}>{item.title}</Text>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{getTypeLabel(item.type)}</Text>
          </View>
        </View>
        
        <Text style={styles.articleSummary}>{item.summary}</Text>
        
        <Text style={styles.articleDate}>{formatDate(item.created_at)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
          style={[styles.filterButton, selectedFilter === 'short' && styles.activeFilter]}
          onPress={() => setSelectedFilter('short')}
        >
          <Text style={[styles.filterText, selectedFilter === 'short' && styles.activeFilterText]}>
            Cortos
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, selectedFilter === 'long' && styles.activeFilter]}
          onPress={() => setSelectedFilter('long')}
        >
          <Text style={[styles.filterText, selectedFilter === 'long' && styles.activeFilterText]}>
            Largos
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, selectedFilter === 'pdf' && styles.activeFilter]}
          onPress={() => setSelectedFilter('pdf')}
        >
          <Text style={[styles.filterText, selectedFilter === 'pdf' && styles.activeFilterText]}>
            PDFs
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredArticles}
        renderItem={renderArticleItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.articlesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay artículos en esta categoría</Text>
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
  articlesList: {
    padding: 16,
  },
  articleCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  articleImage: {
    width: '100%',
    height: 150,
  },
  articleContent: {
    padding: 16,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0369a1',
  },
  articleSummary: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 12,
    lineHeight: 20,
  },
  articleDate: {
    fontSize: 12,
    color: '#6b7280',
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

export default ArticleList;
