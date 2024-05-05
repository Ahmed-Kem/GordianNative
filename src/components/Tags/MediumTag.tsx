import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { useContactStore } from '../../stores/contact.store';
import { useTagStore } from '../../stores/tag.store';
import { colors } from '../../utils/constants/colors';

export default function MediumTag({
  tagId,
  contactId,
  isShowLetter,
}: {
  tagId: string;
  contactId: string;
  isShowLetter?: boolean;
}) {
  const { getTag, addContactToTag, deleteContactFromTag } = useTagStore((state) => ({
    getTag: state.getTag,
    addContactToTag: state.addContactToTag,
    deleteContactFromTag: state.deleteContactFromTag,
  }));

  const { getContact, addTagToContact, deleteTagFromContact } = useContactStore((state) => ({
    getContact: state.getContact,
    addTagToContact: state.addTagToContact,
    deleteTagFromContact: state.deleteTagFromContact,
  }));

  const tag = getTag(tagId);
  const contact = getContact(contactId);

  const isTagIncluded = contact.tags.includes(tagId);

  return (
    <View className="flex flex-col items-start bg-none">
      {isShowLetter && (
        <Text className="h-7 text-white font-semibold text-xl ml-4 mb-4">
          {tag.name.charAt(0).toUpperCase()} .
        </Text>
      )}
      <Pressable
        className="bg-dark2 w-[70vw] h-[50] flex-row items-center justify-start rounded-2xl px-3"
        style={{
          backgroundColor: isTagIncluded ? colors.lightpurple : colors.dark2,
        }}
        onPress={() => {
          if (isTagIncluded) {
            deleteTagFromContact(contact, tag);
            deleteContactFromTag(tag, contact);
          } else {
            addTagToContact(contact, tag);
            addContactToTag(tag, contact);
          }
        }}>
        {tag?.photoUrl === '' || !tag?.photoUrl ? (
          <View className="w-8 h-8 bg-none rounded-full mr-3" />
        ) : (
          <Image
            source={require('../../assets/images/profilePictureNoBG.svg')}
            className="w-12 h-12 bg-dark1 rounded-full mr-3"
          />
        )}
        <Text
          className="text-white font-semibold text-md px-4 py-1 rounded-full bg-none"
          style={{
            borderColor: tag.color,
            borderWidth: isTagIncluded ? 2 : 1,
          }}>
          {tag.name}
        </Text>
        <View className="w-6 h-6 items-center justify-center border border-amber rounded-full ml-3 absolute right-8">
          <Text className="text-white text-md">{tag?.contacts.length}</Text>
        </View>
      </Pressable>
    </View>
  );
}
