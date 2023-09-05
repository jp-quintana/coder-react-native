import { StyleSheet, Text, View, Platform, Pressable } from 'react-native';
import React from 'react';

import { Colors } from '../helpers/colors';
import { formatDate } from '../helpers/format';

const OrderItem = ({ id, items, createdAt }) => {
  let summaryContent = '';

  if (items.length === 1) summaryContent = items[0].title;
  if (items.length > 1) summaryContent = `${items[0].title}, ${items[1].title}`;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => {}}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {`Order ${id}`}
            </Text>
            <Text style={styles.createdAt}>{formatDate(createdAt)}</Text>
          </View>
          <Text style={styles.summary} numberOfLines={1} ellipsizeMode="tail">
            {summaryContent}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginVertical: 6,
    marginHorizontal: 4,
    borderRadius: 20,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontWeight: 'bold',
  },
  summary: {
    fontWeight: 'bold',
    color: Colors.text,
    textTransform: 'capitalize',
  },
});
