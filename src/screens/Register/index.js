//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
//import { Avatar } from 'react-native-paper';
import { ScrollView, TextInput, TouchableOpacity, } from 'react-native-gesture-handler';
import { moderateScale, scale } from 'react-native-size-matters';
import { RadioButton } from 'react-native-paper';
import RadioForm, { RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import BackButton from '../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { registerPatient } from '@Api/Register';
import { Formik, Field } from 'formik';
import { showSnackBar } from '../../utils/SnackBar';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from 'react-native-paper';
import profilepic from '../../assets/profilepic.jpg'
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const RegistrationValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  birthdate: yup.string().matches(/^\d{2}\/\d{2}\/\d{4}$/, "Date format must be dd/mm/yyyy").required("Birthdate is required"),
  height: yup.string().required("Height is required"),
  weight: yup.string().required("Weight is required"),
  gender: yup.string().required("Gender is required")
})


// create a component
const Register = (props) => {
  //const [checked, setChecked] = React.useState('first');

  const navigation = useNavigation();

  const user = props;

  const [showSpinner, setShowSpinner] = useState(false)

  const [dueDate, setdueDate] = useState('')
  const imageuri = Image.resolveAssetSource(profilepic)

  const [iavatar, setAvatar] = useState(imageuri)

  const [Image64, setImage64] = useState('')

  const choosePhoto = () => {
    const options = {
      noData: true
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        setAvatar(response.assets[0])
        RNFS.readFile(response.assets[0].uri, 'base64').then(res => { setImage64('data:' + response.assets[0].type + ';base64,' + res) })

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

  const renderPage = () => {
    return (
      <View style={{ backgroundColor: 'white', height: '100%' }}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor={'white'} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <BackButton onPress={() => navigation.navigate('HomeScreenTab')} />
          </View>
          <View>
            <Text></Text>
          </View>
          <TouchableOpacity style={{ marginRight: 20, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
            <Icon onPress={chooseCamera} name="camera-plus" size={30} color={'#148AA0'} />
          </TouchableOpacity>
        </View>
        <View style={styles.avatarUser}>
          <TouchableOpacity onPress={choosePhoto}>
            <Avatar.Image
              backgroundColor={'white'}
              size={180}
              source={{ uri: iavatar.uri }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ margin: 10, marginTop: 2 }}>
          <Text style={styles.textscreen}>Register New Patient</Text>
        </View>
        <View>
          <Formik validationSchema={RegistrationValidationSchema}
            initialValues={{ user_id: user.user._id, name: '', birthdate: '', height: '', weight: '', gender: '', avatar: Image64, tempBool: false, bpBool: false, medsBool: false, oxygBool: false, injBool: false }}
            enableReinitialize
            onSubmit={(values) => {
              setShowSpinner(true);
              registerPatient(values).then(res => {
                
                setShowSpinner(false);
                showSnackBar(res.msg);
              }).catch(err => {
                console.log("Error", err.response);
                console.log("hello", values.avatar)
                setShowSpinner(false);
                showSnackBar(err.response.data?.msg, 'ERROR')
              })
            }}>
            {({ handleSubmit, isValid, values, errors, handleChange, touched }) => (
              <>
                <View style={styles.wrapper}>
                  <View style={styles.input}>
                    <TextInput
                      style={{ fontWeight: 'bold' }}
                      placeholder="Name"
                      name="name"
                      onChangeText={handleChange('name')}                      
                    />

                    {(errors.name && touched.name) &&
                      <Text style={{ fontSize: 10, color: 'red' }}> {errors.name}</Text>}
                  </View>
                </View>
                <View style={styles.wrapper}>
                  <View style={styles.input}>
                    <TextInput
                      style={{ fontWeight: 'bold' }}
                      placeholder="Birthdate"
                      name="birthdate"
                      onChangeText={handleChange('birthdate')}
                    />

                    {(errors.birthdate && touched.birthdate) &&
                      <Text style={{ fontSize: 10, color: 'red' }}> {errors.birthdate}</Text>}
                  </View>
                </View>
                <View style={styles.wrapper}>
                  <View style={styles.input}>
                    <TextInput
                      style={{ fontWeight: 'bold' }}
                      placeholder="Height"
                      name="height"
                      keyboardType='numeric'
                      onChangeText={handleChange('height')}
                    />

                    {(errors.height && touched.height) &&
                      <Text style={{ fontSize: 10, color: 'red' }}> {errors.height}</Text>}
                  </View>
                </View>
                <View style={styles.wrapper}>
                  <View style={styles.input}>
                    <TextInput
                      style={{ fontWeight: 'bold' }}
                      placeholder="Weight"
                      name="weight"
                      keyboardType='numeric'
                      onChangeText={handleChange('weight')}
                    />

                    {(errors.weight && touched.weight) &&
                      <Text style={{ fontSize: 10, color: 'red' }}> {errors.weight}</Text>}
                  </View>
                </View>
                <View>
                  <RadioButton.Group
                    onValueChange={handleChange('gender')}
                    value={values.gender}

                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <Text>Male</Text>
                        <RadioButton value='M' color={'#148AA0'}></RadioButton>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                        <RadioButton value='F' color={'#148AA0'}></RadioButton>
                        <Text>Female</Text>
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
                <View style={{ alignItems: 'center', marginTop: 15 }}>
                  <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
                    <Text style={styles.buttontext}> Save</Text>
                    {showSpinner && (<ActivityIndicator color={'white'} />)}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>


      </View>
    );
  };
  

  const styles = StyleSheet.create({

    textscreen: {
      color: '#148AA0',
      fontSize: 25,
      textDecorationLine: 'underline',
      fontWeight: 'bold'
    },
    input: {
      height: 55,
      borderWidth: moderateScale(1),
      borderColor: '#D3D3D3',
      borderRadius: moderateScale(8),
      paddingHorizontal: moderateScale(10),
      fontWeight: 'bold',
      marginHorizontal: 3,
      marginVertical: 3,
      backgroundColor: 'white'
    },
    titleText: {
      color: '#148AA0',
      fontSize: 35,
      fontWeight: '900',
      marginHorizontal: 10,
    },
    wrapper: {
      margin: 10,
      height: 55,
      marginHorizontal: 20,
      borderRadius: 5,
      shadowColor: '#7d7d7d',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,

      elevation: 5,
    },
    radioFormStyle: {
      margin: 13,
      right: -90,
    },
    saveButton: {
      backgroundColor: '#148AA0',
      height: scale(35),
      borderRadius: scale(20),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 150,
      marginBottom: 30
    },
    buttontext: {
      color: 'white',
      fontWeight: 'bold',
      position: 'absolute',
    },
    avatarUser: {
      alignItems: 'center',
    },
  });



  return <View>{renderPage()}</View>;
};

Register.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,

  };
};
//make this component available to the app
export default connect(mapStateToProps)(Register);