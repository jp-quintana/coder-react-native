import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import React from 'react';

import { Colors } from '../helpers/colors';

const ProductCard = ({ id, title, imageUrl, price, isLastElement }) => {
  const lastElementMargin = isLastElement ? { marginRight: 16 } : undefined;

  const route = useRoute();
  const navigation = useNavigation();

  const navArgs = [];

  if (route.name === 'HomeScreen')
    navArgs.push('ProductDetailScreen', { selectedProductId: id });
  return (
    <View style={[styles.container, lastElementMargin]}>
      <Pressable
        onPress={() => navigation.navigate(...navArgs)}
        style={styles.button}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.content_container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{`$${price}`}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    width: 180,
    backgroundColor: '#fff',
    marginVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    borderRadius: 20,
    overflow: 'hidden',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  image: {
    flex: 0.6,
  },
  content_container: {
    flex: 0.4,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  title: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: Colors.text,
    fontSize: 14,
  },
  price: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginTop: 'auto',
    fontSize: 20,
  },
});
