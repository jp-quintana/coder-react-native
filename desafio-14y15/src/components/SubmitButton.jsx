import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { colors } from 'helpers/colors';

const SubmitButton = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.button_text}>{title}</Text>
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.mauve,
    width: '40%',
    marginVertical: 10,
  },
  button_text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 700,
  },
});
