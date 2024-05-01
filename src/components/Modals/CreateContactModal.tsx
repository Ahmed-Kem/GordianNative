import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, TextInput, Text, View } from 'react-native';

import ModalTemplate from './ModalTemplate';
import { useContactStore } from '../../stores/contact.store';

export default function CreateContactModal({
  trigger,
  setTrigger,
}: {
  trigger: boolean;
  setTrigger: (value: boolean) => void;
}) {
  const addContact = useContactStore((state) => state.addContact);

  const [name, setName] = useState('');

  return (
    <ModalTemplate trigger={trigger} setTrigger={setTrigger}>
      <Text className="text-white font-semibold">Nouveau contact</Text>
      <View className="flex flex-col items-center mt-6">
        <Image source={require('../../assets/images/profilePicture.svg')} className="w-24 h-24" />
        <View className="flex text-center mt-4 w-40">
          <TextInput
            type="text"
            className="bg-none text-white placeholder-white font-normal border-none border-b-2 border-white ml-2"
            placeholder="Nom"
            placeholderTextColor="white"
            onChange={(e) => setName(e.nativeEvent.text)}
          />
        </View>
        <Pressable
          type="submit"
          className="p-2 bg-purple text-white font-semibold border-0 rounded-lg mt-10"
          onPress={(e) => {
            if (name === '') return;
            e.preventDefault();
            addContact(name.charAt(0).toUpperCase() + name.slice(1));
            setName('');
            setTrigger(false);
          }}>
          <Text className="text-white font-medium text-xs">Créer le contact</Text>
        </Pressable>
      </View>
    </ModalTemplate>
  );
}
