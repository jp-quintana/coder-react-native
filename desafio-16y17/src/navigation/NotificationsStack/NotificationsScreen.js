import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

import { useSelector } from 'react-redux';

import NotificationItem from '../../components/NotificationItem';

const NotificationsScreen = () => {
  const { notifications } = useSelector((state) => state.notificationReducer);

  return (
    <View style={styles.container}>
      {notifications.length === 0 && (
        <Text style={styles.no_notifications}>
          You have no new notifications!
        </Text>
      )}
      {notifications.length > 0 && (
        <FlatList
          data={notifications}
          renderItem={({ item, index }) => (
            <NotificationItem
              id={item.id}
              title={item.title}
              description={item.description}
              createdAt={item.createdAt}
              isLastElement={index === notifications.length - 1}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
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
