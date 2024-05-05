import { Image } from 'expo-image';
import { FlatList, Pressable, Text, View } from 'react-native';

import { useContactStore } from '../../stores/contact.store';
import { useTagStore } from '../../stores/tag.store';
import { colors } from '../../utils/constants/colors';
import MiniTag from '../Tags/MiniTag';

export default function MediumContact({
  contactId,
  tagId,
  isShowLetter,
}: {
  contactId: string;
  tagId: string;
  isShowLetter?: boolean;
}) {
  const { getContact, addTagToContact, deleteTagFromContact, setSelectedContactId } =
    useContactStore((state) => ({
      getContact: state.getContact,
      addTagToContact: state.addTagToContact,
      deleteTagFromContact: state.deleteTagFromContact,
      setSelectedContactId: state.setSelectedContactId,
    }));

  const { getTag, addContactToTag, deleteContactFromTag } = useTagStore((state) => ({
    getTag: state.getTag,
    addContactToTag: state.addContactToTag,
    deleteContactFromTag: state.deleteContactFromTag,
  }));

  const contact = getContact(contactId);
  const tag = getTag(tagId);

  const isContactIncluded = tag.contacts.includes(contactId);

  return (
    <View className="flex flex-col items-start bg-none">
      {isShowLetter && (
        <Text className="h-7 text-white font-semibold text-xl ml-4 mb-4">
          {contact.name.charAt(0).toUpperCase()} .
        </Text>
      )}
      <Pressable
        className="w-[70vw] h-[50] flex-row items-center justify-start rounded-2xl px-3"
        style={{
          backgroundColor: isContactIncluded ? colors.lightpurple : colors.dark3,
        }}
        onPress={() => {
          if (isContactIncluded) {
            deleteTagFromContact(contact, tag);
            deleteContactFromTag(tag, contact);
          } else {
            addTagToContact(contact, tag);
            addContactToTag(tag, contact);
          }
        }}>
        <Image
          source={require('../../assets/images/profilePictureNoBG.svg')}
          className="w-10 h-10 bg-dark3 rounded-full mr-3"
        />
        <Text className="text-white font-semibold" style={{ fontSize: 18 }}>
          {contact.name}
        </Text>
        <View className="w-6 h-6 items-center justify-center border border-amber rounded-full ml-3 absolute right-8">
          <Text className="text-white text-md">{contact?.tags.length}</Text>
        </View>
      </Pressable>
    </View>
  );
}
