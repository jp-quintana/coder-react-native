import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';

import ProductCard from './ProductCard';

const ProductCardList = ({ products }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item, index }) => (
          <ProductCard
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            price={item.price}
            isLastElement={index === products.length - 1}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductCardList;

const styles = StyleSheet.create({
  container: {
    height: 280,
  },
});
