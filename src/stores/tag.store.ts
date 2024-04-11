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

type tagStore = {
  user: User | null;
  tags: Array<Tag>;
  tagIds: Array<Tag['id']>;
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
    }
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

    return firestore
      .collection('Users')
      .doc(_user.uid)
      .collection('Tags')
      .orderBy('name')
      .onSnapshot((snapshot) => {
        const updatedTags: Tag[] = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Tag)
        );
        set({
          tags: updatedTags,
          tagIds: updatedTags.reduce(
            (tempIds, tag) => [...tempIds, tag.id],
            []
          ),
          isLoadingTag: false,
        });
      });
  },

  addTag: (name, description) => {
    const ref = firestore
      .collection('Users')
      .doc(get().user?.uid)
      .collection('Tags')
      .doc().id;

    firestore
      .collection('Users')
      .doc(get().user?.uid)
      .collection('Tags')
      .doc(ref)
      .set({
        id: ref,
        name: name,
        description: description,
        color: generateRandomColor(),
        contacts: [],
      })
      .then(() => {})
      .catch((error) => {
        console.error('Error writing tag: ', error);
      });
  },

  updateTag: (tagId, tagData) => {
    const tag = get().getTag(tagId);

    if (typeof tag !== 'undefined') {
      if (get().tags.includes(tag)) {
        firestore
          .collection('Users')
          .doc(get().user?.uid)
          .collection('Tags')
          .doc(tagId)
          .update(tagData)
          .then(() => {})
          .catch((error) => {
            console.error('Error updating tag: ', error);
          });
      }
    }
  },

  deleteTag: (tagId) => {
    const tag = get().getTag(tagId);

    if (typeof tag !== 'undefined') {
      if (get().tags.includes(tag)) {
        firestore
          .collection('Users')
          .doc(get().user?.uid)
          .collection('Tags')
          .doc(tagId)
          .delete()
          .then(() => {})
          .catch((error) => {
            console.error('Error removing tag: ', error);
          });
      }
    }
  },

  getTag: (tagId) => {
    return get().tags.find((tag) => tag.id === tagId);
  },

  setSelectedTagId: (tagId) => set({ selectedTagId: tagId }),

  addContactToTag: async (tag, contact) => {
    if (get().tags.includes(tag) && !tag.contacts.includes(contact.id)) {
      await firestore
        .collection('Users')
        .doc(get().user?.uid)
        .collection('Tags')
        .doc(tag.id)
        .update({ contacts: [...tag.contacts, contact.id] })
        .then(() => {})
        .catch((error) => {
          console.error('Error adding contact to tag: ', error);
        });
    }
  },

  deleteContactFromTag: async (tag, contact) => {
    if (get().tags.includes(tag) && tag.contacts.includes(contact.id)) {
      await firestore
        .collection('Users')
        .doc(get().user?.uid)
        .collection('Tags')
        .doc(tag.id)
        .update({
          contacts: tag.contacts.filter(
            (idContact) => idContact !== contact.id
          ),
        })
        .then(() => {})
        .catch((error) => {
          console.error('Error deleting contact from tag: ', error);
        });
    }
  },

  deleteAllContactsFromTag: (tag) => {
    if (get().tags.includes(tag)) {
      firestore
        .collection('Users')
        .doc(get().user?.uid)
        .collection('Tags')
        .doc(tag.id)
        .update({ contacts: [] });
    }
  },

  resetTagStore: () => set({ tags: [], user: null, isLoadingTag: true }),
}));
