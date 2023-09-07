import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { useState, useLayoutEffect, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { usePostFavoritesMutation } from '../../services/shopServices';

import { addItem } from '../../features/cart/cartSlice';
import {
  favoriteProduct,
  unfavoriteProduct,
} from '../../features/user/userSlice';

import PrimaryButton from '../../components/PrimaryButton';

import { Colors } from '../../helpers/colors';
import { formatPrice } from '../../helpers/format';

const ProductDetailScreen = ({ navigation, route }) => {
  const { favorites, localId } = useSelector((state) => state.userReducer);
  const { products } = useSelector((state) => state.shopReducer);
  const dispatch = useDispatch();

  const { selectedProductId } = route.params;

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [triggerFavorite, { isLoading: favoriteIsLoading }] =
    usePostFavoritesMutation();

  const handleAddItem = () => {
    dispatch(addItem({ itemToAdd: selectedProduct }));
    navigation.navigate('Cart');
  };

  let timer;

  const handleFavorite = (isFavorite) => {
    clearTimeout(timer);
    try {
      let updatedFavorites;
      if (isFavorite) {
        updatedFavorites = favorites.filter(
          (favorite) => favorite !== selectedProductId
        );
        dispatch(unfavoriteProduct(selectedProductId));
      } else {
        updatedFavorites = [...favorites, selectedProductId];
        dispatch(favoriteProduct(selectedProductId));
      }
      timer = setTimeout(async () => {
        await triggerFavorite({ favorites: updatedFavorites, localId });
      }, 100);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const selected = products.find(
      (product) => product.id === selectedProductId
    );
    const capitalizedTitle =
      selected.title.charAt(0).toUpperCase() + selected.title.slice(1);
    navigation.setOptions({
      title: capitalizedTitle,
    });
    setSelectedProduct(selected);
  }, [selectedProductId]);

  useLayoutEffect(() => {
    const isFavorite = favorites.includes(selectedProductId);
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={() => handleFavorite(isFavorite)}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? Colors.primary : Colors.text}
            />
          </Pressable>
        );
      },
    });
  }, [favorites, favoriteIsLoading, selectedProductId]);

  return (
    <View style={styles.container}>
      {!selectedProduct && <Text style={styles.loading}>Loading...</Text>}
      {selectedProduct && (
        <>
          <Image
            source={{ uri: selectedProduct.imageUrl }}
            style={styles.image}
          />
          <ScrollView style={styles.scroll_view}>
            <View style={styles.details_container}>
              <View style={styles.title_price_container}>
                <Text
                  style={styles.title}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {selectedProduct.title}
                </Text>
                <Text style={styles.price}>{`$ ${formatPrice(
                  selectedProduct.price
                )}`}</Text>
              </View>
              <Text style={styles.description}>
                {selectedProduct.description}
              </Text>
              <PrimaryButton onPress={handleAddItem}>Add To Cart</PrimaryButton>
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
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 24,
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
  loading: {
    textAlign: 'center',
  },
});
