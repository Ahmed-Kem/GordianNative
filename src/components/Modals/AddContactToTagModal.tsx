import { useState } from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';

import ModalTemplate from './ModalTemplate';
import { useContactStore } from '../../stores/contact.store';
import { useTagStore } from '../../stores/tag.store';
import MediumContact from '../Contacts/MediumContactPlus';

export default function AddContactToTagModal({
  tagId,
  trigger,
  setTrigger,
}: {
  tagId: Tag['id'];
  trigger: boolean;
  setTrigger: (value: boolean) => void;
}) {
  const { getTag, addContactToTag, deleteContactFromTag } = useTagStore((state) => ({
    getTag: state.getTag,
    addContactToTag: state.addContactToTag,
    deleteContactFromTag: state.deleteContactFromTag,
  }));

  const { contacts, getContact } = useContactStore((state) => ({
    contacts: state.contacts,
    getContact: state.getContact,
  }));

  const tag = getTag(tagId);

  let contactLetterSection = '#';

  function isContactLetterSectionDifferent(name) {
    const isLetterDiff = contactLetterSection !== name.charAt(0).toUpperCase();
    contactLetterSection = name.charAt(0).toUpperCase();
    return isLetterDiff;
  }

  return (
    <ModalTemplate trigger={trigger} setTrigger={setTrigger}>
      <View className="w-[70vw] h-[400]">
        <Text className="text-white font-semibold mb-4">Ajouter un contact</Text>

        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <MediumContact
              tagId={tag.id}
              contactId={item.id}
              isShowLetter={isContactLetterSectionDifferent(item.name)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 10,
          }}
          style={{ flexGrow: 1 }}
        />
      </View>
    </ModalTemplate>
  );
}
