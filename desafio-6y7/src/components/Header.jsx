import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { colors } from 'helpers/colors';

const Header = ({ screen }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{screen.toUpperCase()}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: '15%',
    backgroundColor: colors.darkPurple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 700,
    color: colors.white,
  },
});
