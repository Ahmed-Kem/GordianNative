import { Image } from 'expo-image';
import { FlatList, Pressable, Text, View } from 'react-native';
export default function AddBar({ setTrigger }) {
  return (
    <View className="flex flex-row items-center justify-center gap-y-6 gap-x-2 mt-0">
      <View className="w-[290] h-[0.5] bg-lightgrey mt-6" />
      <Pressable onPress={() => setTrigger(true)}>
        <Image source={require('../assets/images/add.svg')} className="w-6 h-6" />
      </Pressable>
    </View>
  );
}
