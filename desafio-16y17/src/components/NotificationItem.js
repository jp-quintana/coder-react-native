import { StyleSheet, Text, View, Platform } from 'react-native';
import React from 'react';

import { Colors } from '../helpers/colors';

import { formatDate, formatPrice } from '../helpers/format';

const NotificationItem = ({ title, createdAt, description, isLastElement }) => {
  const lastElementMargin = isLastElement ? { marginBottom: 128 } : undefined;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
        <Text>{formatDate(createdAt)}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginVertical: 6,
    marginHorizontal: 4,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 3,
  },
  title: { flexShrink: 1, fontWeight: 'bold' },
  description: {
    fontWeight: 'bold',
    color: Colors.text,
  },
});
