import { Image, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import AddButton from 'components/AddButton';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { colors } from 'helpers/colors';
import { useGetProfileImageQuery } from 'services/shopServices';

const UserProfileScreen = ({ navigation }) => {
  const { localId, profileImage } = useSelector((state) => state.userReducer);

  const { data: image } = useGetProfileImageQuery(localId);

  const cameraImage = image?.image;

  const launchCamera = async () => {
    navigation.navigate('Image Selector');
  };

  const launchLocation = async () => {
    navigation.navigate('Address');
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          profileImage || cameraImage
            ? { uri: profileImage || cameraImage }
            : require('../../assets/images/defaultProfile.png')
        }
        style={styles.image}
        resizeMode="cover"
      />
      <AddButton onPress={launchCamera} title="Add profile picture" />
      <AddButton onPress={launchLocation} title="My address" />
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory,
    height: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 15,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
