//import liraries
import React, { Component, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import ActionButton from '@logvinme/react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from '../../components/BackButton';
import { Avatar } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs'
import { registerInjury, getInjuries } from '../../api/UpdatePat';
import * as patientActions from '@Action/patient.js';
import empty from '../../assets/empty.png'

// create a component
const Injuries = (props) => {
    const navigation = useNavigation();

    const { user, updatePatient, item, updateCounter, counter } = props;
    const [pdata, setData] = useState([]);
    
    const [Image64, setImage64] = useState()

    const emptyImage = Image.resolveAssetSource(empty)

    console.log(emptyImage)

    const [showImage, setShowImage] = useState(emptyImage.uri)

    useFocusEffect(
        React.useCallback(() => {            
            getInjuries(item._id)
                .then(res => setData(res.data))
            updateCounter(1)
            return () => counter;
        }, []),
    );


    //console.log(pdata)

    const newData = (value) => {
        updateCounter(counter + 1)
        setData(prevState => {
          prevState.splice(0, 0, { _id: counter, injury: value });
          return [...prevState];
        });
      };
   

    const choosePhoto = () => {
        const options = {
          noData: true
        };
        launchImageLibrary(options, response => {
          if (response.assets) {
            //setAvatar(response.assets[0])
            RNFS.readFile(response.assets[0].uri, 'base64').then(res => { setImage64('data:' + response.assets[0].type + ';base64,' + res) })
            registerInjury({patient_id: item._id, injury: Image64})
            //newData(Image64)
          }
        })
      }
    
      const chooseCamera = () => {
        let options = {
            mediaType: 'photo',
            saveToPhotos: true,
            quality: 0,
            maxWidth: 50,
            maxHeight:50       
        };
        launchCamera(options, (response) => {
          if (response.assets) {
            console.log(response)
            
          }
        })
    }    

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'#148AA0'} barStyle="dark-content" />
            <View tyle={styles.upperContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <BackButton
                            onPress={() => navigation.navigate('CategoriesScreen')}
                        />
                    </View>
                    <View>
                        <Text style={styles.titleText}>Injuries</Text>
                    </View>
                    <View style={{ marginRight: 10 }}>
                        <View style={styles.avatarUser}>
                            <Avatar.Image
                                size={40}
                                backgroundColor={'white'}
                                source={item.avatar == '' ? require('@Asset/profilepic.jpg') : { uri: user.avatar }}

                            />
                        </View>
                    </View>
                </View>
            </View>
            <View
                style={{
                    alignItems: 'center',
                    height: '50%',
                    width: '100%',
                    marginTop: 20,
                }}>
                <View style={{width: '90%', height: '100%', alignItems: 'center'}}>
                    <Image style={{width: '90%', height: '100%', borderRadius: 10 }} source={{ uri: showImage }}></Image>
                </View>
            </View>
            <View style={styles.lowerContainer}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        height: '100%',
                        marginTop: 10,
                    }}>
                    <FlatList
                        style={{ width: '100%'}}
                        keyExtractor={item => item._id}
                        data={Object.values(pdata)}
                        extraData={pdata}
                        horizontal={true}
                        contentContainerStyle={{ alignItems: 'center', borderWidth: 1 }}
                        renderItem={({ item, index }) => {                            
                            return (
                                <TouchableOpacity
                                    style={styles.cardShadow}
                                    key={index}                                    
                                    activeOpacity={0.7}
                                    onPress={ () => setShowImage(item.injury)}>
                                    <View style={styles.wrapperPatient}>                                        
                                        <Image style={{ width: '90%', height: '100%', borderRadius: 10 }} source={{ uri: item.injury }}></Image>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </View>
            <ActionButton
                buttonColor="#148AA0"
                buttonTextStyle={{ color: 'rgba(255, 255, 255, 1)' }}>
                <ActionButton.Item
                    buttonColor="#9b59b6"
                    onPress={chooseCamera}>
                    <Icon name="camera-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor="#3498db" onPress={choosePhoto}>
                    <Icon name="images-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#148AA0',
    },
    titleText: {
        color: 'white',
        fontSize: 20,
        borderBottomWidth: 2,
        borderColor: '#e8e8e8',
        fontWeight: 'bold',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    upperContainer: {
        flex: 1,
        backgroundColor: '#148AA0',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },
    lowerContainer: {
        flex: 1,
        backgroundColor: '#148AA0',
    },wrapperPatient: {
        height: 230,
        width: 175,
        alignItems: 'center',
        marginHorizontal: 7,
        borderRadius: 15,
        backgroundColor: 'white'
    },
});

Injuries.propTypes = {
    user: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    counter: PropTypes.number.isRequired,
    updatePatient: PropTypes.func.isRequired,
    updateCounter: PropTypes.func.isRequired,    
  };
  
  const mapStateToProps = state => {
    return {
      user: state.auth.user,
      item: state.patientItem.item,
      counter: state.patientItem.counter,
      
    };
  };
  
  const mapDispachToProps = dispatch => ({
    updatePatient: item => dispatch(patientActions.updatePatient(item)),
    updateCounter: counter => dispatch(patientActions.updateCounter(counter)),    
  });
  
  export default connect(mapStateToProps, mapDispachToProps)(Injuries);