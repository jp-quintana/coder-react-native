import { Image, View, StyleSheet, Text, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';

import * as Location from 'expo-location';

import MapPreview from '../../components/MapPreview';

import { useSelector, useDispatch } from 'react-redux';

import { setUserLocation } from '../../features/user/userSlice';
import { usePostUserLocationMutation } from '../../services/shopServices';
import { google_maps_api_key } from '../../db/config';

import PrimaryButton from '../../components/PrimaryButton';

import { Colors } from '../../helpers/colors';

const AddressSelectScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { localId } = useSelector((state) => state.userReducer);

  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [triggerPostUserLocation] = usePostUserLocationMutation();

  const onConfirmAddress = () => {
    const locationFormatted = {
      latitude: location.latitude,
      longitude: location.longitude,
      address,
    };

    dispatch(setUserLocation(locationFormatted));

    triggerPostUserLocation({
      location: locationFormatted,
      localId,
    });

    navigation.goBack();
  };

  const requestLocationPermission = async () => {
    setIsLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setIsLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (location.latitude) {
          const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${google_maps_api_key}`;
          const response = await fetch(url_reverse_geocode);
          const data = await response.json();

          setAddress(data.results[0].formatted_address);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [location]);

  return (
    <View style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && (
        <>
          {error && <Text style={styles.error}>{error}</Text>}
          {!error && (
            <>
              <MapPreview location={location} />
              <View style={styles.location_text_container}>
                <Text style={styles.location}>Lat: {location.latitude}</Text>
                <Text style={styles.location}>Long: {location.longitude}</Text>
                <Text style={styles.location}>Address: {address}</Text>
              </View>
            </>
          )}
          <View style={styles.buttons_container}>
            {error && (
              <PrimaryButton onPress={requestLocationPermission}>
                Grant Access
              </PrimaryButton>
            )}
            {!error && (
              <PrimaryButton onPress={onConfirmAddress}>Confirm</PrimaryButton>
            )}
            <PrimaryButton onPress={() => navigation.goBack()} isCancel={true}>
              Cancel
            </PrimaryButton>
          </View>
        </>
      )}
    </View>
  );
};

export default AddressSelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  error: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 6,
    marginBottom: 36,
  },
  image: {
    height: 240,
    width: 240,
  },
  location_text_container: {
    gap: 6,
    marginVertical: 18,
  },
  buttons_container: {
    width: '100%',
    gap: 24,
  },
  pressed: {
    opacity: 0.8,
  },
});
