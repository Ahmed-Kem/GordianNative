import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { create } from 'zustand';

import { firestore } from '../../firebaseConfig';

type contactStore = {
  user: User | null;
  contacts: Contact[];
  contactIds: Contact['id'][];
  selectedContactId: Contact['id'] | null;
  isLoadingContact: boolean;
  initContactStore: (_user: User) => void;
  addContact: (name: Contact['name']) => void;
  updateContact: (
    contactId: Contact['id'],
    contactData: { name: Contact['name']; photoUrl: Contact['photoUrl'] },
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

    const orderedContactsCollection = query(
      collection(firestore, 'Users', _user.uid, 'Contacts'),
      orderBy('name'),
    );

    return onSnapshot(
      orderedContactsCollection,
      (snapshot) => {
        const updatedContacts: Contact[] = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as Contact;
        });

        set({
          contacts: updatedContacts,
          contactIds: updatedContacts.reduce(
            (tempIds: Contact['id'][], contact: Contact) => [...tempIds, contact.id],
            [],
          ),
          isLoadingContact: false,
        });
      },
      (error) => {
        console.error('Error getting contacts: ', error);
      },
    );
  },

  addContact: (name) => {
    set({ isLoadingContact: true });
    const ContactsCollection = collection(
      firestore,
      'Users',
      get().user?.uid as string,
      'Contacts',
    );

    const docRef = doc(ContactsCollection).id;
    setDoc(doc(ContactsCollection, docRef), {
      id: docRef,
      name,
      tags: [],
    });

    set({ isLoadingContact: false });
  },

  updateContact: (contactId, contactData) => {
    set({ isLoadingContact: true });
    const contact = get().getContact(contactId);

    if (typeof contact !== 'undefined') {
      if (get().contacts.includes(contact)) {
        const ContactsCollection = collection(
          firestore,
          'Users',
          get().user?.uid as string,
          'Contacts',
        );

        updateDoc(doc(ContactsCollection, contactId), contactData)
          .then(() => {})
          .catch((error) => {
            console.error('Error updating contact: ', error);
          });
      }
    }
    set({ isLoadingContact: false });
  },

  deleteContact: (contactId) => {
    const contact = get().getContact(contactId);

    if (typeof contact !== 'undefined') {
      if (get().contacts.includes(contact)) {
        set({ isLoadingContact: true });
        const ContactsCollection = collection(
          firestore,
          'Users',
          get().user?.uid as string,
          'Contacts',
        );

        deleteDoc(doc(ContactsCollection, contactId))
          .then(() => {})
          .catch((error) => {
            console.error('Error removing contact: ', error);
          });
        set({ isLoadingContact: false });
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
    set({ isLoadingContact: true });
    if (get().contacts.includes(contact) && !contact.tags.includes(tag.id)) {
      const ContactsCollection = collection(
        firestore,
        'Users',
        get().user?.uid as string,
        'Contacts',
      );

      updateDoc(doc(ContactsCollection, contact.id), {
        tags: [...contact.tags, tag.id],
      })
        .then(() => {})
        .catch((error) => {
          console.error('Error adding tag to contact: ', error);
        });
    }
    set({ isLoadingContact: false });
  },

  deleteTagFromContact: async (contact, tag) => {
    set({ isLoadingContact: true });
    if (get().contacts.includes(contact) && contact.tags.includes(tag.id)) {
      const ContactsCollection = collection(
        firestore,
        'Users',
        get().user?.uid as string,
        'Contacts',
      );

      updateDoc(doc(ContactsCollection, contact.id), {
        tags: contact.tags.filter((idTag) => idTag !== tag.id),
      })
        .then(() => {})
        .catch((error) => {
          console.error('Error deleting tag from contact: ', error);
        });
    }
    set({ isLoadingContact: false });
  },

  deleteAllTagsFromContact: (contact) => {
    set({ isLoadingContact: true });
    if (get().contacts.includes(contact)) {
      const ContactsCollection = collection(
        firestore,
        'Users',
        get().user?.uid as string,
        'Contacts',
      );

      updateDoc(doc(ContactsCollection, contact.id), { tags: [] });
    }
    set({ isLoadingContact: false });
  },

  resetContactStore: () =>
    set({
      contacts: [],
      user: null,
      isLoadingContact: true,
      selectedContactId: null,
    }),
}));
