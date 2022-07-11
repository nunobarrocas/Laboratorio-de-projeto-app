//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

// create a component
const BackButton = ({onPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Icon name="chevron-back-sharp" size={25} color='black' />
          </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {                
        marginLeft: 8,
        borderRadius:5 ,
        borderWidth:1,
        width:30,
        alignItems:'center',
        borderColor: 'black'
    },
});

//make this component available to the app
export default BackButton;
