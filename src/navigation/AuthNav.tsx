import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from '../components/Header';
import AuthScreen from '../screens/AuthScreen';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import { AuthStackParamList } from '../types/AuthStackTypes';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNav() {
  return (
    <Stack.Navigator
      initialRouteName="AuthScreen"
      screenOptions={{
        headerBackVisible: false,
        statusBarColor: '#fffbeb',
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
          headerTitle: (props) => <Header />,
          headerStyle: { backgroundColor: '#262626' },
          headerTintColor: '#fff',
          statusBarColor: '#262626',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: (props) => <Header />,
          headerStyle: { backgroundColor: '#262626' },
          headerTintColor: '#fff',
          statusBarColor: '#262626',
        }}
      />
    </Stack.Navigator>
  );
}
