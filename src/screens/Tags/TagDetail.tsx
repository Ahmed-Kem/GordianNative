import { Image } from 'expo-image';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import ActionButton from '../../components/Buttons/ActionButton';
import MediumContact from '../../components/Contacts/MediumContact';
import AddContactToTagModal from '../../components/Modals/AddContactToTagModal';
import Header from '../../components/UI/Header';
import { useContactStore } from '../../stores/contact.store';
import { useTagStore } from '../../stores/tag.store';

export default function TagDetail({ navigation }: TagDetailProps) {
  const { selectedTagId, getTag, updateTag, setSelectedTagId, deleteTag } = useTagStore(
    (state) => ({
      selectedTagId: state.selectedTagId,
      getTag: state.getTag,
      updateTag: state.updateTag,
      setSelectedTagId: state.setSelectedTagId,
      deleteTag: state.deleteTag,
    }),
  );

  const { contacts, getContact, deleteTagFromContact } = useContactStore((state) => ({
    contacts: state.contacts,
    getContact: state.getContact,
    deleteTagFromContact: state.deleteTagFromContact,
  }));

  const [triggerAddContactToTagModal, setTriggerAddContactToTagModal] = useState(false);

  const tag = getTag(selectedTagId);

  async function handleDeleteTag() {
    setSelectedTagId(null);

    for (const contactId of tag.contacts) {
      await deleteTagFromContact(
        contacts.find((contact) => contact.id === contactId),
        tag,
      );
    }
    navigation.goBack();
    await deleteTag(selectedTagId);
  }

  const actionBtns = [
    {
      name: 'Add Contact',
      btnClick: () => setTriggerAddContactToTagModal(true),
    },
  ];

  const optionBtns = [
    {
      name: 'Editer le tag',
      btnClick: () => {
        //setSelectedTagId(selectedTagId);
      },
    },
    {
      name: 'Supprimer le tag',
      btnClick: handleDeleteTag,
      criticalBtn: true,
    },
  ];

  let contactLetterSection = '#';

  function isContactLetterSectionDifferent(name) {
    const isLetterDiff = contactLetterSection !== name.charAt(0).toUpperCase();
    contactLetterSection = name.charAt(0).toUpperCase();
    return isLetterDiff;
  }

  return (
    <View className="h-[100%] w-full flex items-center bg-dark1">
      <AddContactToTagModal
        tagId={selectedTagId}
        trigger={triggerAddContactToTagModal}
        setTrigger={setTriggerAddContactToTagModal}
      />
      <Header isGoBack optionBtns={optionBtns} />
      <ScrollView
        className="w-[95vw] h-[60vh] flex mt-4 mb-2"
        contentContainerStyle={{ alignItems: 'center' }}>
        <View className="bg-dark2 flex w-[95vw] h-fit min-h-[90vh] py-2 rounded-xl items-center">
          <Text className="mt-4 text-white text-2xl font-semibold">{tag.name}</Text>
          <Text className="mt-4 mx-4 text-white text-base font-normal">{tag.description}</Text>
          <View className="pt-6 w-full h-fit flex flex-row px-5 flex-wrap gap-3 justify-center">
            {tag.contacts.map((contactId) => (
              <View key={contactId}>
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
