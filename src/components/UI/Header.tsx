import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { useAuthStore } from '../../stores/auth.store';
import OptionButton from '../Buttons/OptionButton';
export default function Header({ isGoBack = false, optionBtns = [], isSignOut = false }) {
  const navigation = useNavigation();

  const { signOut } = useAuthStore((state) => ({
    signOut: state.signOut,
  }));

  return (
    <View className="w-[95vw] h-10 bg-dark2 rounded-lg flex flex-row items-center justify-between pl-3 pr-1 mt-1 z-10">
      {isGoBack ? (
        <Pressable className="w-12" onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/backArrow.svg')} className="w-2 h-4" />
        </Pressable>
      ) : (
        <View className="w-12" />
      )}

      <Image source={require('../../assets/images/gordianLogo.svg')} className="w-8 h-8 " />

      {optionBtns.length > 0 ? (
        <OptionButton btns={optionBtns} />
      ) : isSignOut ? (
        <Pressable className="w-12 items-center" onPress={signOut}>
          <Image source={require('../../assets/images/disconnect.svg')} className="w-5 h-4" />
        </Pressable>
      ) : (
        <View className="w-12" />
      )}
    </View>
  );
}
