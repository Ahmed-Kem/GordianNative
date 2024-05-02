import { Image } from 'expo-image';
import { useRef, useEffect } from 'react';
import { Pressable, TextInput, Text, View } from 'react-native';

import { useContactStore } from '../../stores/contact.store';
import { useTagStore } from '../../stores/tag.store';

type Item = Contact | Tag;

export default function SearchBar({
  itemType,
  itemIdsToRender,
  setItemIdsToRender,
}: {
  itemType: string;
  itemIdsToRender: Contact['id'][] | Tag['id'][];
  setItemIdsToRender: (itemIds: Contact['id'][] | Tag['id'][]) => void;
}) {
  const { getContact } = useContactStore((state) => ({
    getContact: state.getContact,
  }));

  const { getTag } = useTagStore((state) => ({
    getTag: state.getTag,
  }));

  function filterItemIdsToRender(input: string) {
    const getItem = itemType === 'contact' ? getContact : itemType === 'tag' ? getTag : null;

    const filteredItemIds = itemIdsToRender.filter(
      (id) => input === '' || getItem(id).name.toLowerCase().includes(input.toLowerCase()),
    );
    setItemIdsToRender(filteredItemIds);
  }

  return (
    <View className="flex flex-row items-center mx-1 mt-3">
      <Image
        source={require('../../assets/images/search.svg')}
        className="w-5 h-5 absolute left-4 right-2 z-10"
      />
      <TextInput
        type="text"
        className="w-[85vw] bg-dark2 rounded-full text-white placeholder-white font-normal border-none border-b-2 border-white ml-2 px-12 py-1"
        placeholder={
          itemType === 'contact'
            ? 'Rechercher un contact'
            : itemType === 'tag' && 'Rechercher un tag'
        }
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={{ borderBottomWidth: 0 }}
        textContentType="name"
        onChange={(e) => filterItemIdsToRender(e.nativeEvent.text)}
      />
    </View>
  );
}
