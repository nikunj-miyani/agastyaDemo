import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Home = () => {
  const {navigate} = useNavigation();

  const onPressButton = () => navigate('AgastyaAI');

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.welcomeText}>Welcome to our AI modal</Text>
      <TouchableOpacity style={styles.buttonView} onPress={onPressButton}>
        <Text style={styles.buttonText}>Agastya AI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 20,
    paddingBottom: 30,
  },
  buttonView: {
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: '#FF0C63',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default Home;
