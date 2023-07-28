import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

import { useSelector } from 'react-redux';

import { useCart } from 'hooks/useCart';

import { colors } from 'helpers/colors';

const ProductDetailScreen = ({ navigation }) => {
  const { addItem } = useCart();

  const selectedProduct = useSelector(
    (state) => state.shopReducer.selectedProduct
  );

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
          <View style={styles.controls}>
            <Pressable
              style={styles.button}
              onPress={() => addItem(selectedProduct)}
            >
              <Text style={styles.button_text}>Add to Cart</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.button_text}>Go back</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory,
    height: '100%',
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
  controls: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.mauve,
  },
  button_text: {
    color: '#fff',
    fontWeight: 700,
  },
});
