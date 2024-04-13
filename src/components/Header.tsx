import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
export default function Header() {
  const navigation = useNavigation();

  return (
    <View className="w-80 h-10 bg-dark2 rounded-lg flex flex-row items-center justify-between ml-1 pl-3 pr-1">
      <Pressable className="w-8" onPress={() => navigation.goBack()}>
        <Image source={require('../assets/images/backArrow.svg')} className="w-2 h-4" />
      </Pressable>

      <Image source={require('../assets/images/gordianLogo.svg')} className="w-8 h-8 " />

      <Pressable className="w-8" onPress={() => null}>
        <Image source={require('../assets/images/threeDots.svg')} className="w-5 h-1" />
      </Pressable>
    </View>
  );
}
