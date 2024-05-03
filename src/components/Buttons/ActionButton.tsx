import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, View, Text } from 'react-native';

import { colors } from '../../utils/constants/colors';

export default function ActionButton({ itemType, btns }) {
  const [triggerBtn, setTriggerBtn] = useState(false);

  function toggleBtn() {
    setTriggerBtn(!triggerBtn);
  }

  const bgColors = itemType === 'contact' ? colors.purple : colors.amber;
  const textColor = itemType === 'contact' ? colors.white : colors.black;
  const plusSvg =
    itemType === 'contact'
      ? require('../../assets/images/whitePlus.svg')
      : require('../../assets/images/blackPlus.svg');

  return (
    <View className="absolute bottom-8 right-6">
      {(itemType === 'contact' || itemType === 'tag') && (
        <View className="flex flex-col items-end gap-y-6 ">
          {triggerBtn && (
            <View className="gap-y-3 items-end">
              {btns.map((btn) => (
                <Pressable
                  key={btn.name}
                  className="px-4 py-2 justify-center rounded-lg"
                  style={{ backgroundColor: bgColors, width: '100%' }}
                  onPress={() => {
                    btn.btnClick();
                    toggleBtn();
                  }}>
                  <Text className="text-right font-medium" style={{ color: textColor }}>
                    {btn.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
          <Pressable
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{
              transform: [{ rotate: triggerBtn ? '45deg' : '0deg' }],
              backgroundColor: bgColors,
            }}
            onPress={toggleBtn}>
            <Image source={plusSvg} className="w-6 h-6" />
          </Pressable>
        </View>
      )}
    </View>
  );
}
