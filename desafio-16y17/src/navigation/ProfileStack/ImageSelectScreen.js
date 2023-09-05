import { Image, View, StyleSheet, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import { usePostProfileImageMutation } from '../../services/shopServices';
import { setImage } from '../../features/user/userSlice';

import PrimaryButton from '../../components/PrimaryButton';

import { Colors } from '../../helpers/colors';

const ImageSelectScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { localId, profileImage } = useSelector((state) => state.userReducer);

  const [image, setImage] = useState(profileImage);

  const [triggerSaveImage] = usePostProfileImageMutation();

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermissions();

    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const confirmImage = async () => {
    if (image && image !== profileImage) {
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
          const response = await MediaLibrary.createAssetAsync(image);
          triggerSaveImage({
            image: response.uri,
            localId,
          });
          dispatch(setImage(response.uri));
        }
      } catch (error) {
        console.log(error);
      }
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.image_button_container}>
        <Pressable
          onPress={pickImage}
          android_ripple={{ color: '#ccc' }}
          style={({ pressed }) => [pressed ? styles.pressed : undefined]}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Image
              source={require('../../assets/images/portrait-placeholder.png')}
              style={styles.image}
            />
          )}
        </Pressable>
      </View>
      <Text style={styles.preview}>Preview</Text>
      <View style={styles.buttons_container}>
        <PrimaryButton onPress={confirmImage}>Confirm</PrimaryButton>
        <PrimaryButton onPress={() => navigation.goBack()} isCancel={true}>
          Cancel
        </PrimaryButton>
      </View>
    </View>
  );
};

export default ImageSelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  preview: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 6,
    marginBottom: 36,
  },
  image_button_container: {
    borderRadius: 200,
    overflow: 'hidden',
  },
  image: {
    height: 240,
    width: 240,
  },
  buttons_container: {
    width: '100%',
    gap: 24,
  },
  pressed: {
    opacity: 0.8,
  },
});
