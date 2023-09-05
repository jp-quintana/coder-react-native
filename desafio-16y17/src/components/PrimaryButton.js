import { Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import React from 'react';

import { Colors } from '../helpers/colors';

const PrimaryButton = ({ children, isAlt, isCancel, icon, onPress }) => {
  const buttonBackground = {
    backgroundColor: isAlt ? 'white' : isCancel ? Colors.text : Colors.primary,
  };
  const textColor = { color: isAlt ? Colors.primary : 'white' };
  return (
    <View style={[styles.container, buttonBackground]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.pressed : undefined,
        ]}
      >
        <View style={styles.content}>
          <Text style={[styles.text, textColor]}>{children}</Text>
          {icon}
        </View>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  pressed: {
    opacity: 0.8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: 12,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
