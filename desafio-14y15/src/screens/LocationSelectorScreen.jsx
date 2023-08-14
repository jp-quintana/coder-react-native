import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import AddButton from 'components/AddButton';
import { usePostUserLocationMutation } from 'services/shopServices';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation } from 'features/user/userSlice';
import { colors } from 'helpers/colors';
import MapPreview from 'components/MapPreview';
import { google_maps_api_key } from 'db/firebaseConfig';

const LocationSelectorScreen = ({ navigation }) => {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [error, setError] = useState('');

  const [address, setAddress] = useState('');

  const [triggerPostUserLocation, resultPostUserLocation] =
    usePostUserLocationMutation();
  const { localId } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  console.log(location);

  const onConfirmAddress = () => {
    const locationFormatted = {
      latitude: location.latitude,
      longitude: location.longitude,
      address,
    };

    console.log(locationFormatted);

    dispatch(setUserLocation(locationFormatted));

    triggerPostUserLocation({
      location: locationFormatted,
      localId,
    });

    navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
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
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (location.latitude) {
          const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${google_maps_api_key}`;
          const response = await fetch(url_reverse_geocode);
          const data = await response.json();

          console.log('aca', data);
          setAddress(data.results[0].formatted_address);
        }
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [location]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Address</Text>
      {location ? (
        <>
          <Text style={styles.text}>
            Lat: {location.latitude}, long: {location.longitude}.
          </Text>
          <MapPreview location={location} />
          <Text style={styles.address}>Formatted address: {address}</Text>
          <AddButton onPress={onConfirmAddress} title="Confirm address" />
        </>
      ) : (
        <>
          <View style={styles.no_location_container}>
            <Text>{error}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default LocationSelectorScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory,
    height: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  text: {
    paddingTop: 20,
    fontSize: 18,
  },
  no_location_container: {
    width: 200,
    height: 200,
    borderWidth: 2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  address: {
    padding: 10,
    fontSize: 16,
  },
});
