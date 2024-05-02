import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  ContactsScreen: undefined;
  TagsScreen: undefined;
  ContactDetail: undefined;
};

export type ContactsScreenProps = NativeStackScreenProps<HomeStackParamList, 'ContactsScreen'>;
export type TagsScreenProps = NativeStackScreenProps<HomeStackParamList, 'TagsScreen'>;
export type ContactDetailProps = NativeStackScreenProps<HomeStackParamList, 'ContactDetail'>;
