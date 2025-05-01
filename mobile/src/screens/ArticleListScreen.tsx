import React from 'react';
import { View, StyleSheet } from 'react-native';
import ArticleList from '../components/editorial/ArticleList';

const ArticleListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ArticleList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default ArticleListScreen;
