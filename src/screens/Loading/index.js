//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import {useNavigation} from '@react-navigation/native';


// create a component
const Loading = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 1000);
  }, []);

  return (
    <View
      style={{backgroundColor: 'white', height: '100%', alignItems: 'center'}}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
      <Text style={styles.titleText}>CONTROLLED </Text>
      <Text style={styles.titleText}>HEALTH </Text>
      <Image
        source={require('@Asset/health2.png')}
        style={{width: '85%', height: '50%', marginTop: 25}}></Image>
      <ActivityIndicator size={70} color='#148AA0' style={{marginTop: 60}} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  titleText: {
    color: '#148AA0',
    fontSize: 45,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#148AA0',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 50,
  },
});

//make this component available to the app
export default Loading;