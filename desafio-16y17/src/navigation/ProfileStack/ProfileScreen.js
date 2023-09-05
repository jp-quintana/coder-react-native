import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  Modal,
} from 'react-native';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProfileImageQuery } from '../../services/shopServices';
import { useGetUserLocationQuery } from '../../services/shopServices';

import {
  setImage,
  setUserLocation,
  logout,
} from '../../features/user/userSlice';

import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../helpers/colors';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profileImage, displayName, email, localId, location } = useSelector(
    (state) => state.userReducer
  );

  const [modalVisible, setModalVisible] = useState(false);

  const { data: userImageQueryObject, isLoading: imageIsLoading } =
    useGetProfileImageQuery(localId);
  const { data: userLocationQuery, isLoading: locationIsLoading } =
    useGetUserLocationQuery(localId);

  const userImageQuery = userImageQueryObject?.image;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={() => setModalVisible(true)}>
            <Ionicons name="options" size={24} color="black" />
          </Pressable>
        );
      },
    });
  }, []);

  useEffect(() => {
    if (userImageQuery) {
      dispatch(setImage(userImageQuery));
    }
  }, [userImageQuery]);

  useEffect(() => {
    if (userLocationQuery) {
      dispatch(setUserLocation(userLocationQuery));
    }
  }, [userLocationQuery]);

  const handleNavigateToImageSelect = () => {
    if (modalVisible) {
      setModalVisible(false);
    }
    navigation.navigate('ImageSelectScreen');
  };

  return (
    <View style={styles.screen}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.backdrop}
        ></Pressable>
        <View style={styles.modalView}>
          <View style={styles.image_button_container}>
            <Pressable
              onPress={handleNavigateToImageSelect}
              android_ripple={{ color: '#ccc' }}
              style={({ pressed }) => [pressed ? styles.pressed : undefined]}
            >
              {userImageQuery || profileImage ? (
                <Image
                  source={{ uri: profileImage || userImageQuery }}
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
                style={[styles.user_item_text, { flexShrink: 1 }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {location.address
                  ? location.address
                  : userLocationQuery
                  ? userLocationQuery.address
                  : 'No address added yet'}
              </Text>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('AddressSelectScreen');
                }}
              >
                <Ionicons
                  name="md-pencil-sharp"
                  size={24}
                  color={Colors.primary}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        {(imageIsLoading || locationIsLoading) && (
          <Text style={styles.loading}>Loading...</Text>
        )}
        {!imageIsLoading && !locationIsLoading && (
          <>
            <View style={styles.user_container}>
              <View style={styles.image_button_container}>
                <Pressable
                  onPress={handleNavigateToImageSelect}
                  android_ripple={{ color: '#ccc' }}
                  style={({ pressed }) => [
                    pressed ? styles.pressed : undefined,
                  ]}
                >
                  {userImageQuery || profileImage ? (
                    <Image
                      source={{ uri: profileImage || userImageQuery }}
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
                  <Ionicons
                    name="location-outline"
                    size={24}
                    color={Colors.text}
                  />
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
                <Ionicons
                  name="receipt-outline"
                  size={24}
                  color={Colors.text}
                />
                <Text style={styles.option_text}>Orders</Text>
                <Ionicons
                  name="ios-chevron-forward"
                  size={24}
                  color={Colors.text}
                  style={styles.chevron}
                />
              </Pressable>
            </View>

            <View style={styles.option}>
              <Pressable
                onPress={() => dispatch(logout())}
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => [
                  styles.button,
                  pressed ? styles.pressed : undefined,
                ]}
              >
                <Ionicons
                  name="log-out-outline"
                  size={24}
                  color={Colors.text}
                />
                <Text style={styles.option_text}>Logout</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    position: 'relative',
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
  },
  modalView: {
    marginTop: 42,
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 12,
    position: 'relative',
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
    width: '100%',
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
  loading: {
    textAlign: 'center',
  },
});
