import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import ContactItem from '../../components/Contacts/ContactItem';
import CreateContactModal from '../../components/Modals/CreateContactModal';
import AddBar from '../../components/UI/AddBar';
import Header from '../../components/UI/Header';
import SearchBar from '../../components/UI/SearchBar';
import SelectItemType from '../../components/UI/SelectItemType';
import { useContactStore } from '../../stores/contact.store';

export default function ContactsScreen({ navigation }: ContactsScreenProps) {
  const { contactIds, getContact } = useContactStore((state) => ({
    contactIds: state.contactIds,
    getContact: state.getContact,
  }));

  const [triggerCreateContactModal, setTriggerCreateContactModal] = useState(false);
  const [contactIdsToRender, setContactIdsToRender] = useState(contactIds);

  useEffect(() => {
    setContactIdsToRender(contactIds);
  }, [contactIds]);

  let contactLetterSection = '#';

  function isContactLetterSectionDifferent(name) {
    const isLetterDiff = contactLetterSection !== name.charAt(0).toUpperCase();
    contactLetterSection = name.charAt(0).toUpperCase();
    return isLetterDiff;
  }

  return (
    <View className="bg-dark1 h-full flex items-center pt-2">
      <CreateContactModal
        trigger={triggerCreateContactModal}
        setTrigger={setTriggerCreateContactModal}
      />
      <Header isSignOut />

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
          renderItem={({ item }) => (
            <ContactItem
              contactId={item}
              navigation={navigation}
              isShowLetter={isContactLetterSectionDifferent(getContact(item).name)}
            />
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{
            gap: 10,
          }}
          style={{ height: '84%', flexGrow: 0 }}
        />
      </View>
    </View>
  );
}
