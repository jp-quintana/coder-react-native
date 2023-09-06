import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../../services/authServices';
import { setUser } from '../../features/user/userSlice';

import AuthInput from '../../components/AuthInput';
import PrimaryButton from '../../components/PrimaryButton';

import { Colors } from '../../helpers/colors';
import { validateEmail, validatePassword } from '../../helpers/validation';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [triggerSignUp, result] = useSignUpMutation();

  const [userInput, setUserInput] = useState({
    email: '',
    displayName: '',
    password: '',
    confirmPassword: '',
  });
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
          displayName: result.data.displayName,
        })
      );
    }

    if (result?.isError) {
      if (result.error.data.error.errors[0].message === 'EMAIL_EXISTS') {
        setAuthError('User already exists!');
      } else {
        setAuthError('There was an unexpected error!');
      }
    }
  }, [result]);

  const handleInput = ({ name, text }) => {
    setUserInput((prevState) => ({ ...prevState, [name]: text }));
  };

  const handleSubmit = () => {
    setAuthError(null);
    try {
      if (!userInput.email) throw new Error('Email is required!');
      if (!userInput.displayName) throw new Error('Display name is required!');
      if (!userInput.password) throw new Error('Password is required!');
      if (!userInput.confirmPassword)
        throw new Error('You must confirm your password!');
      const emailIsValid = validateEmail(userInput.email);
      if (!emailIsValid)
        throw new Error('Sorry, your email is incorrect. Please try again.');
      const passwordIsValid = validatePassword(userInput.password);
      if (!passwordIsValid)
        throw new Error(
          'Sorry, your password must have a minimum of 8 characters, including at least 1 capital letter and 1 number.'
        );
      const confirmPasswordIsValid =
        userInput.password === userInput.confirmPassword;
      if (!confirmPasswordIsValid)
        throw new Error('Passwords must match! Please try again.');

      const request = {
        email: userInput.email,
        password: userInput.password,
        returnSecureToken: true,
        displayName: userInput.displayName,
      };

      triggerSignUp(request);
    } catch (err) {
      setAuthError(err.message);
    }
  };

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={styles.container}>
          <Text style={styles.title}>Hey there!</Text>
          <View style={styles.inputs_container}>
            <AuthInput
              placeholder="Email"
              onChangeText={(text) => handleInput({ name: 'email', text })}
              value={userInput.email}
            />
            <AuthInput
              placeholder="Display name"
              onChangeText={(text) =>
                handleInput({ name: 'displayName', text })
              }
              value={userInput.displayName}
            />
            <AuthInput
              placeholder="Password"
              onChangeText={(text) => handleInput({ name: 'password', text })}
              secureTextEntry={true}
              value={userInput.password}
            />
            <AuthInput
              placeholder="Confirm password"
              onChangeText={(text) =>
                handleInput({ name: 'confirmPassword', text })
              }
              secureTextEntry={true}
              value={userInput.confirmPassword}
            />
          </View>
          <View style={styles.submit_button}>
            <PrimaryButton onPress={handleSubmit}>Register</PrimaryButton>
          </View>
          {authError && <Text style={styles.auth_error}>{authError}</Text>}
          <View style={styles.switch_container}>
            <Text>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.switch_button_text}>Login!</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 36,
  },
  inputs_container: {
    gap: 24,
    marginBottom: 72,
  },
  submit_button: {
    marginBottom: 24,
  },
  switch_container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  switch_button_text: {
    color: Colors.primary,
  },
  auth_error: {
    color: Colors.error,
    textAlign: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
  },
});
