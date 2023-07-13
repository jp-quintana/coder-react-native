import { StyleSheet, Text, Pressable, Image } from 'react-native';
import React from 'react';

import { colors } from 'helpers/colors';

const ListItem = ({ item, handleSelect, listItemContainerStyles }) => {
  const containerStyles = [styles.container, listItemContainerStyles];

  return (
    <Pressable
      onPress={handleSelect ? () => handleSelect(item) : undefined}
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
