import { StyleSheet, TextInput, View, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../helpers/colors';

const SearchInput = ({ userInput, handleUserInput, handleClear }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={24} color={Colors.placeholder} />
      <TextInput
        value={userInput}
        placeholder="Search"
        onChangeText={(text) => handleUserInput(text)}
        style={styles.input}
      />
      <Pressable onPress={handleClear}>
        {userInput.length > 0 && (
          <Ionicons name="close" size={24} color="black" style={styles.clear} />
        )}
      </Pressable>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    padding: 10,
  },
  input: {
    flex: 1,
  },
  clear: { marginLeft: 'auto', flex: 1 },
});
