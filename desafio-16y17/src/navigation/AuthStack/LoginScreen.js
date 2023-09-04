import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';

import AuthInput from '../../components/AuthInput';
import PrimaryButton from '../../components/PrimaryButton';

import { Colors } from '../../helpers/colors';

const LoginScreen = ({ navigation }) => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  const handleInput = ({ name, text }) => {
    setUserInput((prevState) => ({ ...prevState, [name]: text }));
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
        <PrimaryButton>Login</PrimaryButton>
      </View>
      <View style={styles.switch_container}>
        <Text>No account yet? </Text>
        <Pressable onPress={() => navigation.navigate('RegisterScreen')}>
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
});
