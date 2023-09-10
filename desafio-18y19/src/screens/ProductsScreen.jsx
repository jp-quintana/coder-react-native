import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useGetProductsByCategoryQuery } from 'services/shopServices';

import Input from 'components/Input';
import List from 'components/List';

import { colors } from 'helpers/colors';

const ProductsScreen = ({ navigation }) => {
  const categorySelected = useSelector(
    (state) => state.shopReducer.categorySelected
  );

  const {
    data: selectedProducts,
    isLoading,
    error,
  } = useGetProductsByCategoryQuery(categorySelected);

  const [userInput, setUserInput] = useState('');

  const [filteredProducts, setFilteredProducts] = useState(null);

  const handleUserInput = (text) => {
    setUserInput(text);
  };

  useEffect(() => {
    if (selectedProducts) {
      setFilteredProducts(selectedProducts);
    }
  }, [isLoading]);

  useEffect(() => {
    if (selectedProducts) {
      const filtered = selectedProducts.filter((product) =>
        product.title.toLowerCase().includes(userInput.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [userInput]);

  return (
    <View style={styles.container}>
      {filteredProducts ? (
        <>
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
        </>
      ) : (
        <Text>Loading...</Text>
      )}
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
