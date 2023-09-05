import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { google_maps_api_key } from '../db/config';

const MapPreview = ({ location }) => {
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=13&size=300x300&maptype=roadmap&markers=color:red%7Clabel:Me%7C${location.latitude},${location.longitude}&key=${google_maps_api_key}`;

  return <Image style={styles.map_image} source={{ uri: mapPreviewUrl }} />;
};

export default MapPreview;

const styles = StyleSheet.create({
  map_image: {
    width: 240,
    height: 240,
  },
});
