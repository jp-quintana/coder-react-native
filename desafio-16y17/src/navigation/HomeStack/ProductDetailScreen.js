import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useState, useLayoutEffect, useEffect } from 'react';

import { useSelector } from 'react-redux';

import PrimaryButon from '../../components/PrimaryButton';

import { Colors } from '../../helpers/colors';

const ProductDetailScreen = ({ navigation, route }) => {
  const { products } = useSelector((state) => state.shopReducer);

  const { selectedProductId } = route.params;

  const [selectedProduct, setSelectedProduct] = useState(null);

  useLayoutEffect(() => {
    const selected = products.find(
      (product) => product.id === selectedProductId
    );
    const capitalizedTitle =
      selected.title.charAt(0).toUpperCase() + selected.title.slice(1);
    navigation.setOptions({
      title: capitalizedTitle,
      // headerTitleStyle: { textTransform: 'capitalize' },
    });
    setSelectedProduct(selected);
  }, []);

  return (
    <View style={styles.container}>
      {!selectedProduct && <Text>Loading...</Text>}
      {selectedProduct && (
        <>
          <Image
            source={{ uri: selectedProduct.imageUrl }}
            style={styles.image}
          />
          <ScrollView style={styles.scroll_view}>
            <View style={styles.details_container}>
              <View style={styles.title_price_container}>
                <Text style={styles.title}>{selectedProduct.title}</Text>
                <Text style={styles.price}>{`$${selectedProduct.price}`}</Text>
              </View>
              <Text style={styles.description}>
                {selectedProduct.description}
              </Text>
              <PrimaryButon onPress={() => console.log('Pressed')}>
                Add To Cart
              </PrimaryButon>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 0.5,
  },
  scroll_view: {
    flex: 0.5,
  },
  details_container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 96,
  },
  title_price_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flex: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 28,
    marginBottom: 40,
  },
});
