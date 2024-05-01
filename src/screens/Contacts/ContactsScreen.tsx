import { useState } from 'react';
import { FlatList, View } from 'react-native';

import AddBar from '../../components/AddBar';
import ContactItem from '../../components/Contacts/ContactItem';
import CreateContactModal from '../../components/Modals/CreateContactModal';
import SearchBar from '../../components/SearchBar';
import SelectItemType from '../../components/SelectItemType';
import { useContactStore } from '../../stores/contact.store';

export default function ContactsScreen({ navigation }: ContactsScreenProps) {
  const { contactIds } = useContactStore((state) => ({
    contactIds: state.contactIds,
  }));

  const [triggerCreateContactModal, setTriggerCreateContactModal] = useState(false);
  const [contactIdsToRender, setContactIdsToRender] = useState(contactIds);
  return (
    <View className="bg-dark1 h-full flex items-center pt-2">
      <CreateContactModal
        trigger={triggerCreateContactModal}
        setTrigger={setTriggerCreateContactModal}
      />
      <SelectItemType itemType="contact" navigation={navigation} />
      <SearchBar
        itemType="contact"
        itemIdsToRender={contactIds}
        setItemIdsToRender={setContactIdsToRender}
      />
      <AddBar setTrigger={setTriggerCreateContactModal} />
      <View className="mt-6">
        <FlatList
          data={contactIdsToRender}
          renderItem={({ item }) => <ContactItem contactId={item} />}
          keyExtractor={(id) => id}
          contentContainerStyle={{
            gap: 10,
          }}
          style={{ height: '85%', flexGrow: 0 }}
        />
      </View>
    </View>
  );
}
