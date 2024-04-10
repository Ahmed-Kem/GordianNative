import { Image } from 'expo-image';
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { LogInProps } from '../types/AuthStackTypes';

export default function LogIn({ navigation }: LogInProps) {
  const [pswdShown, setPswdShown] = useState(false);

  return (
    <View className="flex-1 items-center justify-center bg-dark1 text-white">
      <View className="w-[90vw] h-[89vh] bg-dark2 rounded-lg flex items-center">
        <Text className="text-white font-semibold font-['Be Vietnam Pro'] text-lg mt-10">
          Se connecter à Gordian
        </Text>
        <TextInput
          placeholderTextColor="lightgrey"
          className="text-white bg-dark1 placeholder:text-lightgrey w-[280] h-[40] mt-16  px-4 rounded-md border border-lightgrey focus:border-1 focus:border-white blur:border-lightgrey blur:border"
          placeholder="exemple@email.com"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
        />
        <View className="flex flex-row items-center justify-center left-3">
          <TextInput
            placeholderTextColor="lightgrey"
            className="text-white bg-dark1 placeholder:text-lightgrey w-[280] h-[40] mt-4 px-4 rounded-md border border-lightgrey focus:border-1 focus:border-white blur:border-lightgrey blur:border"
            placeholder="••••••••"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={pswdShown}
          />
          <Pressable onPress={() => setPswdShown(!pswdShown)}>
            <Image
              source={
                pswdShown
                  ? require('../assets/images/hide-password.svg')
                  : require('../assets/images/show-password.svg')
              }
              className="w-6 h-6 top-2 right-8"
            />
          </Pressable>
        </View>

        <Pressable className="w-[280] mt-5 ml-3" onPress={() => console.log('MDP Oublie')}>
          <Text className="text-white text-xs">Mot de passe oublié</Text>
        </Pressable>

        <Pressable className="h-[35] w-[140] mt-14 bg-purple rounded-md flex items-center justify-center">
          <Text className="text-white text-xs">Se connecter</Text>
        </Pressable>

        <View className="h-[1px] w-[280] bg-lightgrey mt-14" />

        <Pressable className="w-[280] h-[40] bg-amber rounded-md flex flex-row items-center justify-evenly mt-8">
          <Image source={require('../assets/images/google-logo.svg')} className="w-7 h-7" />
          <Text className="font-medium text-sm">Continuer avec Google</Text>
        </Pressable>
        <Pressable className="w-[280] h-[40] bg-amber rounded-md flex flex-row items-center justify-evenly mt-5">
          <Image source={require('../assets/images/apple-logo.svg')} className="w-6 h-7" />
          <Text className="font-medium text-sm">Continuer avec Apple</Text>
        </Pressable>
      </View>
    </View>
  );
}
