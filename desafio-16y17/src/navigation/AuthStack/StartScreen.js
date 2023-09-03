import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../helpers/colors';
import { Ionicons } from '@expo/vector-icons';

import Button from '../../components/Button';

const StartScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/start-screen.jpg')}
        style={styles.image}
      />
      <View style={styles.content_container}>
        <Text style={styles.title}>La Cucini</Text>
        <Text style={styles.subtitle}>
          The best Italian food delivered to your home{' '}
        </Text>
        <Button
          isAlt={true}
          icon={
            <Ionicons name="arrow-forward" size={20} color={Colors.primary} />
          }
        >
          Get started
        </Button>
      </View>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  content_container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 46,
    fontWeight: 'bold',
    color: Colors.title,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 48,
    lineHeight: 32,
  },
});
