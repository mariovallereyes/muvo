import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import ArticleDetail from '../components/editorial/ArticleDetail';

type ArticleDetailScreenRouteProp = RouteProp<RootStackParamList, 'ArticleDetail'>;

const ArticleDetailScreen: React.FC = () => {
  const route = useRoute<ArticleDetailScreenRouteProp>();
  
  return (
    <View style={styles.container}>
      <ArticleDetail />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ArticleDetailScreen;
