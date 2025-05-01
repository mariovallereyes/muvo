import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ProductPurchaseRouteProp = RouteProp<RootStackParamList, 'ProductPurchase'>;

const ProductPurchase: React.FC = () => {
  const route = useRoute<ProductPurchaseRouteProp>();
  const { isMuver } = route.params || { isMuver: false };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tienda</Text>
      <Text style={styles.subtitle}>
        {isMuver 
          ? 'Compra productos con tu descuento de MUVER' 
          : 'Explora nuestros productos de CBD'}
      </Text>
      <View style={styles.webViewPlaceholder}>
        <Text style={styles.placeholderText}>
          Aquí se cargará el WebView para {isMuver ? 'el sistema legacy' : 'Shopify'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  webViewPlaceholder: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    padding: 20,
  },
});

export default ProductPurchase;
