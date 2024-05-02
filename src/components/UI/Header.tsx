import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { useAuthStore } from '../../stores/auth.store';
export default function Header({ isGoBack = false, isOptions = false, isSignOut = false }) {
  const navigation = useNavigation();

  const { signOut } = useAuthStore((state) => ({
    signOut: state.signOut,
  }));

  return (
    <View className="w-[95%] h-10 right-[3%] bg-dark2 rounded-lg flex flex-row items-center justify-between ml-1 pl-3 pr-1">
      {isGoBack ? (
        <Pressable className="w-8" onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/backArrow.svg')} className="w-2 h-4" />
        </Pressable>
      ) : (
        <View className="w-8" />
      )}

      <Image source={require('../../assets/images/gordianLogo.svg')} className="w-8 h-8 " />

      {isOptions ? (
        <Pressable className="w-8" onPress={() => null}>
          <Image source={require('../../assets/images/threeDots.svg')} className="w-5 h-1" />
        </Pressable>
      ) : isSignOut ? (
        <Pressable className="w-8" onPress={signOut}>
          <Image source={require('../../assets/images/disconnect.svg')} className="w-5 h-4" />
        </Pressable>
      ) : (
        <View className="w-8" />
      )}
    </View>
  );
}
