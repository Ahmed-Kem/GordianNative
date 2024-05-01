import { Image } from 'expo-image';
import { FlatList, Pressable, Text, View } from 'react-native';

import { useTagStore } from '../../stores/tag.store';

export default function TagItem({ tagId }: Tag['id']) {
  const { getTag } = useTagStore((state) => ({
    getTag: state.getTag,
  }));

  const tag = getTag(tagId);

  return (
    <Pressable
      className="bg-dark2 w-[95vw] h-[72] flex-row items-center justify-start rounded-2xl px-3"
      onPress={() => console.log('Press', tag.name)}>
      {tag?.photoUrl === '' || !tag?.photoUrl ? (
        <View className="w-12 h-12 bg-none rounded-full mr-3" />
      ) : (
        <Image
          source={require('../../assets/images/profilePictureNoBG.svg')}
          className="w-12 h-12 bg-dark1 rounded-full mr-3"
        />
      )}
      <Text
        className="text-white font-semibold px-4 py-1 rounded-full border bg-none"
        style={{
          borderColor: tag.color,
          fontSize: 18,
        }}>
        {tag.name}
      </Text>
      <View className="w-6 h-6 items-center justify-center border border-amber rounded-full ml-3 absolute right-8">
        <Text className="text-white text-md">{tag?.contacts.length}</Text>
      </View>
    </Pressable>
  );
}
