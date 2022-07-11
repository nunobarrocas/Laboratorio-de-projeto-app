//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import BackButton from '../../components/BackButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import * as authActions from '@Action/auth.js';
import PropTypes from 'prop-types';
import { updateUser } from '@Api/Auth';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import profilepic from '../../assets/profilepic.jpg'
import RNFS from 'react-native-fs';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { resetStore } from '../../../App';

// create a component
const Profile = (props) => {
  const { updateUserLogin, updateUserAccessToken, user, isLoggedIn } = props;

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setusername(props.user.name);
      user.avatar = profileImage
      return () => setusername(props.user.name);
    }, []),
  );

  const logout = () => {
    updateUserLogin({}, false);
    updateUserAccessToken('');
   
    navigation.replace('Opening');
  };

  const [username, setusername] = useState('');

  const [profileImage, setProfileImage] = useState(user.avatar)


  const choosePhoto = () => {
    const options = {
      noData: true
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        RNFS.readFile(response.assets[0].uri, 'base64').then(res => { setProfileImage('data:' + response.assets[0].type + ';base64,' + res) })
        user.avatar = profileImage
        updateUser({ avatar: profileImage })
        updateUserLogin(user, isLoggedIn)
      }
    })
  }

  const chooseCamera = () => {
    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    launchCamera(options, (response) => {
      if (response.assets) {
        RNFS.readFile(response.assets[0].uri, 'base64').then(res => { setProfileImage('data:' + response.assets[0].type + ';base64,' + res) })
        user.avatar = profileImage
        updateUser({ avatar: profileImage })
        updateUserLogin(user, isLoggedIn)
      }
    })
}


  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor={'#148AA0'} />
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <BackButton onPress={() => navigation.navigate('HomeScreenTab')} />
            </View>
            <View>
              <Text style={styles.titleText}>Profile</Text>
            </View>
            <TouchableOpacity onPress={chooseCamera} style={{ marginRight: 20, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
              <Icon name="camera-plus" size={30} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <Text
            style={{
              marginHorizontal: 7,
              color: 'black',
              fontSize: 20,
              marginTop: 190,
            }}>
            Settings
          </Text>
          <View style={styles.wrapper1}>
            <Formik
              initialValues={{ name: '' }}
              onSubmit={async (values, { resetForm }) => {
                console.log('values', values);
                setusername(values.name);
                props.user.name = values.name;
                updateUser(values);
                updateUserLogin(props.user, isLoggedIn);
                console.log(props.user);
                resetForm()

              }}>
              {({ handleSubmit, isValid, values, errors, handleChange, touched }) => (
                <>
                  <TextInput
                    style={styles.TextInputChanger}
                    name="name"
                    placeholder="Change Name"
                    onChangeText={handleChange('name')}
                    value={values.name || ''}
                  />
                  {errors.name && touched.name && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {' '}
                      {errors.name}
                    </Text>
                  )}
                  <TouchableOpacity
                    style={styles.buttonChanger}
                    onPress={handleSubmit}>

                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      Change
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
          <View style={styles.wrapper2}>
            <Formik
              initialValues={{ password: '' }}
              onSubmit={async (values, { resetForm }) => {
                console.log('values', values);
                props.user.password = values.password;
                updateUser(values);
                updateUserLogin(props.user, isLoggedIn);
                console.log(props.user);
                resetForm()
              }}>
              {({
                handleSubmit,
                isValid,
                values,
                errors,
                handleChange,
                touched,
              }) => (
                <>
                  <TextInput
                    style={styles.TextInputChanger}
                    name="password"
                    placeholder="Change Password"
                    onChangeText={handleChange('password')}
                    secureTextEntry={true}
                    value={values.password || ''}
                  />
                  <TouchableOpacity
                    style={styles.buttonChanger}
                    onPress={handleSubmit}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      Change
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
          <View style={{ marginTop: 30, marginBottom: 70 }}>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}> Logout </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.outContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.avatarUser}>
              <TouchableOpacity onPress={choosePhoto}>
                <Avatar.Image
                  size={130}
                  backgroundColor={'white'}
                  source={user.avatar == 'n/a' ? require('@Asset/profilepic.jpg') : { uri: profileImage }}
                  style={{ marginTop: 20 }}
                />
              </TouchableOpacity>
            </View>            
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.userNameStyle}> {username} </Text>
              <Text style={{ marginTop: 10 }}> {props.user.email} </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    margin: 20,
    borderRadius: 5,
    backgroundColor: '#148AA0'
  },
  buttonChanger: {
    width: 100,
    height: 50,
    marginTop: 13,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#148AA0',
    padding: 7,
    borderRadius: 5,
  },
  TextInputChanger: {
    height: 60,
    borderRadius: 5,
    marginTop: 5,
    padding: 15,
    marginLeft: 10,
    width: '68%',
    shadowColor: '#7d7d7d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,
    elevation: 4,
  },
  wrapper1: {
    flexDirection: 'row',
  },
  wrapper2: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  upperContainer: {
    flex: 1,
    backgroundColor: '#148AA0',
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
  },
  lowerContainer: {
    flex: 3,
    backgroundColor: 'white',
  },
  outContainer: {

    position: 'absolute',
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    backgroundColor: 'white',
    height: '70%',
    width: '90%',
    borderRadius: 20,
    shadowColor: '#7d7d7d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 5,
  },
  userNameStyle: {
    marginTop: 15,
    fontSize: 25,
    color: 'black',
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    borderBottomWidth: 2,
    borderColor: '#e8e8e8',
    fontWeight: 'bold',
  },
  avatarUser: {
    alignItems: 'center',
  },
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  updateUserLogin: PropTypes.func.isRequired,
  updateUserAccessToken: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    accessToken: state.auth.accessToken,
  };
};

const mapDispachToProps = dispatch => ({
  updateUserLogin: (user, isLoggedIn) =>
    dispatch(authActions.updateUserLogin(user, isLoggedIn)),
  updateUserAccessToken: accessToken =>
    dispatch(authActions.updateUserAccessToken(accessToken)),
});

//make this component available to the app
export default connect(mapStateToProps, mapDispachToProps)(Profile);
