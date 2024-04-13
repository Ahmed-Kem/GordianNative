import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { AuthScreenProps } from '../../types/AuthStackTypes';

export default function AuthScreen({ navigation }: AuthScreenProps) {
  return (
    <>
      <View className="flex-1 items-center justify-center bg-amber">
        <View className="relative bottom-10 flex-1 items-center justify-center">
          <Image
            source={require('../../assets/images/gordianLogoNoBG.svg')}
            className="w-24 h-24"
          />
          <Text className="text-purple text-4xl font-bold font-['Be Vietnam Pro'] mt-5">
            Gordian
          </Text>
        </View>

        <View className="absolute bottom-16">
          <Pressable
            className="flex items-center justify-center w-48 h-11 bg-purple rounded-lg"
            onPress={() => navigation.navigate('LogIn')}>
            <Text className="text-amber text-sm font-semibold font-['Be Vietnam Pro']">
              Se connecter
            </Text>
          </Pressable>

          <Pressable
            className="mt-5 flex items-center justify-center w-48 h-11 rounded-lg border-2 border-purple"
            onPress={() => navigation.navigate('SignUp')}>
            <Text className="text-purple text-sm font-semibold font-['Be Vietnam Pro']">
              Créer un compte
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
