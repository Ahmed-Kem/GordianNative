import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from '../components/Header';
import AuthScreen from '../screens/AuthScreen';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import { AuthStackParamList } from '../types/AuthStackTypes';
import { colors } from '../utils/constants/colors';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNav() {
  return (
    <Stack.Navigator
      initialRouteName="AuthScreen"
      screenOptions={{
        headerBackVisible: false,
        statusBarColor: colors.amber,
        headerShadowVisible: false,
      }}>
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
    </Stack.Navigator>
  );
}
