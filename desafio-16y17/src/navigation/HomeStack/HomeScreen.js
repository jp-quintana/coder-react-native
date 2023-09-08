import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import SearchInput from '../../components/SearchInput';
import CategoryButton from '../../components/CategoryButton';
import ProductCardList from '../../components/ProductCardList';

import { Colors } from '../../helpers/colors';

const HomeScreen = () => {
  const { categories, products } = useSelector((state) => state.shopReducer);
  const [userInput, setUserInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [vegeterianProducts, setVegeterianProducts] = useState([]);

  useEffect(() => {
    const updatedSelectedProducts = products.filter(
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
      products.filter((product) =>
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
                No products match search criteria!
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
              data={categories}
              renderItem={({ item, index }) => (
                <CategoryButton
                  title={item}
                  selectedCategory={selectedCategory}
                  isLastElement={index === categories.length - 1}
                  onPress={() => setSelectedCategory(item)}
                />
              )}
              keyExtractor={(item) => item}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <ScrollView>
            <View style={styles.lists_container}>
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
            </View>
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
    paddingTop: 24,
    paddingBottom: 64,
  },
  lists: {
    marginBottom: 24,
  },
});
