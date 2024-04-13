import { View, Text, TextInput, Pressable } from 'react-native';

//import { useAuthStore } from '../../stores/auth.store';
import { LogInProps } from '../../types/AuthStackTypes';

export default function CongratNewAccount() {
  return (
    <View className="flex-1 items-center justify-center bg-dark1 text-white">
      <View className="w-[90vw] h-[89vh] bg-dark2 rounded-lg flex items-center">
        <Text className="text-white font-semibold font-['Be Vietnam Pro'] text-lg mt-10">
          Félicitations. Votre comptre vient d'être créé
        </Text>

        <Pressable className="h-[35] w-[140] mt-14 bg-purple rounded-md flex items-center justify-center">
          <Text className="text-white text-xs">Continuer</Text>
        </Pressable>
      </View>
    </View>
  );
}
