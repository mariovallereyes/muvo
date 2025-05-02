import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

const Footer: React.FC = () => {
  const isWeb = Platform.OS === 'web';
  
  return (
    <View style={styles.footer}>
      <Text style={styles.copyright}>© {new Date().getFullYear()} MUVO CBD. Todos los derechos reservados.</Text>
      
      {isWeb && (
        <View style={styles.links}>
          <TouchableOpacity>
            <Text style={styles.link}>Términos y Condiciones</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Política de Privacidad</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Contacto</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  copyright: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  link: {
    fontSize: 14,
    color: '#4f46e5',
    marginHorizontal: 8,
    marginVertical: 4,
  },
});

export default Footer;
