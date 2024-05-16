import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, View, Text } from 'react-native';

import { colors } from '../../utils/constants/colors';

export default function OptionButton({ btns }) {
  const [activateBtn, setActivateBtn] = useState(false);

  function toggleBtn() {
    setActivateBtn(!activateBtn);
  }
  return (
    <View className="">
      <Pressable className="bg-none w-12 h-12 items-center justify-center" onPress={toggleBtn}>
        <Image source={require('../../assets/images/threeDots.svg')} className="w-5 h-1" />
      </Pressable>
      <View className="bg-dark1 rounded-2xl pb-4 flex flex-col items-center gap-y-4 w-fit h-fit absolute top-14 right-2">
        {activateBtn &&
          btns.map((btnData) => (
            <Pressable
              key={btnData.name}
              className="bg-none border-0 py-1 px-5 w-fit h-fit"
              onPress={() => {
                btnData.btnClick();
                toggleBtn();
              }}>
              <Text
                style={{
                  color: btnData.criticalBtn ? colors.red : colors.white,
                  width: '100%',
                  height: 20,
                }}>
                {btnData.name}
              </Text>
            </Pressable>
          ))}
      </View>
    </View>
  );
}
