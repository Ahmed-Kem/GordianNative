import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { FlatList, Pressable, Text, View } from 'react-native';

import TagItem from '../../components/Tags/TagItem';
import { useTagStore } from '../../stores/tag.store';

export default function TagsScreen({ navigation }: TagsScreenProps) {
  const { tagIds } = useTagStore((state) => ({
    tagIds: state.tagIds,
  }));

  return (
    <View className="bg-dark1 h-full flex items-center pt-4">
      <View className="flex flex-row gap-6">
        <Pressable
          className="w-24 h-8 bg-opacity-0 flex items-center justify-center pb-[2] rounded-2xl border border-purple"
          onPress={() => navigation.navigate('ContactsScreen')}>
          <Text className="text-white">Contact</Text>
        </Pressable>
        <Pressable className="w-24 h-8 bg-amber flex items-center justify-center pb-[2] rounded-2xl">
          <Text className="text-dark1">Tag</Text>
        </Pressable>
      </View>
      <View className="flex flex-row items-center justify-center gap-y-6 gap-x-2 mt-0">
        <View className="w-[290] h-[0.5] bg-lightgrey mt-6" />
        <Pressable onPress={() => console.log('Press')}>
          <Image source={require('../../assets/images/add.svg')} className="w-6 h-6" />
        </Pressable>
      </View>
      <FlatList
        data={tagIds}
        renderItem={({ item }) => <TagItem tagId={item} />}
        keyExtractor={(id) => id}
      />
    </View>
  );
}
