import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { google_maps_api_key } from 'db/firebaseConfig';

const MapPreview = ({ location }) => {
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=13&size=300x300&maptype=roadmap&markers=color:red%7Clabel:Me%7C${location.latitude},${location.longitude}&key=${google_maps_api_key}`;

  console.log(mapPreviewUrl);

  return (
    <View style={styles.mapPreview}>
      <Image style={styles.map_image} source={{ uri: mapPreviewUrl }} />
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map_image: {
    width: 300,
    height: 300,
  },
});
