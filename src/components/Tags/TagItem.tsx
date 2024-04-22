import { Image } from 'expo-image';
import { FlatList, Pressable, Text, View } from 'react-native';

import { useTagStore } from '../../stores/tag.store';

export default function TagItem({ tagId }: Tag['id']) {
  const { getTag } = useTagStore((state) => ({
    getTag: state.getTag,
  }));

  const tag = getTag(tagId);

  return (
    <View>
      <Text className="text-white">{tag.name}</Text>
    </View>
  );
}
