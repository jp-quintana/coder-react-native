import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.no_notifications}>
        You have no new notifications!
      </Text>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  no_notifications: {
    textAlign: 'center',
  },
});
