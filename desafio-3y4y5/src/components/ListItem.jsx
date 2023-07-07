import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';

const ListItem = ({ item, handleSelect }) => {
  const containerStyle = [
    styles.container,
    { backgroundColor: item.isCompleted ? 'green' : 'red' },
  ];

  return (
    <Pressable onPress={() => handleSelect(item)} style={containerStyle}>
      <Text style={styles.text}>{item.name}</Text>
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    color: 'white',
    fontWeight: 700,
  },
});
