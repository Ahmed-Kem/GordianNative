import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { AuthScreenProps } from '../types/AuthStackTypes';

export default function AuthScreen({ navigation }: AuthScreenProps) {
  return (
    <>
      <View className="flex-1 items-center justify-center bg-amber-50">
        <View className="relative bottom-10 flex-1 items-center justify-center">
          <Image source={require('../assets/images/gordianLogoNoBG.svg')} className="w-24 h-24" />
          <Text className="text-violet-600 text-4xl font-bold font-['Be Vietnam Pro'] mt-5">
            Gordian
          </Text>
        </View>

        <View className="absolute bottom-16">
          <Pressable
            className="flex items-center justify-center w-48 h-11 bg-violet-600 rounded-lg"
            onPress={() => navigation.navigate('LogIn')}>
            <Text className="text-amber-50 text-sm font-semibold font-['Be Vietnam Pro']">
              Se connecter
            </Text>
          </Pressable>

          <Pressable
            className="mt-5 flex items-center justify-center w-48 h-11 rounded-lg border-2 border-violet-600"
            onPress={() => navigation.navigate('SignUp')}>
            <Text className="text-violet-600 text-sm font-semibold font-['Be Vietnam Pro']">
              Créer un compte
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
