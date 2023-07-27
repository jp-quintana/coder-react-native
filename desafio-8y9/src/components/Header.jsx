import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { colors } from 'helpers/colors';

const Header = ({ title }) => {
  console.log('working');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkPurple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontFamily: 'Inter-Bold',
    paddingTop: 20,
    paddingBottom: 20,
  },
});
