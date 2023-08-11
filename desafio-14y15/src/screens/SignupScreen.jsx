import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import InputForm from 'components/InputForm';
import SubmitButton from 'components/SubmitButton';
import { colors } from 'helpers/colors';
import { useSignUpMutation } from 'services/authServices';
import { useDispatch } from 'react-redux';
import { setUser } from 'features/user/userSlice';
import { isAtLeastSixCharacters, isValidEmail } from 'helpers/validation';
/* import { useSignUpMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { signupSchema } from "../validations/singupSchema"; */

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  const [triggerSignUp, result] = useSignUpMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
        })
      );
    }
  }, [result]);

  console.log(result.data);

  const onSubmit = () => {
    try {
      const isValidVariableEmail = isValidEmail(email);
      const passwordHasMinLength = isAtLeastSixCharacters(password);
      const isRepeatedPasswordCorrect = password === confirmPassword;

      if (
        isValidVariableEmail &&
        passwordHasMinLength &&
        isRepeatedPasswordCorrect
      ) {
        const request = {
          email,
          password,
          returnSecureToken: true,
        };

        console.log(request);
        triggerSignUp(request);
      } else {
        if (!isValidVariableEmail) setErrorMail('Email is not correct!');
        else setErrorMail('');
        if (!passwordHasMinLength)
          setErrorPassword('Password must be at least 6 characters long!');
        else setErrorPassword('');
        if (!isRepeatedPasswordCorrect)
          setErrorConfirmPassword('Passwords must match!');
        else setErrorConfirmPassword('');
      }
    } catch (err) {
      console.log('Catch error');
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <InputForm label={'Email'} onChange={setEmail} error={errorMail} />
      <InputForm
        label={'Password'}
        onChange={setPassword}
        error={errorPassword}
        isSecure={true}
      />
      <InputForm
        label={'Confirm Password'}
        onChange={setconfirmPassword}
        error={errorConfirmPassword}
        isSecure={true}
      />
      <SubmitButton onPress={onSubmit} title="Send" />
      <Text style={styles.text}>Already have an account?</Text>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switch}>Login</Text>
      </Pressable>
    </View>
  );
};

export default SignupScreen;

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
