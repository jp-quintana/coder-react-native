import { StyleSheet, Text, Pressable, Image } from 'react-native';
import React from 'react';

import { useDispatch } from 'react-redux';
import {
  setCategorySelected,
  setProductSelected,
} from 'features/shop/shopSlice';

import { colors } from 'helpers/colors';

const ListItem = ({
  item,
  navigation,
  to,
  listItemContainerStyles,
  paramsKey,
}) => {
  const containerStyles = [styles.container, listItemContainerStyles];

  const dispatch = useDispatch();

  const handleNavigation = () => {
    if (to === 'Products') dispatch(setCategorySelected(item.id));
    if (to === 'Product Details') dispatch(setProductSelected(item.id));
    navigation.navigate(to, { [paramsKey]: item.id });
  };

  return (
    <Pressable
      onPress={navigation ? handleNavigation : undefined}
      style={containerStyles}
    >
      <Text style={styles.text}>{item.title}</Text>
      {item.thumbnail && (
        <Image style={styles.image} source={{ uri: item.thumbnail }} />
      )}
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.mauve,
  },
  text: {
    color: 'white',
    flex: 1,
    fontWeight: 700,
  },
  image: {
    height: '100%',
    width: '30%',
    borderRadius: 10,
  },
});
