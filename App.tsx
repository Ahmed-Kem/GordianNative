import { StatusBar } from 'expo-status-bar';
import { NativeWindStyleSheet } from 'nativewind';
import { Text, View } from 'react-native';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-700 text-3xl">Gordian Native !</Text>
      <StatusBar style="auto" />
    </View>
  );
}
