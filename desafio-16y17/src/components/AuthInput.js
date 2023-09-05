import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Pressable,
} from 'react-native';
import { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../helpers/colors';

const AuthInput = ({ secureTextEntry, placeholder, onChangeText, value }) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        secureTextEntry={isSecure}
        placeholderTextColor={Colors.text}
      />
      {secureTextEntry && (
        <Pressable onPress={() => setIsSecure((prevState) => !prevState)}>
          {isSecure && <Ionicons name="eye" size={20} color="black" />}
          {!isSecure && <Ionicons name="eye-off" size={20} color="black" />}
        </Pressable>
      )}
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 18,
    // marginVertical: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  input: {
    flex: 1,
  },
});
