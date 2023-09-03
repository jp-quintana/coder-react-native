import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../helpers/colors';

const ProfileScreen = ({ navigation }) => {
  const user = false;
  return (
    <View style={styles.container}>
      <View style={styles.user_container}>
        {user ? (
          <View></View>
        ) : (
          <Image
            source={require('../../assets/images/portrait-placeholder.png')}
            style={styles.user_image}
          />
        )}
        <Text style={styles.user_name}>Jp Quintana</Text>
        <View style={styles.user_content}>
          <View style={styles.user_item}>
            <Ionicons name="mail-outline" size={24} color={Colors.text} />
            <Text style={styles.user_item_text}>Mail</Text>
          </View>
          <View style={styles.user_item}>
            <Ionicons name="location-outline" size={24} color={Colors.text} />
            <Text style={styles.user_item_text}>Address</Text>
          </View>
        </View>
      </View>
      <View style={styles.option}>
        <Pressable
          onPress={() => navigation.navigate('OrdersScreen')}
          android_ripple={{ color: '#ccc' }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressed : undefined,
          ]}
        >
          <Ionicons name="receipt-outline" size={24} color={Colors.text} />
          <Text style={styles.option_text}>Orders</Text>
          <Ionicons
            name="ios-chevron-forward"
            size={24}
            color={Colors.text}
            style={styles.chevron}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 12,
  },
  user_container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 6,
    paddingVertical: 16,
    paddingHorizontal: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    marginBottom: 12,
  },
  user_image: {
    height: 75,
    width: 75,
    marginBottom: 10,
    borderRadius: 100,
  },
  user_name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  user_content: {
    width: '100%',
  },
  user_item: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 6,
  },
  user_item_text: {
    color: Colors.text,
  },
  option: {
    elevation: 4,
    shadowColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 16,
  },
  option_text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  chevron: {
    marginLeft: 'auto',
  },
});
