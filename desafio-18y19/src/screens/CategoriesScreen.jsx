import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import List from 'components/List';
import { useGetCategoriesQuery } from 'services/shopServices';

import { colors } from 'helpers/colors';

const CategoriesScreen = ({ navigation }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  const [formattedCategories, setFormattedCategories] = useState(null);

  useEffect(() => {
    if (categories) {
      const formattedCategories = categories.map((title) => ({
        id: title,
        title: title.charAt(0).toUpperCase() + title.slice(1),
      }));

      setFormattedCategories(formattedCategories);
    }
  }, [isLoading]);

  return (
    <View style={styles.container}>
      {formattedCategories ? (
        <List
          items={formattedCategories}
          navigation={navigation}
          to="Products"
          paramsKey={'category'}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory,
    height: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
