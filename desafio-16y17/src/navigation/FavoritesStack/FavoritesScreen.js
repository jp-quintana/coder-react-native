import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.no_favorites}>You have no favorites yet!</Text>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  no_favorites: {
    textAlign: 'center',
  },
});
