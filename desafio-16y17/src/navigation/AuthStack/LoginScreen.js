import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useSignInMutation } from '../../services/authServices';
import { setUser } from '../../features/user/userSlice';

import AuthInput from '../../components/AuthInput';
import PrimaryButton from '../../components/PrimaryButton';

import { Colors } from '../../helpers/colors';
import { validateEmail } from '../../helpers/validation';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [triggerSignIn, result] = useSignInMutation();

  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
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
      setAuthError(
        'Sorry, your email or password is incorrect. Please try again.'
      );
      setUserInput({
        email: '',
        password: '',
      });
    }

    return () => setAuthError(null);
  }, [result]);

  const handleInput = ({ name, text }) => {
    setUserInput((prevState) => ({ ...prevState, [name]: text }));
  };

  const handleSubmit = () => {
    setAuthError(null);
    try {
      if (!userInput.email) throw new Error('Email is required!');
      if (!userInput.password) throw new Error('Password is required!');
      const emailIsValid = validateEmail(userInput.email);
      if (!emailIsValid)
        throw new Error('Sorry, your email is incorrect. Please try again.');

      const request = {
        email: userInput.email,
        password: userInput.password,
        returnSecureToken: true,
      };

      triggerSignIn(request);
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const handleNavigation = () => {
    // setUserInput({
    //   email: '',
    //   password: '',
    // });
    setAuthError(null);
    navigation.navigate('RegisterScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.inputs_container}>
        <AuthInput
          placeholder="Email"
          onChangeText={(text) => handleInput({ name: 'email', text })}
          value={userInput.email}
        />
        <AuthInput
          placeholder="Password"
          onChangeText={(text) => handleInput({ name: 'password', text })}
          secureTextEntry={true}
          value={userInput.password}
        />
      </View>
      <View style={styles.submit_button}>
        <PrimaryButton onPress={handleSubmit}>Login</PrimaryButton>
      </View>
      {authError && <Text style={styles.auth_error}>{authError}</Text>}
      <View style={styles.switch_container}>
        <Text>No account yet? </Text>
        <Pressable onPress={handleNavigation}>
          <Text style={styles.switch_button_text}>Register now!</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
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
