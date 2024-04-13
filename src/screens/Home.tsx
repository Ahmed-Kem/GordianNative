import { Pressable, Text, View } from 'react-native';

import { useAuthStore } from '../stores/auth.store';

export default function Home() {
  const { user, signOut } = useAuthStore((state) => ({
    user: state.user,
    signOut: state.signOut,
  }));
  return (
    <View>
      <Text>Bonjour {user ? user.email : ''}</Text>
      <Pressable onPress={signOut} className="bg-purple w-20 h-5">
        <Text className="text-white">Sign Out</Text>
      </Pressable>
    </View>
  );
}
