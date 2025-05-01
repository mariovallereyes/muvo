import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';

// Import screens
import LoginScreen from '../components/auth/LoginScreen';
import RegisterScreen from '../components/auth/RegisterScreen';
import ForgotPasswordScreen from '../components/auth/ForgotPasswordScreen';
import MuverDashboard from '../components/muver/MuverDashboard';
import ProductPurchase from '../components/muver/ProductPurchase';
import Recruiting from '../components/muver/Recruiting';
import EventManagement from '../components/muver/EventManagement';
import NetworkAdmin from '../components/muver/NetworkAdmin';
import ArticleList from '../components/editorial/ArticleList';
import ArticleDetail from '../components/editorial/ArticleDetail';
import LoadingIndicator from '../components/shared/LoadingIndicator';

// Auth Context
import { useAuth } from '../contexts/AuthContext';

// Define navigation params
export type RootStackParamList = {
  Login: undefined;
  Register: { referrer?: string };
  ForgotPassword: undefined;
  MuverDashboard: undefined;
  ProductPurchase: { isMuver: boolean };
  Recruiting: undefined;
  EventManagement: undefined;
  NetworkAdmin: undefined;
  ArticleList: undefined;
  ArticleDetail: { articleId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isAuthenticated, loading, isMuver } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4f46e5', // Primary indigo color
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {isAuthenticated ? (
        // Authenticated user routes
        <>
          <Stack.Screen
            name="MuverDashboard"
            component={MuverDashboard}
            options={{ title: 'Tablero' }}
          />
          <Stack.Screen
            name="ProductPurchase"
            component={ProductPurchase}
            options={{ title: 'Tienda' }}
          />
          <Stack.Screen
            name="Recruiting"
            component={Recruiting}
            options={{ title: 'Reclutar' }}
          />
          <Stack.Screen
            name="EventManagement"
            component={EventManagement}
            options={{ title: 'Eventos' }}
          />
          <Stack.Screen
            name="NetworkAdmin"
            component={NetworkAdmin}
            options={{ title: 'Red' }}
          />
          <Stack.Screen
            name="ArticleList"
            component={ArticleList}
            options={{ title: 'Aprender' }}
          />
          <Stack.Screen
            name="ArticleDetail"
            component={ArticleDetail}
            options={({ route }) => ({ title: 'Artículo' })}
          />
        </>
      ) : (
        // Unauthenticated user routes
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Iniciar Sesión', headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Registrarse', headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ title: 'Recuperar Contraseña', headerShown: false }}
          />
          <Stack.Screen
            name="ArticleList"
            component={ArticleList}
            options={{ title: 'Aprender' }}
          />
          <Stack.Screen
            name="ArticleDetail"
            component={ArticleDetail}
            options={({ route }) => ({ title: 'Artículo' })}
          />
          <Stack.Screen
            name="ProductPurchase"
            component={ProductPurchase}
            options={{ title: 'Tienda' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
