import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import React, { useLayoutEffect, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProfileImageQuery } from '../../services/shopServices';
import { useGetUserLocationQuery } from '../../services/shopServices';

import { setImage, setUserLocation } from '../../features/user/userSlice';

import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../helpers/colors';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profileImage, displayName, email, localId, location } = useSelector(
    (state) => state.userReducer
  );

  const { data: image } = useGetProfileImageQuery(localId);
  const { data: userLocationQuery } = useGetUserLocationQuery(localId);

  const cameraImage = image?.image;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={() => navigation.navigate('AddressSelectScreen')}>
            <Ionicons name="map" size={24} color="black" />
          </Pressable>
        );
      },
    });
  }, []);

  useEffect(() => {
    if (cameraImage) {
      dispatch(setImage(cameraImage));
    }
  }, [cameraImage]);

  useEffect(() => {
    if (userLocationQuery) {
      dispatch(setUserLocation(userLocationQuery));
    }
  }, [userLocationQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.user_container}>
        <View style={styles.image_button_container}>
          <Pressable
            onPress={() => navigation.navigate('ImageSelectScreen')}
            android_ripple={{ color: '#ccc' }}
            style={({ pressed }) => [pressed ? styles.pressed : undefined]}
          >
            {profileImage || cameraImage ? (
              <Image
                source={{ uri: profileImage || cameraImage }}
                style={styles.user_image}
              />
            ) : (
              <Image
                source={require('../../assets/images/portrait-placeholder.png')}
                style={styles.user_image}
              />
            )}
          </Pressable>
        </View>
        <Text style={styles.user_name}>{displayName}</Text>
        <View style={styles.user_content}>
          <View style={styles.user_item}>
            <Ionicons name="mail-outline" size={24} color={Colors.text} />
            <Text
              style={styles.user_item_text}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {email}
            </Text>
          </View>
          <View style={styles.user_item}>
            <Ionicons name="location-outline" size={24} color={Colors.text} />
            <Text
              style={styles.user_item_text}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {location.address
                ? location.address
                : userLocationQuery
                ? userLocationQuery.address
                : 'No address added yet'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.option}>
        <Pressable
          onPress={() => navigation.navigate('OrdersScreen')}
          android_ripple={{ color: '#ccc' }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressed : undefined,
          ]}
        >
          <Ionicons name="receipt-outline" size={24} color={Colors.text} />
          <Text style={styles.option_text}>Orders</Text>
          <Ionicons
            name="ios-chevron-forward"
            size={24}
            color={Colors.text}
            style={styles.chevron}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 12,
  },

  user_container: {
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 6,
    paddingVertical: 16,
    paddingHorizontal: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    marginBottom: 12,
  },
  image_button_container: {
    marginBottom: 10,
    borderRadius: 100,
    overflow: 'hidden',
  },
  user_image: {
    height: 75,
    width: 75,
  },
  user_name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  user_content: {
    width: '100%',
  },
  user_item: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 6,
  },
  user_item_text: {
    color: Colors.text,
  },
  option: {
    elevation: 4,
    shadowColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 16,
  },
  option_text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  chevron: {
    marginLeft: 'auto',
  },
  pressed: {
    opacity: 0.8,
  },
});
