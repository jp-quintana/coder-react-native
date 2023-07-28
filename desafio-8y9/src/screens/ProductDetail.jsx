import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useState, useEffect } from 'react';

import products from 'data/products.json';

import { colors } from 'helpers/colors';

const ProductDetail = ({ navigation, route }) => {
  const { productId } = route.params;
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    setSelectedProduct(selectedProduct);
  }, []);

  return (
    <View style={styles.container}>
      {selectedProduct && (
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={{ uri: selectedProduct.thumbnail }}
            resizeMode="cover"
          />
          <Text>{selectedProduct.title}</Text>
          <Text>{selectedProduct.description}</Text>
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.button_text}>Go back</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory,
    gap: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  content: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.mauve,
  },
  button_text: {
    color: '#fff',
    fontWeight: 700,
  },
});
