import { Image } from 'expo-image';
import { FlatList, Pressable, Text, View } from 'react-native';

import { useContactStore } from '../../stores/contact.store';
import MiniTag from '../Tags/MiniTag';

export default function ContactItem({
  contactId,
  navigation,
  isShowLetter,
}: {
  contactId: string;
  navigation: any;
  isShowLetter?: boolean;
}) {
  const { getContact, setSelectedContactId } = useContactStore((state) => ({
    getContact: state.getContact,
    setSelectedContactId: state.setSelectedContactId,
  }));

  const contact = getContact(contactId);

  return (
    <View className="flex flex-col items-start bg-none w-[95vw]">
      {isShowLetter && (
        <Text className="h-7 text-white font-semibold text-2xl ml-4 mb-4">
          {contact.name.charAt(0).toUpperCase()} .
        </Text>
      )}
      <Pressable
        className="bg-dark2 w-[95vw] h-[72] flex-row items-center justify-start rounded-2xl px-3"
        onPress={() => {
          setSelectedContactId(contactId);

          navigation.push('ContactDetail');
        }}>
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
                <View className="w-6 h-6 items-center justify-center border border-amber rounded-full ml-2">
                  <Text className="text-white">+{contact.tags.length - 3}</Text>
                </View>
              ) : null}
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
}
