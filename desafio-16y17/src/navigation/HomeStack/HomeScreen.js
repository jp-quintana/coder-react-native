import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState } from 'react';

import { CATEGORIES } from '../../data/categories';

import SearchInput from '../../components/SearchInput';
import CategoryButton from '../../components/CategoryButton';

import { Colors } from '../../helpers/colors';

const HomeScreen = () => {
  const [userInput, setUserInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('pasta');

  return (
    <View style={styles.container}>
      <View style={styles.search_container}>
        <SearchInput
          userInput={userInput}
          handleUserInput={(text) => setUserInput(text)}
          handleClear={() => setUserInput('')}
        />
      </View>
      <View style={styles.categories_container}>
        <FlatList
          data={CATEGORIES}
          renderItem={({ item, index }) => (
            <CategoryButton
              title={item.title}
              imageUrl={item.imageUrl}
              selectedCategory={selectedCategory}
              isLastElement={index === CATEGORIES.length - 1}
              onPress={() => setSelectedCategory(item.title)}
            />
          )}
          keyExtractor={(item) => item.title}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {userInput.length > 0 && (
        <>
          <Text style={styles.title}>Search Results</Text>
        </>
      )}
      {userInput.length === 0 && (
        <>
          <Text style={styles.title}>Featured products</Text>
          <Text style={styles.title}>All products</Text>
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search_container: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  categories_container: {},
  title: {
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
});
