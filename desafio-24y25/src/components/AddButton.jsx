import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { colors } from 'helpers/colors';

const AddButton = ({
  title = '',
  onPress = () => {},
  color = colors.mauve,
}) => {
  return (
    <Pressable
      style={{ ...styles.button, backgroundColor: color }}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  button: {
    width: '80%',
    backgroundColor: colors.mauve,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: 700,
    color: `#fff`,
  },
});
