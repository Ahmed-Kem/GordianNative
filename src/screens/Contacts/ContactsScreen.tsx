import { Image } from 'expo-image';
import { FlatList, Pressable, Text, View } from 'react-native';

import ContactItem from '../../components/Contacts/ContactItem';
import { useContactStore } from '../../stores/contact.store';

export default function ContactsScreen({ navigation }: ContactsScreenProps) {
  const { contactIds } = useContactStore((state) => ({
    contactIds: state.contactIds,
  }));

  return (
    <View className="bg-dark1 h-full flex items-center pt-4">
      <View className="flex flex-row gap-6">
        <Pressable className="w-24 h-8 bg-purple flex items-center justify-center pb-[2] rounded-2xl">
          <Text className="text-amber">Contact</Text>
        </Pressable>
        <Pressable
          className="w-24 h-8 bg-opacity-0 flex items-center justify-center pb-[2] rounded-2xl border border-amber"
          onPress={() => navigation.navigate('TagsScreen')}>
          <Text className="text-white">Tag</Text>
        </Pressable>
      </View>
      <View className="flex flex-row items-center justify-center gap-y-6 gap-x-2 mt-0">
        <View className="w-[290] h-[0.5] bg-lightgrey mt-6" />
        <Pressable onPress={() => console.log('Press')}>
          <Image source={require('../../assets/images/add.svg')} className="w-6 h-6" />
        </Pressable>
      </View>
      <FlatList
        data={contactIds}
        renderItem={({ item }) => <ContactItem contactId={item} />}
        keyExtractor={(id) => id}
        contentContainerStyle={{
          gap: 10,
          marginTop: 32,
        }}
      />
    </View>
  );
}
