import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, TextInput, Text, View } from 'react-native';

import ModalTemplate from './ModalTemplate';
import { useTagStore } from '../../stores/tag.store';

export default function CreateTagModal({
  trigger,
  setTrigger,
}: {
  trigger: boolean;
  setTrigger: (value: boolean) => void;
}) {
  const addTag = useTagStore((state) => state.addTag);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <ModalTemplate trigger={trigger} setTrigger={setTrigger}>
      <Text className="text-white font-semibold">Nouveau tag</Text>
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
          <TextInput
            type="text"
            className="bg-none text-white placeholder-white font-normal border border-white rounded-lg ml-2 mt-8 p-2"
            style={{ textAlignVertical: 'top' }}
            placeholder="Description"
            placeholderTextColor="white"
            multiline
            numberOfLines={4}
            onChange={(e) => setDescription(e.nativeEvent.text)}
          />
        </View>
        <Pressable
          type="submit"
          className="p-2 bg-purple text-white font-semibold border-0 rounded-lg mt-10"
          onPress={(e) => {
            if (name === '') return;
            e.preventDefault();
            addTag(name.charAt(0).toUpperCase() + name.slice(1), description);
            setName('');
            setDescription('');
            setTrigger(false);
          }}>
          <Text className="text-white font-medium text-xs">Créer le tag</Text>
        </Pressable>
      </View>
    </ModalTemplate>
  );
}
