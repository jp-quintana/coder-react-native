import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../helpers/colors';
import { formatPrice } from '../helpers/format';

const CartItem = ({
  item,
  onPressAdd,
  onPressRemove,
  onPressDelete,
  isFirstElement,
  isLastElement,
}) => {
  const { id, title, price, imageUrl, quantity } = item;
  const navigation = useNavigation();

  const firstElementMargin = isFirstElement ? { marginTop: 24 } : undefined;
  const lastElementMargin = isLastElement ? { marginBottom: 240 } : undefined;

  return (
    <View style={[styles.container, firstElementMargin, lastElementMargin]}>
      <Pressable
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'ProductDetailScreen',
            params: { selectedProductId: id },
          })
        }
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.pressed : undefined,
        ]}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.details_container}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.price}>{`$ ${formatPrice(price)}`}</Text>
        </View>
        <View style={styles.controls_container}>
          <View style={styles.button_container}>
            <Pressable
              onPress={() => onPressDelete(id)}
              android_ripple={{ color: '#ccc' }}
              style={({ pressed }) => [
                styles.delete_button,
                pressed ? styles.pressed : undefined,
              ]}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color="#fff"
                style={styles.delete_icon}
              />
            </Pressable>
          </View>
          <View style={styles.add_remove_container}>
            <View style={styles.button_container}>
              <Pressable
                onPress={() => onPressRemove(id)}
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => [
                  styles.remove_button,
                  pressed ? styles.pressed : undefined,
                ]}
              >
                <Ionicons
                  name="remove"
                  size={20}
                  color="#fff"
                  style={styles.add_remove_icon}
                />
              </Pressable>
            </View>
            <View style={styles.quantity_container}>
              <Text style={styles.quantity}>{quantity}</Text>
            </View>
            <View style={styles.button_container}>
              <Pressable
                onPress={() => onPressAdd(item)}
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => [
                  styles.add_button,
                  pressed ? styles.pressed : undefined,
                ]}
              >
                <Ionicons
                  name="add"
                  size={20}
                  color="#fff"
                  style={styles.add_remove_icon}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: '#fff',
    marginVertical: 6,
    marginHorizontal: 4,
    borderRadius: 20,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flexDirection: 'row',
    height: '100%',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  image: {
    flex: 0.25,
    height: '100%',
    borderRadius: 15,
  },
  details_container: {
    flex: 0.35,
    height: '100%',
  },
  title: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.text,
  },
  price: {
    marginTop: 'auto',
    fontWeight: 'bold',
    fontSize: 18,
  },
  controls_container: {
    flex: 0.4,
    alignItems: 'flex-end',
    height: '100%',
  },
  add_remove_container: {
    flexDirection: 'row',
    marginTop: 'auto',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.primary,
    gap: 3,
  },
  button_container: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  delete_icon: {
    padding: 6,
    backgroundColor: Colors.text,
  },
  add_remove_icon: {
    padding: 6,
  },
  quantity_container: {
    minWidth: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    position: 'absolute',
    color: '#fff',
  },
  pressed: {
    opacity: 0.8,
  },
});
