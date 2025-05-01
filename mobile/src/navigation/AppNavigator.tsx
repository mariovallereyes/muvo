import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { checkAuth } from '../redux/slices/authSlice';

// Import screens
import LoginScreen from '../components/auth/LoginScreen';
import RegistrationScreen from '../components/auth/RegistrationScreen';
import OnboardingScreen from '../components/auth/OnboardingScreen';
import MuverDashboard from '../components/muver/MuverDashboard';
import ProductPurchase from '../components/muver/ProductPurchase';
import Recruiting from '../components/muver/Recruiting';
import EventManagement from '../components/muver/EventManagement';
import NetworkAdmin from '../components/muver/NetworkAdmin';
import ArticleList from '../components/editorial/ArticleList';
import ArticleDetail from '../components/editorial/ArticleDetail';
import LoadingIndicator from '../components/shared/LoadingIndicator';

// Define navigation params
export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  Onboarding: undefined;
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
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check if user is already authenticated
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return <LoadingIndicator visible={true} />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2E7D32', // Primary green color
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {user ? (
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
            options={{ title: 'Iniciar Sesión' }}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ title: 'Registrarse' }}
          />
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ title: 'Completar Perfil' }}
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
