import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';

import categories from 'data/categories.json';
import products from 'data/products.json';

import Header from './src/components/Header';
import Categories from './src/screens/Categories';
import Products from './src/screens/Products';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('categories');
  const [selectedProducts, setSelectedProducts] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedProducts(
      products.filter((product) => product.category === category.id)
    );
    setCurrentScreen(category.id);
  };

  const handleBack = () => {
    setCurrentScreen('categories');
    setSelectedProducts(null);
  };

  return (
    <View style={styles.container}>
      <Header screen={currentScreen} />
      {currentScreen === 'categories' ? (
        <Categories
          categories={categories}
          handleSelectCategory={handleSelectCategory}
        />
      ) : (
        <Products selectedProducts={selectedProducts} handleBack={handleBack} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
