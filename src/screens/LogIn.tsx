import { View, Text } from 'react-native';

import { LogInProps } from '../types/AuthStackTypes';

export default function LogIn({ navigation }: LogInProps) {
  return (
    <>
      <View className="flex-1 items-center justify-center">
        <Text>Log In</Text>
      </View>
    </>
  );
}
