import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';

import HomeNav from './HomeNav';
import Header from '../components/Header';
import AuthScreen from '../screens/Auth/AuthScreen';
import LogIn from '../screens/Auth/LogIn';
import SignUp from '../screens/Auth/SignUp';
import { useAuthStore } from '../stores/auth.store';
import { AuthStackParamList } from '../types/AuthStackTypes';
import { colors } from '../utils/constants/colors';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNav() {
  const { isLoggedIn, initAuthStore } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    initAuthStore: state.initAuthStore,
  }));

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = initAuthStore();
    return unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('HomeNav');
    } else {
      navigation.navigate('AuthScreen');
    }
  }, [isLoggedIn]);

  return (
    <AuthStack.Navigator
      initialRouteName="AuthScreen"
      screenOptions={{
        headerTitle: () => <Header isGoBack />,
        headerBackVisible: false,
        statusBarColor: colors.dark1,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.dark1 },
        headerTintColor: colors.white,
      }}>
      {isLoggedIn ? (
        <AuthStack.Screen
          name="HomeNav"
          component={HomeNav}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <AuthStack.Screen
            name="AuthScreen"
            component={AuthScreen}
            options={{
              headerTitle: null,
              headerShown: false,
              statusBarColor: colors.amber,
            }}
          />
          <AuthStack.Screen name="LogIn" component={LogIn} />
          <AuthStack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </AuthStack.Navigator>
  );
}
