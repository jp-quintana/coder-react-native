import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from 'helpers/colors';

const Input = ({ userInput, handleUserInput, handleClear, handleBack }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={userInput}
        placeholder="Item name"
        onChangeText={(text) => handleUserInput(text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleClear}>
        <MaterialCommunityIcons
          name="eraser-variant"
          size={24}
          color={colors.purple}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBack}>
        <MaterialCommunityIcons
          name="keyboard-return"
          size={24}
          color={colors.purple}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    borderWidth: 3,
    borderColor: colors.darkPurple,
  },
});
