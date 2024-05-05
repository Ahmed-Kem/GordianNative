import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import Header from '../components/UI/Header';
import ContactDetail from '../screens/Contacts/ContactDetail';
import ContactsScreen from '../screens/Contacts/ContactsScreen';
import LoadingScreen from '../screens/LoadingScreen';
import TagDetail from '../screens/Tags/TagDetail';
import TagsScreen from '../screens/Tags/TagsScreen';
import { useAuthStore } from '../stores/auth.store';
import { useContactStore } from '../stores/contact.store';
import { useTagStore } from '../stores/tag.store';
import { HomeStackParamList } from '../types/HomeStackTypes';
import { colors } from '../utils/constants/colors';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeNav() {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  const { isLoadingContact, initContactStore, resetContactStore } = useContactStore((state) => ({
    isLoadingContact: state.isLoadingContact,
    initContactStore: state.initContactStore,
    resetContactStore: state.resetContactStore,
  }));

  const { isLoadingTag, initTagStore, resetTagStore } = useTagStore((state) => ({
    isLoadingTag: state.isLoadingTag,
    initTagStore: state.initTagStore,
    resetTagStore: state.resetTagStore,
  }));

  const [unsubscribe, setUnsubscribe] = useState<() => void>(() => () => {});

  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      const unsubscribeContact = initContactStore(user);
      const unsubscribeTag = initTagStore(user);
      setUnsubscribe(() => () => {
        unsubscribeContact();
        unsubscribeTag();
      });
    } else {
      resetContactStore();
      resetTagStore();
    }

    return () => {
      resetContactStore();
      resetTagStore();
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    if (isLoadingContact || isLoadingTag) {
      navigation.navigate('LoadingScreen');
    } else {
      navigation.navigate('ContactsScreen');
    }
  }, [isLoadingContact, isLoadingTag]);

  return (
    <HomeStack.Navigator
      initialRouteName="ContactsScreen"
      screenOptions={{
        headerTitle: () => <Header isSignOut />,
        headerBackVisible: false,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.dark1,
        },
      }}>
      {isLoadingContact || isLoadingTag ? (
        <HomeStack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{
            animation: 'fade_from_bottom',
          }}
        />
      ) : (
        <>
          <HomeStack.Screen
            name="ContactsScreen"
            component={ContactsScreen}
            options={{
              animation: 'slide_from_left',
            }}
          />
          <HomeStack.Screen
            name="TagsScreen"
            component={TagsScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <HomeStack.Screen
            name="ContactDetail"
            component={ContactDetail}
            options={{
              headerTitle: () => <Header isGoBack isOptions />,
              animation: 'slide_from_right',
            }}
          />
          <HomeStack.Screen
            name="TagDetail"
            component={TagDetail}
            options={{
              headerTitle: () => <Header isGoBack isOptions />,
              animation: 'slide_from_right',
            }}
          />
        </>
      )}
    </HomeStack.Navigator>
  );
}
