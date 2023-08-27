import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import InputForm from 'components/InputForm';
import SubmitButton from 'components/SubmitButton';
import { colors } from 'helpers/colors';
import { useSignInMutation } from 'services/authServices';
import { isAtLeastSixCharacters, isValidEmail } from 'helpers/validation';
import { useDispatch } from 'react-redux';
import { setUser } from 'features/user/userSlice';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const dispatch = useDispatch();

  const [triggerSignIn, resultSignIn] = useSignInMutation();

  const onSubmit = () => {
    const isValidVariableEmail = isValidEmail(email);
    const isCorrectPassword = isAtLeastSixCharacters(password);
    if (isValidVariableEmail && isCorrectPassword) {
      triggerSignIn({
        email,
        password,
        returnSecureToken: true,
      });
    }
    if (!isValidVariableEmail) setErrorEmail('Email is not correct');
    else setErrorEmail('');
    if (!isCorrectPassword)
      setErrorPassword('Password must be at least 6 characters');
    else setErrorPassword('');
  };

  useEffect(() => {
    if (resultSignIn.isSuccess) {
      console.log('aca', resultSignIn.data.localId);
      dispatch(
        setUser({
          email: resultSignIn.data.email,
          idToken: resultSignIn.data.idToken,
          localId: resultSignIn.data.localId,
        })
      );
    }
  }, [resultSignIn]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <InputForm
        label={'Email'}
        onChange={(email) => setEmail(email)}
        error={errorEmail}
      />
      <InputForm
        label={'Password'}
        onChange={(password) => setPassword(password)}
        error={errorPassword}
        isSecure={true}
      />
      <SubmitButton onPress={onSubmit} title="Send" />
      <Text style={styles.text}>No account?</Text>
      <Pressable onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.switch}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory,
    height: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
  },
  text: {
    fontSize: 14,
    color: 'black',
  },
  switch: {
    fontSize: 14,
    fontWeight: 700,
    color: 'black',
  },
});
