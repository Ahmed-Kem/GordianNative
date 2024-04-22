import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  AuthScreen: undefined;
  LogIn: undefined;
  SignUp: undefined;
};

export type AuthScreenProps = NativeStackScreenProps<AuthStackParamList, 'AuthScreen'>;
export type LogInProps = NativeStackScreenProps<AuthStackParamList, 'LogIn'>;
export type SignUpProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;
