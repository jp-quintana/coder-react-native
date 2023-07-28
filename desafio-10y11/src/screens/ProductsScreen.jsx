import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';

import Input from 'components/Input';
import List from 'components/List';

import products from 'data/products.json';

import { colors } from 'helpers/colors';

const ProductsScreen = ({ navigation, route }) => {
  const { category } = route.params;
  const [userInput, setUserInput] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(
    products.filter((product) => product.category === category)
  );
  const [filteredProducts, setFilteredProducts] = useState(selectedProducts);

  const handleUserInput = (text) => {
    setUserInput(text);
  };

  useEffect(() => {
    const filtered = selectedProducts.filter((product) =>
      product.title.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [userInput]);

  return (
    <View style={styles.container}>
      <Input
        userInput={userInput}
        handleUserInput={handleUserInput}
        handleClear={() => setUserInput('')}
        handleBack={() => navigation.goBack()}
      />
      <List
        items={filteredProducts}
        navigation={navigation}
        to="Product Details"
        paramsKey="productId"
        listItemContainerStyles={styles.listItemContainer}
        paddingBottom={70}
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory,
    height: '100%',
    gap: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  listItemContainer: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
