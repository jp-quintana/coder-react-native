import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import AuthInput from '../../components/AuthInput';

const LoginScreen = () => {
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
        />
        <AuthInput
          placeholder="Password"
          onChangeText={(text) => handleInput({ name: 'email', text })}
          secureTextEntry={true}
        />
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
    marginBottom: 24,
  },
  inputs_container: {
    gap: 16,
  },
});
