import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import List from 'components/List';

import { colors } from 'helpers/colors';

import categories from 'data/categories.json';

const Categories = ({ navigation }) => {
  const formattedCategories = categories.map((title) => ({
    id: title,
    title: title.charAt(0).toUpperCase() + title.slice(1),
  }));

  return (
    <View style={styles.container}>
      <List
        items={formattedCategories}
        navigation={navigation}
        to={'Products'}
        paramsKey={'category'}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
