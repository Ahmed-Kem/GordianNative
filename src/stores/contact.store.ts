import { User } from 'firebase/auth';
import { create } from 'zustand';
import { firestore } from '../firebase';

interface Contact {
  id: string;
  name: string;
  color: string;
  tags: Array<string>;
  photoUrl: string;
}

interface Tag {
  id: string;
  name: string;
  description: string;
  color: string;
  contacts: Array<string>;
  photoUrl: string;
}

function generateRandomColor() {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
}

type contactStore = {
  user: User | null;
  contacts: Array<Contact>;
  contactIds: Array<Contact['id']>;
  selectedContactId: Contact['id'] | null;
  isLoadingContact: boolean;
  initContactStore: (_user: User) => void;
  addContact: (name: Contact['name']) => void;
  updateContact: (
    contactId: Contact['id'],
    contactData: { name: Contact['name']; photoUrl: Contact['photoUrl'] }
  ) => void;
  deleteContact: (contactId: Contact['id']) => void;
  getContact: (contactId: Contact['id']) => Contact | undefined;
  setSelectedContactId: (contactId: Contact['id']) => void;
  addTagToContact: (contact: Contact, tag: Tag) => void;
  deleteTagFromContact: (contact: Contact, tag: Tag) => void;
  deleteAllTagsFromContact: (contact: Contact) => void;
  resetContactStore: () => void;
};

export const useContactStore = create<contactStore>((set, get) => ({
  user: null,
  contacts: [],
  contactIds: [],
  selectedContactId: null,
  isLoadingContact: true,

  initContactStore: (_user) => {
    set({ user: _user });

    return firestore
      .collection('Users')
      .doc(_user.uid)
      .collection('Contacts')
      .orderBy('name')
      .onSnapshot((snapshot) => {
        const updatedContacts: Contact[] = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Contact)
        );

        set({
          contacts: updatedContacts,
          contactIds: updatedContacts.reduce(
            (tempIds, contact) => [...tempIds, contact.id],
            []
          ),
          isLoadingContact: false,
        });
      });
  },

  addContact: (name) => {
    const ref = firestore
      .collection('Users')
      .doc(get().user?.uid)
      .collection('Contacts')
      .doc().id;

    firestore
      .collection('Users')
      .doc(get().user?.uid)
      .collection('Contacts')
      .doc(ref)
      .set({
        id: ref,
        name: name,
        color: generateRandomColor(),
        tags: [],
      })
      .then(() => {})
      .catch((error) => {
        console.error('Error writing contact: ', error);
      });
  },

  updateContact: (contactId, contactData) => {
    const contact = get().getContact(contactId);

    if (typeof contact !== 'undefined') {
      if (get().contacts.includes(contact)) {
        firestore
          .collection('Users')
          .doc(get().user?.uid)
          .collection('Contacts')
          .doc(contactId)
          .update(contactData)
          .then(() => {})
          .catch((error) => {
            console.error('Error updating contact: ', error);
          });
      }
    }
  },

  deleteContact: (contactId) => {
    const contact = get().getContact(contactId);

    if (typeof contact !== 'undefined') {
      if (get().contacts.includes(contact)) {
        firestore
          .collection('Users')
          .doc(get().user?.uid)
          .collection('Contacts')
          .doc(contactId)
          .delete()
          .then(() => {})
          .catch((error) => {
            console.error('Error removing contact: ', error);
          });
      }
    }
  },

  getContact: (contactId) => {
    return get().contacts.find((contact) => contact.id === contactId);
  },

  setSelectedContactId: (contactId) => {
    set({ selectedContactId: contactId });
  },

  addTagToContact: async (contact, tag) => {
    if (get().contacts.includes(contact) && !contact.tags.includes(tag.id)) {
      await firestore
        .collection('Users')
        .doc(get().user?.uid)
        .collection('Contacts')
        .doc(contact.id)
        .update({ tags: [...contact.tags, tag.id] })
        .then(() => {})
        .catch((error) => {
          console.error('Error adding tag to contact: ', error);
        });
    }
  },

  deleteTagFromContact: async (contact, tag) => {
    if (get().contacts.includes(contact) && contact.tags.includes(tag.id)) {
      await firestore
        .collection('Users')
        .doc(get().user?.uid)
        .collection('Contacts')
        .doc(contact.id)
        .update({ tags: contact.tags.filter((idTag) => idTag !== tag.id) })
        .then(() => {})
        .catch((error) => {
          console.error('Error deleting tag from contact: ', error);
        });
    }
  },

  deleteAllTagsFromContact: (contact) => {
    if (get().contacts.includes(contact)) {
      firestore
        .collection('Users')
        .doc(get().user?.uid)
        .collection('Contacts')
        .doc(contact.id)
        .update({ tags: [] });
    }
  },

  resetContactStore: () =>
    set({
      contacts: [],
      user: null,
      isLoadingContact: true,
      selectedContactId: null,
    }),
}));
