import { StyleSheet, Text, Pressable, Image, Platform } from 'react-native';
import React from 'react';

import { Colors } from '../helpers/colors';

const CategoryButton = ({
  title,
  imageUrl,
  selectedCategory,
  isLastElement,
  onPress,
}) => {
  const selectedBorder =
    selectedCategory === title
      ? { borderWidth: 1, borderColor: Colors.primary }
      : undefined;

  const lastElementMargin = isLastElement ? { marginRight: 16 } : undefined;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, selectedBorder, lastElementMargin]}
    >
      <Image source={imageUrl} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    backgroundColor: '#fff',
    marginVertical: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
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
  icon: {
    height: 30,
    width: 30,
  },
  title: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});
