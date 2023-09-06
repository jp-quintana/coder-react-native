import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { useGetFavoritesQuery } from '../../services/shopServices';

import { useSelector } from 'react-redux';

const FavoritesScreen = () => {
  const { localId } = useSelector((state) => state.userReducer);
  // const { data: fetchedFavorites, isLoading: favoritedBeingFetched } =
  //   useGetFavoritesQuery(localId);
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
