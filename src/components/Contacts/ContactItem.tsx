import { Image } from 'expo-image';
import { FlatList, Pressable, Text, View } from 'react-native';

import { useContactStore } from '../../stores/contact.store';
import { useTagStore } from '../../stores/tag.store';
import MiniTag from '../Tags/MiniTag';

export default function ContactItem({ contactId }: Contact['id']) {
  const { getContact } = useContactStore((state) => ({
    getContact: state.getContact,
  }));

  const { getTag } = useTagStore((state) => ({
    getTag: state.getTag,
  }));

  const contact = getContact(contactId);

  return (
    <Pressable
      className="bg-dark2 w-[370] h-17 flex justify-center rounded-2xl px-2 py-2"
      onPress={() => console.log('Press ', contact.name)}>
      <View className="flex flex-row items-center">
        <View className="bg-dark1 w-12 h-12 rounded-full mr-3" />
        <View className="flex flex-col gap-2">
          <Text className="text-white font-semibold" style={{ fontSize: 18 }}>
            {contact.name}
          </Text>
          <View className="flex flex-row items-centerm">
            <FlatList
              data={contact.tags.slice(0, 3)}
              renderItem={({ item }) => <MiniTag tagId={item} />}
              keyExtractor={(id) => id}
              contentContainerStyle={{
                gap: 8,
                paddingRight: 10,
              }}
              horizontal
            />
            {contact.tags.length > 3 ? (
              <View className="w-6 h-6 items-center justify-center border border-amber rounded-full">
                <Text className="text-white">+{contact.tags.length - 3}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
