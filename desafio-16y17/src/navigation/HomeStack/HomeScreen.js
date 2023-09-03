import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

import { CATEGORIES } from '../../data/categories';
import PRODUCTS from '../../data/products';

import SearchInput from '../../components/SearchInput';
import CategoryButton from '../../components/CategoryButton';
import ProductCardList from '../../components/ProductCardList';

import { Colors } from '../../helpers/colors';

const HomeScreen = () => {
  const [userInput, setUserInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('pasta');

  const [allProducts, setAllProducts] = useState(PRODUCTS);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [vegeterianProducts, setVegeterianProducts] = useState([]);

  useEffect(() => {
    const updatedSelectedProducts = allProducts.filter(
      (product) => product.categoryId === selectedCategory
    );
    setSelectedProducts(updatedSelectedProducts);
    setFeaturedProducts(
      updatedSelectedProducts.filter((product) => product.featured)
    );
    setVegeterianProducts(
      updatedSelectedProducts.filter((product) => product.vegetarian)
    );
  }, [selectedCategory]);

  useEffect(() => {
    setFilteredProducts(
      allProducts.filter((product) =>
        product.title.toLowerCase().includes(userInput.trim().toLowerCase())
      )
    );
  }, [userInput]);

  return (
    <View style={styles.container}>
      <View style={styles.search_container}>
        <SearchInput
          userInput={userInput}
          handleUserInput={(text) => setUserInput(text)}
          handleClear={() => setUserInput('')}
        />
      </View>
      {userInput.length > 0 && (
        <>
          <Text style={styles.title}>Search Results</Text>
          {filteredProducts.length === 0 && (
            <>
              <Text style={styles.no_product}>
                No products match search criteria
              </Text>
            </>
          )}
          {filteredProducts.length > 0 && (
            <>
              <ProductCardList products={filteredProducts} />
            </>
          )}
        </>
      )}
      {userInput.length === 0 && (
        <>
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
          <ScrollView style={styles.lists_container}>
            {featuredProducts.length > 0 && (
              <View style={styles.lists}>
                <Text style={styles.title}>Featured Products</Text>
                <ProductCardList products={featuredProducts} />
              </View>
            )}
            {selectedProducts.length > 0 && (
              <View style={styles.lists}>
                <Text style={styles.title}>All Products</Text>
                <ProductCardList products={selectedProducts} />
              </View>
            )}
            {vegeterianProducts.length > 0 && (
              <View style={styles.lists}>
                <Text style={styles.title}>Vegeterian selection</Text>
                <ProductCardList products={vegeterianProducts} />
              </View>
            )}
          </ScrollView>
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
    marginBottom: 6,
  },
  no_product: {
    textAlign: 'center',
  },
  lists_container: {
    gap: 32,
    paddingTop: 24,
    marginBottom: 64,
  },
  lists: {
    marginBottom: 24,
  },
});
