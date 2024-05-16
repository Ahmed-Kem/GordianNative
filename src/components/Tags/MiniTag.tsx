import { Text, View } from 'react-native';

import { useTagStore } from '../../stores/tag.store';

export default function MiniTag({ tagId }: Tag['id']) {
  const { getTag } = useTagStore((state) => ({
    getTag: state.getTag,
  }));
  const tag: Tag = getTag(tagId);

  if (!tag) return null;
  return (
    <View
      style={{ borderColor: tag.color }}
      className="bg-opacity-0 border px-3 h-6 rounded-full flex justify-center">
      <Text className="text-white">{tag.name}</Text>
    </View>
  );
}
