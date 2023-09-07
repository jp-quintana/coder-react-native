import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import SearchInput from '../../components/SearchInput';
import ProductCardList from '../../components/ProductCardList';

import { Colors } from '../../helpers/colors';

const FavoritesScreen = () => {
  const { products } = useSelector((state) => state.shopReducer);
  const { favorites } = useSelector((state) => state.userReducer);

  const [userInput, setUserInput] = useState('');

  const [favoriteProducts, setFavoriteProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFavoriteProducts(
      products.filter((product) => favorites.includes(product.id))
    );
  }, [favorites]);

  useEffect(() => {
    if (favoriteProducts) {
      setFilteredProducts(
        favoriteProducts.filter((product) =>
          product.title.toLowerCase().includes(userInput.trim().toLowerCase())
        )
      );
    }
  }, [userInput]);

  return (
    <View style={styles.container}>
      {!favoriteProducts && <Text style={styles.loading}>Loading...</Text>}
      {favoriteProducts?.length === 0 ? (
        <Text style={styles.no_favorites}>You have no favorites yet!</Text>
      ) : (
        <>
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
              <ScrollView>
                <View style={styles.lists_container}>
                  {favoriteProducts?.length > 0 && (
                    <View style={styles.lists}>
                      <Text style={styles.title}>Favorite Products</Text>
                      <ProductCardList products={favoriteProducts} />
                    </View>
                  )}
                </View>
              </ScrollView>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    textAlign: 'center',
  },
  no_favorites: {
    textAlign: 'center',
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
    paddingBottom: 64,
  },
  lists: {
    marginBottom: 24,
  },
});
