import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';

import ActionButton from '../../components/Buttons/ActionButton';
import AddTagToContactModal from '../../components/Modals/AddTagToContactModal';
import MiniTag from '../../components/Tags/MiniTag';
import { useContactStore } from '../../stores/contact.store';

export default function ContactDetail({ navigation }: ContactDetailProps) {
  const { selectedContactId, getContact, updateContact } = useContactStore((state) => ({
    selectedContactId: state.selectedContactId,
    getContact: state.getContact,
    updateContact: state.updateContact,
  }));

  const [triggerAddTagToContactModal, setTriggerAddTagToContactModal] = useState(false);

  const contact: Contact = getContact(selectedContactId);

  const actionBtns = [
    {
      name: 'Add Tag',
      btnClick: () => setTriggerAddTagToContactModal(true),
    },
  ];

  return (
    <View className="bg-dark1 h-[100%] w-full items-center">
      <AddTagToContactModal
        contactId={selectedContactId}
        trigger={triggerAddTagToContactModal}
        setTrigger={setTriggerAddTagToContactModal}
      />
      <ScrollView
        className="w-[95vw] h-[150%] flex pt-4  mb-4"
        contentContainerStyle={{ alignItems: 'center' }}>
        <View className="bg-dark2 flex w-[95vw] min-h-[87vh] pt-4 rounded-xl mb-4 pb-4 items-center">
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
