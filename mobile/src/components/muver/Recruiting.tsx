import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const Recruiting: React.FC = () => {
  const { user } = useAuth();
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // This is a placeholder for the actual QR code generation
  // In the real implementation, we would call the API to generate the QR code
  const generateQrCode = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In the real implementation, we would get the QR code URL from the API
      setQrCodeUrl('https://app.muvoapp.com/register?referrer=' + user?.id);
      
    } catch (error) {
      Alert.alert('Error', 'No se pudo generar el código QR');
    } finally {
      setLoading(false);
    }
  };

  const shareReferralLink = async () => {
    if (!qrCodeUrl) {
      await generateQrCode();
    }
    
    try {
      await Share.share({
        message: '¡Únete a MUVO CBD! Regístrate usando mi enlace: ' + qrCodeUrl,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el enlace');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reclutar</Text>
      <Text style={styles.subtitle}>Comparte tu código QR para invitar a nuevos MUVERS</Text>
      
      <View style={styles.qrContainer}>
        {qrCodeUrl ? (
          <View style={styles.qrPlaceholder}>
            <Text style={styles.qrText}>Código QR generado</Text>
            <Text style={styles.qrUrl}>{qrCodeUrl}</Text>
          </View>
        ) : (
          <View style={styles.qrPlaceholder}>
            <Text style={styles.placeholderText}>
              Genera un código QR para compartir
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.generateButton}
          onPress={generateQrCode}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Generando...' : 'Generar Código QR'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.shareButton, !qrCodeUrl && styles.disabledButton]}
          onPress={shareReferralLink}
          disabled={!qrCodeUrl}
        >
          <Text style={styles.buttonText}>Compartir Enlace</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>¿Cómo funciona?</Text>
        <Text style={styles.infoText}>
          1. Genera tu código QR único
        </Text>
        <Text style={styles.infoText}>
          2. Compártelo con amigos y familiares
        </Text>
        <Text style={styles.infoText}>
          3. Cuando se registren usando tu código, se unirán a tu red
        </Text>
        <Text style={styles.infoText}>
          4. Gana puntos por cada venta que realicen
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
  qrContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
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
  qrText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  qrUrl: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  generateButton: {
    flex: 1,
    backgroundColor: '#4f46e5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default Recruiting;
