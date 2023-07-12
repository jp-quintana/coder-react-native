import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';

import Input from 'components/Input';
import List from 'components/List';

import { colors } from 'helpers/colors';

const Products = ({ selectedProducts, handleBack }) => {
  const [userInput, setUserInput] = useState('');
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
        handleBack={handleBack}
      />
      <List items={filteredProducts} />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory,
    height: '85%',
    gap: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
