import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import AddButton from 'components/AddButton';
import AddressItem from 'components/AddressItem';
import { useGetUserLocationQuery } from 'services/shopServices';
import { colors } from 'helpers/colors';

const AddressScreen = ({ navigation }) => {
  const { location, localId } = useSelector((state) => state.userReducer);
  const {
    data: userLocationQuery,
    isError,
    isLoading,
  } = useGetUserLocationQuery(localId);

  /*     console.log(userLocationQuery);

    let locationQueryFormatted = {
        location: userLocationQuery
    } */

  return location?.latitude || userLocationQuery ? (
    <AddressItem
      location={location.latitude ? location : userLocationQuery}
      navigation={navigation}
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>No location set</Text>
      <AddButton
        title="Set location"
        onPress={() => navigation.navigate('Location Selector')}
      />
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory,
    height: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    // gap: 20,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  text: {
    paddingVertical: 20,
    fontSize: 18,
  },
});
