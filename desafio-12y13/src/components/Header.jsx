import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { colors } from 'helpers/colors';

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Header</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1.3,
    backgroundColor: colors.darkPurple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontFamily: 'Inter-Bold',
  },
});
