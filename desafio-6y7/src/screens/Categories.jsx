import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import List from 'components/List';

import { colors } from 'helpers/colors';

const Categories = ({ categories, handleSelectCategory }) => {
  const formattedCategories = categories.map((title) => ({
    id: title,
    title: title.charAt(0).toUpperCase() + title.slice(1),
  }));

  return (
    <View style={styles.container}>
      <List items={formattedCategories} handleSelect={handleSelectCategory} />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory,
    height: '85%',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
