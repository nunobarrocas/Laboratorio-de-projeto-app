//import liraries
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {moderateScale, scale} from 'react-native-size-matters';
import * as yup from 'yup';
import {Formik, Field} from 'formik';
import {loginUser} from '@Api/Auth';
import {showSnackBar} from '../../utils/SnackBar';
import {connect} from 'react-redux';
import * as authActions from '@Action/auth.js';
import PropTypes from 'prop-types';
import {setTokenInterceptor} from '../../utils/setTokenInterceptor'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = (props) => {
  const {updateUserLogin, updateUserAccessToken, user, isLoggedIn} = props;

  const navigation = useNavigation();

  const [showSpinner, setShowSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const renderPage = () => {
    return (
      <View style={{backgroundColor:'white', height: '100%'}}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('@Asset/health2.png')}
              style={{width: '70%', height: 240, margin: 20}}></Image>
            <Text style={styles.titleText}>CONTROLLED </Text>
            <Text style={styles.titleText}>HEALTH </Text>
          </View>
          <View style={styles.formContainer}>
            <Formik
              validationSchema={signInValidationSchema}
              initialValues={{email: '', password: ''}}
              onSubmit={async values => {
                setShowSpinner(true);                
                loginUser(values)
                  .then(res => {
                    setShowSpinner(false);                                       
                    navigation.navigate('HomeScreen');
                    updateUserLogin(res, true);
                    updateUserAccessToken(res.token);
                    showSnackBar('Login successfull');                    
                    setTokenInterceptor(res)
                  })
                  .catch(err => {
                    console.log('Error', err.response.data?.msg);
                    setShowSpinner(false);
                    showSnackBar(err.response.data?.msg, 'ERROR');
                  });
              }}>
              {({ handleSubmit, isValid, values, errors, handleChange, touched, }) => (
                <>
                  <View style={styles.wrapper}>
                    <View style={styles.input}>
                      <TextInput
                        style={{height: scale(50), fontWeight: 'bold'}}
                        placeholder="Email"
                        keyboardType="email-address"
                        name="email"
                        onChangeText={handleChange('email')}
                      />
                      {errors.email && touched.email && (
                        <Text style={{fontSize: 10, color: 'red'}}>
                          {' '}
                          {errors.email}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.wrapper}>
                    <View style={styles.input}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View>
                          <TextInput
                            style={{height: scale(50), fontWeight: 'bold', width: '400%'}}
                            placeholder="Password"
                            secureTextEntry={showPassword}
                            name="password"
                            onChangeText={handleChange('password')}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            setShowPassword(prevState => !prevState)
                          }>
                          <Icon
                            name={showPassword ? 'eye-slash' : 'eye'}
                            size={20}
                          />
                        </TouchableOpacity>
                      </View>
                      {errors.password && touched.password && (
                        <Text style={{fontSize: 10, color: 'red'}}>
                          {' '}
                          {errors.password}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 13,
                      marginTop: 5,
                    }}>
                    <Text>No account?</Text>
                    <TouchableOpacity>
                      <Text
                        style={styles.signText}
                        onPress={() => navigation.navigate('SignUp')}>
                        {' '}
                        SignUp
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={styles.login}>
                      <Text style={styles.buttontext}> Login </Text>
                      {showSpinner && <ActivityIndicator color={'white'} />}
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    );
  };

  return <View>{renderPage()}</View>;
};

const styles = StyleSheet.create({
  titleText: {
    color: '#148AA0',
    fontSize: 35,
    fontWeight: 'bold',
  },
  textInput: {
    borderBottomWidth: 2,
  },
  login: {
    backgroundColor: '#148AA0',
    height: scale(40),
    borderRadius: scale(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: '80%',
    marginTop: 35,
  },
  formContainer: {},
  inputContainer: {},
  wrapper: {
    marginTop: moderateScale(10),
  },
  input: {
    height: moderateScale(55),
    borderWidth: moderateScale(1),
    borderColor: '#D3D3D3',
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 3,
  },
  buttontext: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
  },
  signText: {
    marginLeft: moderateScale(5),
    color: '#148AA0' ? '#005f72' : '#005f72',
  },
});

Login.propTypes = {
  user: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  updateUserLogin: PropTypes.func.isRequired,
  updateUserAccessToken: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispachToProps = dispatch => ({
  updateUserLogin: (user, isLoggedIn) =>
    dispatch(authActions.updateUserLogin(user, isLoggedIn)),
  updateUserAccessToken: accessToken =>
    dispatch(authActions.updateUserAccessToken(accessToken)),
});

export default connect(mapStateToProps, mapDispachToProps)(Login);
