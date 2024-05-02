import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';

import ActionButton from '../../components/Buttons/ActionButton';
import MiniTag from '../../components/Tags/MiniTag';
import { useContactStore } from '../../stores/contact.store';

export default function ContactDetail({ navigation }: ContactDetailProps) {
  const { selectedContactId, getContact, updateContact } = useContactStore((state) => ({
    selectedContactId: state.selectedContactId,
    getContact: state.getContact,
    updateContact: state.updateContact,
  }));

  const contact: Contact = getContact(selectedContactId);

  const actionBtns = [
    {
      name: 'Add Tag',
      btnClick: null,
    },
  ];

  return (
    <View className="bg-dark1 h-[92.3vh] w-full">
      <ScrollView
        className="bg-none w-full flex pt-4"
        contentContainerStyle={{ alignItems: 'center' }}>
        {/*
        <ContactDetailHeader contact={contact} setTrigger={setTriggerEditContactModal} />
        <ContactDetailBody contact={contact} />
    */}

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
      </ScrollView>
      <ActionButton itemType="contact" btns={actionBtns} />
    </View>
  );
}
