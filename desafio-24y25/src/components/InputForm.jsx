import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from 'helpers/colors';

const InputForm = ({ label, onChange, error = '', isSecure = false }) => {
  const [input, setInput] = useState('');
  const onChangeText = (text) => {
    setInput(text);
    onChange(text);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{label}</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  subtitle: {
    width: '90%',
    fontSize: 16,
  },
  error: {
    // fontSize: 16,
    // color: 'red',
    // fontFamily: 'Josefin',
    // fontStyle: 'italic',
  },
  input: {
    width: '90%',
    borderWidth: 0,
    borderBottomWidth: 3,
    borderBottomColor: colors.purple,
    padding: 2,
    fontSize: 14,
  },
});
