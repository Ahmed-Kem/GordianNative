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

function generateRandomColor() {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
}

type tagStore = {
  user: User | null;
  tags: Tag[];
  tagIds: Tag['id'][];
  selectedTagId: Tag['id'] | null;
  isLoadingTag: boolean;
  initTagStore: (user: User) => void;
  addTag: (name: Tag['name'], description: Tag['description']) => void;
  updateTag: (
    tagId: Tag['id'],
    tagData: {
      name: Tag['name'];
      description: Tag['description'];
      photoUrl: Tag['photoUrl'];
    },
  ) => void;
  deleteTag: (tagId: Tag['id']) => void;
  getTag: (tagId: Tag['id']) => Tag | undefined;
  setSelectedTagId: (tagId: Tag['id']) => void;
  addContactToTag: (tag: Tag, contact: Contact) => void;
  deleteContactFromTag: (tag: Tag, contact: Contact) => void;
  deleteAllContactsFromTag: (tag: Tag) => void;
  resetTagStore: () => void;
};

export const useTagStore = create<tagStore>((set, get) => ({
  user: null,
  tags: [],
  tagIds: [],
  selectedTagId: null,
  isLoadingTag: true,

  initTagStore: (_user) => {
    set({ user: _user });

    const orderedTagsCollection = query(
      collection(firestore, 'Users', _user.uid, 'Tags'),
      orderBy('name'),
    );

    return onSnapshot(orderedTagsCollection, (snapshot) => {
      const updatedTags: Tag[] = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Tag,
      );
      set({
        tags: updatedTags,
        tagIds: updatedTags.reduce((tempIds: Tag['id'][], tag: Tag) => [...tempIds, tag.id], []),
        isLoadingTag: false,
      });
    });
  },

  addTag: (name, description) => {
    set({ isLoadingTag: true });
    const TagsCollection = collection(firestore, 'Users', get().user?.uid as string, 'Tags');

    const docRef = doc(TagsCollection).id;
    setDoc(doc(TagsCollection, docRef), {
      id: docRef,
      name,
      description,
      color: generateRandomColor(),
      contacts: [],
    });

    set({ isLoadingTag: false });
  },

  updateTag: (tagId, tagData) => {
    const tag = get().getTag(tagId);

    if (typeof tag !== 'undefined') {
      if (get().tags.includes(tag)) {
        const TagsCollection = collection(firestore, 'Users', get().user?.uid as string, 'Tags');

        updateDoc(doc(TagsCollection, tagId), tagData)
          .then(() => {})
          .catch((error) => {
            console.error('Error updating tag: ', error);
          });
      }
    }
    set({ isLoadingTag: false });
  },

  deleteTag: (tagId) => {
    const tag = get().getTag(tagId);

    if (typeof tag !== 'undefined') {
      if (get().tags.includes(tag)) {
        set({ isLoadingTag: true });

        const TagsCollection = collection(firestore, 'Users', get().user?.uid as string, 'Tags');

        deleteDoc(doc(TagsCollection, tagId))
          .then(() => {})
          .catch((error) => {
            console.error('Error removing tag: ', error);
          });
        set({ isLoadingTag: false });
      }
    }
  },

  getTag: (tagId) => {
    return get().tags.find((tag) => tag.id === tagId);
  },

  setSelectedTagId: (tagId) => set({ selectedTagId: tagId }),

  addContactToTag: async (tag, contact) => {
    if (get().tags.includes(tag) && !tag.contacts.includes(contact.id)) {
      const TagsCollection = collection(firestore, 'Users', get().user?.uid as string, 'Tags');

      updateDoc(doc(TagsCollection, tag.id), {
        contacts: [...tag.contacts, contact.id],
      })
        .then(() => {})
        .catch((error) => {
          console.error('Error adding contact to tag: ', error);
        });

      set({ isLoadingTag: false });
    }
  },

  deleteContactFromTag: async (tag, contact) => {
    set({ isLoadingTag: true });
    if (get().tags.includes(tag) && tag.contacts.includes(contact.id)) {
      const TagsCollection = collection(firestore, 'Users', get().user?.uid as string, 'Tags');

      updateDoc(doc(TagsCollection, tag.id), {
        contacts: tag.contacts.filter((idContact) => idContact !== contact.id),
      })
        .then(() => {})
        .catch((error) => {
          console.error('Error deleting contact from tag: ', error);
        });
      set({ isLoadingTag: false });
    }
  },

  deleteAllContactsFromTag: (tag) => {
    if (get().tags.includes(tag)) {
      const TagsCollection = collection(firestore, 'Users', get().user?.uid as string, 'Tags');

      updateDoc(doc(TagsCollection, tag.id), {
        contacts: [],
      })
        .then(() => {})
        .catch((error) => {
          console.error('Error deleting all contacts from tag: ', error);
        });
      set({ isLoadingTag: false });
    }
  },

  resetTagStore: () => set({ tags: [], user: null, isLoadingTag: true }),
}));
