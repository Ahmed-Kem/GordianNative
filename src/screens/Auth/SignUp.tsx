import { Image } from 'expo-image';
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { useAuthStore } from '../../stores/auth.store';
import { SignUpProps } from '../../types/AuthStackTypes';
import { colors } from '../../utils/constants/colors';

export default function SignUp({ navigation }: SignUpProps) {
  const [pswdShown, setPswdShown] = useState(false);
  const [pswdShownConfirm, setPswdShownConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState('0%');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pswd, setPswd] = useState('');
  const [pswdConfirm, setPswdConfirm] = useState('');

  const { signUp } = useAuthStore((state) => ({
    signUp: state.signUp,
  }));

  function checkPswdStrength(passwordValue: string) {
    const strengthChecks = {
      length: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasDigit: false,
      hasSpecialChar: false,
    };

    strengthChecks.length = passwordValue.length >= 8;
    strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue);
    strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue);
    strengthChecks.hasDigit = /[0-9]+/.test(passwordValue);
    strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue);

    const verifiedList = Object.values(strengthChecks).filter((value) => value);

    const strength =
      verifiedList.length === 5 ? 'Strong' : verifiedList.length >= 2 ? 'Medium' : 'Weak';

    setProgress(`${(verifiedList.length / 5) * 100}%`);
    setMessage(strength);
  }

  function getActiveColor(type: string) {
    if (type === 'Strong') return colors.green;
    if (type === 'Medium') return colors.yellow;
    return colors.red;
  }

  function checkFormData() {
    const errorMessage = getErrorMessage();
    if (errorMessage !== '') {
      setErrorMessage(errorMessage);
    } else {
      signUp(email, pswd);
    }
  }

  function getErrorMessage() {
    const isEmailValid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/.test(email);
    if (!name) return 'Veuillez entrer votre nom complet';
    if (!email && isEmailValid) return 'Veuillez entrer une adresse e-mail valide';
    if (!pswd) return 'Veuillez entrer votre mot de passe';
    if (!pswdConfirm) return 'Veuillez confirmer votre mot de passe';
    if (pswd !== pswdConfirm) return 'Les mots de passe ne correspondent pas';
    if (message !== 'Strong') return 'Le mot de passe doit être plus fort';
    return '';
  }

  return (
    <View className="flex-1 items-center justify-center bg-dark1 text-white">
      <View className="w-[90vw] h-[89vh] bg-dark2 rounded-lg flex items-center">
        <Text className="text-white font-semibold font-['Be Vietnam Pro'] text-lg mt-10">
          Créez votre compte
        </Text>
        <Text className="text-red text-xs mt-12">{errorMessage}</Text>
        <TextInput
          placeholderTextColor="lightgrey"
          className="text-white bg-dark1 placeholder:text-lightgrey w-[280] h-[40] mt-4 px-4 rounded-md border border-lightgrey focus:border-1 focus:border-white blur:border-lightgrey blur:border"
          placeholder="Nom complet"
          autoCapitalize="none"
          autoCorrect={false}
          onChange={(e) => setName(e.nativeEvent.text)}
        />
        <TextInput
          placeholderTextColor="lightgrey"
          className="text-white bg-dark1 placeholder:text-lightgrey w-[280] h-[40] mt-4 px-4 rounded-md border border-lightgrey focus:border-1 focus:border-white blur:border-lightgrey blur:border"
          placeholder="exemple@email.com"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />
        <View className="flex flex-row items-center justify-center left-3">
          <TextInput
            placeholderTextColor="lightgrey"
            className="text-white bg-dark1 placeholder:text-lightgrey w-[280] h-[40] mt-4 px-4 rounded-md border border-lightgrey focus:border-1 focus:border-white blur:border-lightgrey blur:border"
            placeholder="Nouveau mot de passe"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={!pswdShown}
            onChange={(e) => {
              setPswd(e.nativeEvent.text);
              checkPswdStrength(e.nativeEvent.text);
            }}
          />
          <Pressable onPress={() => setPswdShown(!pswdShown)}>
            <Image
              source={
                !pswdShown
                  ? require('../../assets/images/hide-password.svg')
                  : require('../../assets/images/show-password.svg')
              }
              className="w-6 h-6 top-2 right-8"
            />
          </Pressable>
        </View>
        <View className="flex flex-col items-end justify-center">
          <View className="w-[275] h-[5] rounded-md mt-1">
            <View
              style={{ backgroundColor: getActiveColor(message), width: progress }}
              className="h-[5] rounded-md"
            />
          </View>
          <Text style={{ color: getActiveColor(message) }} className="text-xs mt-1 font-medium">
            {message === 'Strong'
              ? 'Fort'
              : message === 'Medium'
                ? 'Moyen'
                : message === 'Weak' && 'Faible'}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-center left-3">
          <TextInput
            placeholderTextColor="lightgrey"
            className="text-white bg-dark1 placeholder:text-lightgrey w-[280] h-[40] mt-4 px-4 rounded-md border border-lightgrey focus:border-1 focus:border-white blur:border-lightgrey blur:border"
            placeholder="Confirmer le mot de passe"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={!pswdShownConfirm}
            onChange={(e) => setPswdConfirm(e.nativeEvent.text)}
          />
          <Pressable onPress={() => setPswdShownConfirm(!pswdShownConfirm)}>
            <Image
              source={
                !pswdShownConfirm
                  ? require('../../assets/images/hide-password.svg')
                  : require('../../assets/images/show-password.svg')
              }
              className="w-6 h-6 top-2 right-8"
            />
          </Pressable>
        </View>
        <Pressable
          className="h-[35] w-[140] mt-10 bg-purple rounded-md flex items-center justify-center"
          onPress={checkFormData}>
          <Text className="text-white text-xs">Envoyer</Text>
        </Pressable>

        <View className="h-[1px] w-[280] bg-lightgrey mt-10" />

        <Pressable className="w-[280] h-[40] bg-amber rounded-md flex flex-row items-center justify-evenly mt-8">
          <Image source={require('../../assets/images/google-logo.svg')} className="w-7 h-7" />
          <Text className="font-medium text-sm">Continuer avec Google</Text>
        </Pressable>
        <Pressable className="w-[280] h-[40] bg-amber rounded-md flex flex-row items-center justify-evenly mt-5">
          <Image source={require('../../assets/images/apple-logo.svg')} className="w-6 h-7" />
          <Text className="font-medium text-sm">Continuer avec Apple</Text>
        </Pressable>
      </View>
    </View>
  );
}
