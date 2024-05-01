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
      className="bg-dark2 w-[95vw] h-[72] flex-row items-center justify-start rounded-2xl px-3"
      onPress={() => console.log('Press ', contact.name)}>
      <Image
        source={require('../../assets/images/profilePictureNoBG.svg')}
        className="w-12 h-12 bg-dark1 rounded-full mr-3"
      />
      <View className="flex flex-col gap-2">
        <Text className="text-white font-semibold" style={{ fontSize: 18 }}>
          {contact.name}
        </Text>
        {contact?.tags.length > 0 && (
          <View className="flex flex-row">
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
              <View className="w-6 h-6 items-center justify-center border border-amber rounded-full ml-3">
                <Text className="text-white">+{contact.tags.length - 3}</Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
    </Pressable>
  );
}
