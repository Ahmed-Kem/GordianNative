import {
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { auth, firestore } from '../../firebaseConfig';

type authStore = {
  user: User | null;
  isLoggedIn: boolean;
  loginError: string;
  initAuthStore: () => void;
  signUp: (email: string, pswd: string) => void;
  signInWithPassword: (email: string, pswd: string) => void;
  //signInWithGoogle: () => void;
  signOut: () => void;
  resetPswdEmail: (email: string) => void;
  //updateUser: () => void;
  updateEmail: (email: string) => void;
  updatePassword: (pswd: string) => void;
  resetLoginError: () => void;
};

export const useAuthStore = create<authStore>((set) => ({
  user: auth.currentUser ? (auth.currentUser as User) : null,
  isLoggedIn: auth.currentUser !== null,
  loginError: '',

  initAuthStore: () => {
    return auth.onAuthStateChanged((user) => {
      set({ user: user as User | null, isLoggedIn: !!user });
    });
  },

  signUp: async (email, pswd) => {
    await createUserWithEmailAndPassword(auth, email, pswd)
      .then((userCredential) => {
        const _user = userCredential.user;

        setDoc(doc(firestore, 'Users', _user?.uid), {
          id: _user?.uid,
          name: _user?.displayName,
          email: _user?.email,
        })
          .then()
          .catch((e) => {
            set({ loginError: e.message });
          });

        set({ user: _user as User, isLoggedIn: true });
      })
      .catch((e) => {
        set({
          loginError: e.message,
        });
      });
  },

  signInWithPassword: async (email, pswd) => {
    await signInWithEmailAndPassword(auth, email, pswd)
      .then((userCredential) =>
        set({
          user: userCredential.user as User,
          isLoggedIn: true,
        }),
      )
      .catch((e) => {
        set({ loginError: e.message });
      });
  },

  /*signInWithGoogle: async () => {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    auth
      .signInWithPopup(provider)
      .then(function (result) {
        firestore()
          .collection('Users')
          .doc(result.user?.uid)
          .set({
            id: result.user?.uid,
            name: result.user?.displayName,
            email: result.user?.email,
          })
          .then()
          .catch((e) => {
            return { loginError: e.message };
          });

        set({
          user: result.user as User,
          isLoggedIn: true,
        });
      })
      .catch((e) => {
        return { loginError: e.message };
      });
  },*/

  signOut: async () => {
    signOut(auth)
      .then(() => set({ user: null, isLoggedIn: false }))
      .catch((e) => {
        set({ loginError: e.message });
      });
    /*await auth
      .signOut()
      .then(() => set({ user: null, isLoggedIn: false }))
      .catch((e) => {
        return { loginError: e.message };
      });*/
  },

  resetPswdEmail: async (email) => {
    await sendPasswordResetEmail(auth, email, {
      url: 'https://gordian-2ed20.firebaseapp.com',
      //url: `${window.location.origin}/NewPswd`,
      //url: `localhost`,
    })
      .then(() => {
        alert('Veuillez vérifier votre boite mail.');
      })
      .catch((e) => {
        set({ loginError: e.message });
      });
  },

  updateEmail: async (email) => {
    if (auth.currentUser) {
      updateEmail(auth.currentUser, email)
        .then()
        .catch((e) => {
          set({ loginError: e.message });
        });
    }
  },
  updatePassword: async (pswd) => {
    if (auth.currentUser) {
      updatePassword(auth.currentUser, pswd)
        .then()
        .catch((e) => {
          set({ loginError: e.message });
        });
    }
  },

  resetLoginError: () => {
    set({ loginError: '' });
  },
}));
