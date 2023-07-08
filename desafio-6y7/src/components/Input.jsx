import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';

const Input = ({ handleAddTask }) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = () => {
    if (userInput.length > 0) {
      handleAddTask(userInput);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
          placeholder="Comprar prote"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.button_text}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: 'grey',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  input: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  button: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#45474b',
  },
  button_text: {
    color: 'white',
    fontWeight: 700,
  },
});
