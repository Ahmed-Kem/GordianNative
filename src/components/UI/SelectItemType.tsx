import { FlatList, Modal, Pressable, Text, View } from 'react-native';

import { colors } from '../../utils/constants/colors';

export default function SelectItemType({ itemType, navigation }) {
  function switchType() {
    if (itemType === 'contact') {
      navigation.navigate('TagsScreen');
    }
    if (itemType === 'tag') {
      navigation.navigate('ContactsScreen');
    }
  }
  return (
    <View className="flex flex-row gap-6">
      <Pressable
        className="w-24 h-8  flex items-center justify-center pb-[2] rounded-2xl border border-purple"
        style={{
          backgroundColor: itemType === 'contact' ? colors.purple : colors.dark1,
        }}
        onPress={() => itemType === 'tag' && switchType()}>
        <Text className="text-white">Contact</Text>
      </Pressable>
      <Pressable
        className="w-24 h-8 flex items-center justify-center pb-[2] rounded-2xl border border-amber"
        style={{
          backgroundColor: itemType === 'tag' ? colors.amber : colors.dark1,
        }}
        onPress={() => itemType === 'contact' && switchType()}>
        <Text
          style={{
            color: itemType === 'tag' ? colors.dark1 : colors.amber,
          }}>
          Tag
        </Text>
      </Pressable>
    </View>
  );
}
