import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import { useState } from 'react';

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
        <>
          {isSecure && <Text>Show</Text>}
          {!isSecure && <Text>Hide</Text>}
        </>
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
    paddingHorizontal: 24,
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
