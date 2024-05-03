import { useState } from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';

import ModalTemplate from './ModalTemplate';
import { useContactStore } from '../../stores/contact.store';
import { useTagStore } from '../../stores/tag.store';
import MediumTag from '../Tags/MediumTag';

export default function AddTagToContactModal({
  contactId,
  trigger,
  setTrigger,
}: {
  trigger: boolean;
  setTrigger: (value: boolean) => void;
}) {
  const { getContact, addTagToContact, deleteTagFromContact } = useContactStore((state) => ({
    getContact: state.getContact,
    addTagToContact: state.addTagToContact,
    deleteTagFromContact: state.deleteTagFromContact,
  }));

  const { tags, getTag } = useTagStore((state) => ({
    tags: state.tags,
    getTag: state.getTag,
  }));

  const contact: Contact = getContact(contactId);

  let tagLetterSection = '#';

  function isTagLetterSectionDifferent(title) {
    const isLetterDiff = tagLetterSection !== title.charAt(0);
    if (isLetterDiff) {
      tagLetterSection = title.charAt(0);
    }
    return isLetterDiff;
  }

  return (
    <ModalTemplate trigger={trigger} setTrigger={setTrigger}>
      <View className="w-[70vw] h-[400]">
        <Text className="text-white font-semibold mb-4">Ajouter un tag</Text>

        <FlatList
          data={tags}
          renderItem={({ item }) => (
            <MediumTag
              tagId={item.id}
              contactId={contact.id}
              isShowLetter={isTagLetterSectionDifferent(item.name)}
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
