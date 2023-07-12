import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';

import { colors } from 'helpers/colors';

const ListItem = ({ item, handleSelect }) => {
  const containerStyle = [styles.container];

  return (
    <Pressable
      onPress={handleSelect ? () => handleSelect(item) : undefined}
      style={containerStyle}
    >
      <Text style={styles.text}>{item.title}</Text>
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
    fontWeight: 700,
  },
});
