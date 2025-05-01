import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface LoadingIndicatorProps {
  visible: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2E7D32" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1000,
  },
});

export default LoadingIndicator;
