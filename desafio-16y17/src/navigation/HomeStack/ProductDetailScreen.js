import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useState, useLayoutEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { usePostFavoritesMutation } from '../../services/shopServices';

import { addItem } from '../../features/cart/cartSlice';
import {
  favoriteProduct,
  unfavoriteProduct,
} from '../../features/user/userSlice';

import PrimaryButon from '../../components/PrimaryButton';

import { Colors } from '../../helpers/colors';
import { formatPrice } from '../../helpers/format';

const ProductDetailScreen = ({ navigation, route }) => {
  const { favorites, localId } = useSelector((state) => state.userReducer);
  const { products } = useSelector((state) => state.shopReducer);
  const dispatch = useDispatch();

  const { selectedProductId } = route.params;

  const [selectedProduct, setSelectedProduct] = useState(null);

  [triggerFavorite, { isLoading: favoriteIsLoading }] =
    usePostFavoritesMutation();

  const handleAddItem = () => {
    dispatch(addItem({ itemToAdd: selectedProduct }));
    navigation.navigate('Cart');
  };

  // const handleFavorite = async (isFavorite) => {
  //   try {
  //     if (isFavorite) {
  //       dispatch(unfavoriteProduct(selectedProductId));
  //       const updatedFavorites = favorites.filter(
  //         (favorite) => favorite !== selectedProductId
  //       );
  //       await triggerFavorite({ favorites: updatedFavorites, localId });
  //     } else {
  //       dispatch(favoriteProduct(selectedProductId));
  //       const updatedFavorites = [...favorites, selectedProductId];
  //       await triggerFavorite({ favorites: updatedFavorites, localId });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  let debounceTimer;

  const handleFavorite = async (isFavorite) => {
    clearTimeout(debounceTimer);
    try {
      let updatedFavorites;
      if (isFavorite) {
        dispatch(unfavoriteProduct(selectedProductId));
        updatedFavorites = favorites.filter(
          (favorite) => favorite !== selectedProductId
        );
      } else {
        dispatch(favoriteProduct(selectedProductId));
        updatedFavorites = [...favorites, selectedProductId];
      }
      debounceTimer = setTimeout(async () => {
        await triggerFavorite({ favorites: updatedFavorites, localId });
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    const selected = products.find(
      (product) => product.id === selectedProductId
    );
    const capitalizedTitle =
      selected.title.charAt(0).toUpperCase() + selected.title.slice(1);
    navigation.setOptions({
      title: capitalizedTitle,
    });
    setSelectedProduct(selected);
  }, []);

  useLayoutEffect(() => {
    const isFavorite = favorites.includes(selectedProductId);
    navigation.setOptions({
      headerRight: () => {
        return (
          // <>
          //   {favoriteIsLoading && (
          //     <ActivityIndicator size="small" color={Colors.text} />
          //   )}
          //   {!favoriteIsLoading && (
          //     <Pressable onPress={() => handleFavorite(isFavorite)}>
          //       <Ionicons
          //         name={isFavorite ? 'heart' : 'heart-outline'}
          //         size={24}
          //         color={isFavorite ? Colors.primary : Colors.text}
          //       />
          //     </Pressable>
          //   )}
          // </>
          <>
            <Pressable onPress={() => handleFavorite(isFavorite)}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? Colors.primary : Colors.text}
              />
            </Pressable>
          </>
        );
      },
    });
  }, [favorites, favoriteIsLoading]);

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
              <PrimaryButon onPress={handleAddItem}>Add To Cart</PrimaryButon>
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
