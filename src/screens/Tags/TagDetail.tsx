import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';

import ActionButton from '../../components/Buttons/ActionButton';
import MediumContact from '../../components/Contacts/MediumContact';
import AddContactToTagModal from '../../components/Modals/AddContactToTagModal';
import { useContactStore } from '../../stores/contact.store';
import { useTagStore } from '../../stores/tag.store';

export default function TagDetail({ navigation }: TagDetailProps) {
  const { selectedTagId, getTag, updateTag } = useTagStore((state) => ({
    selectedTagId: state.selectedTagId,
    getTag: state.getTag,
    updateTag: state.updateTag,
  }));

  const { getContact } = useContactStore((state) => ({
    getContact: state.getContact,
  }));

  const [triggerAddContactToTagModal, setTriggerAddContactToTagModal] = useState(false);

  const tag = getTag(selectedTagId);

  const actionBtns = [
    {
      name: 'Add Contact',
      btnClick: () => setTriggerAddContactToTagModal(true),
    },
  ];

  let contactLetterSection = '#';

  function isContactLetterSectionDifferent(name) {
    const isLetterDiff = contactLetterSection !== name.charAt(0).toUpperCase();
    contactLetterSection = name.charAt(0).toUpperCase();
    return isLetterDiff;
  }

  return (
    <View className="bg-dark1 h-[100%] w-full items-center">
      <AddContactToTagModal
        tagId={selectedTagId}
        trigger={triggerAddContactToTagModal}
        setTrigger={setTriggerAddContactToTagModal}
      />
      <ScrollView
        className="w-[95vw] h-[150%] flex pt-4  mb-4"
        contentContainerStyle={{ alignItems: 'center' }}>
        <View className="bg-dark2 flex w-[95vw] min-h-[87vh] pt-4 rounded-xl mb-4 pb-4 items-center">
          <Text className="mt-4 text-white text-2xl font-semibold">{tag.name}</Text>
          <Text className="mt-4 mx-4 text-white text-base font-normal">{tag.description}</Text>

          <View className="pt-6 w-full flex flex-row px-5 flex-wrap gap-3 justify-center">
            {tag.contacts.map((contactId) => (
              <View key={contactId} className="">
                <MediumContact
                  tagId={tag.id}
                  contactId={contactId}
                  navigation={navigation}
                  isShowLetter={isContactLetterSectionDifferent(getContact(contactId).name)}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <ActionButton itemType="tag" btns={actionBtns} />
    </View>
  );
}
