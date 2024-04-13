import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';

import Header from '../components/Header';
import AuthScreen from '../screens/Auth/AuthScreen';
import CongratNewAccount from '../screens/Auth/CongratNewAccount';
import LogIn from '../screens/Auth/LogIn';
import SignUp from '../screens/Auth/SignUp';
import Home from '../screens/Home';
import { useAuthStore } from '../stores/auth.store';
import { AuthStackParamList } from '../types/AuthStackTypes';
import { colors } from '../utils/constants/colors';

const Stack = createNativeStackNavigator<AuthStackParamList>();

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
      navigation.navigate('Home');
      console.log('User is signed in');
    } else {
      navigation.navigate('AuthScreen');
      console.log('User is not signed in');
    }
  }, [isLoggedIn]);

  return (
    <Stack.Navigator
      initialRouteName="AuthScreen"
      screenOptions={{
        headerBackVisible: false,
        statusBarColor: colors.amber,
        headerShadowVisible: false,
      }}>
      {isLoggedIn ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: () => <Header />,
            headerStyle: { backgroundColor: colors.dark1 },
            headerTintColor: colors.white,
            statusBarColor: colors.dark1,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="AuthScreen"
            component={AuthScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{
              headerTitle: () => <Header />,
              headerStyle: { backgroundColor: colors.dark1 },
              headerTintColor: colors.white,
              statusBarColor: colors.dark1,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerTitle: () => <Header />,
              headerStyle: { backgroundColor: colors.dark1 },
              headerTintColor: colors.white,
              statusBarColor: colors.dark1,
            }}
          />
          <Stack.Screen
            name="CongratNewAccount"
            component={CongratNewAccount}
            options={{
              headerTitle: () => <Header />,
              headerStyle: { backgroundColor: colors.dark1 },
              headerTintColor: colors.white,
              statusBarColor: colors.dark1,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
