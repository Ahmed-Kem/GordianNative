import { Image } from 'expo-image';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import ActionButton from '../../components/Buttons/ActionButton';
import AddTagToContactModal from '../../components/Modals/AddTagToContactModal';
import MiniTag from '../../components/Tags/MiniTag';
import Header from '../../components/UI/Header';
import { useContactStore } from '../../stores/contact.store';
import { useTagStore } from '../../stores/tag.store';

export default function ContactDetail({ navigation }: ContactDetailProps) {
  const { selectedContactId, getContact, updateContact, setSelectedContactId, deleteContact } =
    useContactStore((state) => ({
      selectedContactId: state.selectedContactId,
      getContact: state.getContact,
      updateContact: state.updateContact,
      setSelectedContactId: state.setSelectedContactId,
      deleteContact: state.deleteContact,
    }));

  const { tags, deleteContactFromTag } = useTagStore((state) => ({
    tags: state.tags,
    deleteContactFromTag: state.deleteContactFromTag,
  }));

  const [triggerAddTagToContactModal, setTriggerAddTagToContactModal] = useState(false);

  const contact: Contact = getContact(selectedContactId);

  async function handleDeleteContact() {
    setSelectedContactId(null);

    for (const tagId of contact.tags) {
      await deleteContactFromTag(
        tags.find((tag) => tag.id === tagId),
        contact,
      );
    }
    navigation.goBack();
    await deleteContact(selectedContactId);
  }

  const actionBtns = [
    {
      name: 'Add Tag',
      btnClick: () => setTriggerAddTagToContactModal(true),
    },
  ];

  const optionBtns = [
    {
      name: 'Edit Contact',
      btnClick: () => {
        //setSelectedContactId(selectedContactId);
      },
    },
    {
      name: 'Delete Contact',
      criticalBtn: true,
      btnClick: handleDeleteContact,
    },
  ];

  return (
    <View className="bg-dark1 h-[100%] w-full items-center">
      <AddTagToContactModal
        contactId={selectedContactId}
        trigger={triggerAddTagToContactModal}
        setTrigger={setTriggerAddTagToContactModal}
      />
      <Header isGoBack optionBtns={optionBtns} />
      <ScrollView
        className="w-[95vw] h-[150%] flex pt-4"
        contentContainerStyle={{ alignItems: 'center' }}>
        <View className="bg-dark2 flex w-[95vw] min-h-[90vh] pt-4 rounded-xl mb-4 pb-4 items-center">
          <Image
            source={require('../../assets/images/profilePictureNoBG.svg')}
            className="w-[120] h-[120] bg-dark2 rounded-full"
          />
          <Text className="mt-4 text-white text-2xl font-semibold">{contact.name}</Text>

          <View className="pt-6 w-full flex flex-row justify-center px-5 flex-wrap gap-3">
            {contact.tags.map((tagId) => (
              <View key={tagId} className="mr-0">
                <MiniTag tagId={tagId} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <ActionButton itemType="contact" btns={actionBtns} />
    </View>
  );
}
