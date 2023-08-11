import React, { useState } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AddButton from 'components/AddButton';
import { colors } from 'helpers/colors';
import * as MediaLibrary from 'expo-media-library';
import { usePostProfileImageMutation } from 'services/shopServices';
import { useDispatch, useSelector } from 'react-redux';
import { saveImage } from 'features/user/userSlice';

const ImageSelectorScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const [triggerSaveImage, resultSaveImage] = usePostProfileImageMutation();
  const dispatch = useDispatch();
  const { localId } = useSelector((state) => state.userReducer);

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
        //base64: true,
        quality: 1,
      });

      console.log(result.assets);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const confirmImage = async () => {
    try {
      // Request device storage access permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const response = await MediaLibrary.createAssetAsync(image);
        console.log('aca', localId);
        triggerSaveImage({
          image: response.uri,
          localId,
        });
        dispatch(saveImage(response.uri));
      }
    } catch (error) {
      console.log(error);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <AddButton title="Take another photo" onPress={pickImage} />
          <AddButton title="Confirm photo" onPress={confirmImage} />
        </>
      ) : (
        <>
          <View style={styles.no_photo_container}>
            <Text>No photo to show...</Text>
          </View>
          <AddButton title="Take a photo" onPress={pickImage} />
        </>
      )}
    </View>
  );
};

export default ImageSelectorScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory,
    height: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    gap: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  no_photo_container: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: colors.red,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
