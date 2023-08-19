import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';

import ListItem from './ListItem';

const List = ({
  items,
  navigation,
  to,
  paramsKey,
  listItemContainerStyles,
  paddingBottom,
}) => {
  const renderItem = ({ item }) => {
    return (
      <ListItem
        item={item}
        navigation={navigation}
        to={to}
        paramsKey={paramsKey}
        listItemContainerStyles={listItemContainerStyles}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom }}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
