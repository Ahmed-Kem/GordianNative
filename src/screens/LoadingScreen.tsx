import { Image } from 'expo-image';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { colors } from '../utils/constants/colors';

export default function LoadingScreen() {
  return (
    <View className="bg-dark1 h-full flex justify-center">
      <ActivityIndicator size="large" color={colors.purple} />
    </View>
  );
}
