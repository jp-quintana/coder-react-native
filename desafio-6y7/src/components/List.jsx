import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';

import ListItem from './ListItem';

const List = ({
  items,
  handleSelect,
  listItemContainerStyles,
  paddingBottom,
}) => {
  const renderItem = ({ item }) => {
    return (
      <ListItem
        item={item}
        handleSelect={handleSelect}
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
