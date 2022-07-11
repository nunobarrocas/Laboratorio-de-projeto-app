//import liraries
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, KeyboardAvoidingView, FlatList, ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from '../../components/BackButton';
import { Avatar } from 'react-native-paper';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTemperature } from '../../api/UpdatePat';
import { updatePatient } from '../../redux/actions/patient';
import * as patientActions from '@Action/patient.js';
import * as yup from 'yup';
import * as speechActions from '@Action/speech.js';
import { updateSpeech } from '../redux/actions/speech';
import Micro from '../../components/Micro';
import { value } from 'react-native-extended-stylesheet';

// create a component

const Temperature = props => {

  const navigation = useNavigation();

  const temperatureValidationSchema = yup.object().shape({
    temp: yup.string().required('Introduce a temperature'),
  });

  const { user, updatePatient, item, updateSpeech, text, updateCounter, counter } = props;
  const [temperatures, setTemperatures] = useState(item.temperature);

  useEffect(() => {
    updateSpeech('')
  }, []);

  const newArrayTemperature = (tempValue, dateValue) => {
    updateCounter(counter + 1)
    setTemperatures(prevState => {
      prevState.splice(0, 0, { _id: counter, temp: tempValue, date: dateValue });
      return [...prevState];
    });
  };

  const getTime = () => {
    let dat = Date.now();
    let time = new Date(dat);
    let day = time.getDate();
    let month = time.getMonth();
    let year = time.getFullYear();
    let timeofupdate = day + '-' + month + '-' + year;
    return timeofupdate;
  };

  return (
    <KeyboardAvoidingView>
      <View style={{ backgroundColor: 'white', height: '100%' }}>
        <StatusBar backgroundColor={'#148AA0'} barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.upperContainer}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <BackButton
                  onPress={() => navigation.navigate('CategoriesScreen')}
                />
              </View>
              <View>
                <Text style={styles.titleText}>Temperature</Text>
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
          <View style={styles.lowerContainer}>
            <View style={styles.title}>
              <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>
                Previous Temperatures
              </Text>
            </View>
            <View style={styles.PreviousMedWrapper}>
              <FlatList
                keyExtractor={item => item._id}
                data={Object.values(temperatures)}
                extraData={temperatures}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.tempOuterContainer}>
                      <View style={styles.tempInnerContainer}>
                        <Text
                          key={index}
                          style={{ fontSize: 20, color: 'black' }}>
                          {item.temp} ºC
                        </Text>
                        <Text style={{ fontSize: 20, color: 'black' }}>
                          {item.date}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Formik
                validationSchema={temperatureValidationSchema}
                initialValues={{ _id: item._id, temp: props.text }}
                enableReinitialize
                onSubmit={async (values, { resetForm }) => {
                  newArrayTemperature(values.temp, getTime());
                  item.temperature = temperatures;
                  updatePatient(item);
                  updateTemperature(values);
                  console.log(values.temp);
                  resetForm();
                  updateSpeech('');
                  //console.log(item);
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
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                      <View style={{ marginTop: 16 }}>
                        <Micro></Micro>
                      </View>
                      <View
                        style={{
                          width: '50%',
                          height: '100%',
                        }}>
                        <TextInput
                          keyboardType="numeric"
                          name="temp"
                          maxLength={4}
                          style={styles.textInputStyle}
                          placeholder="Add new Temperature"
                          underlineColorAndroid={'#148AA0'}
                          onChangeText={handleChange('temp')}
                          value={values.temp || ''}
                        />
                        {errors.temp && touched.temp && (
                          <Text style={{ fontSize: 16, color: 'red' }}>
                            {' '}
                            {errors.temp}
                          </Text>
                        )}
                      </View>
                      <View>
                        <TouchableOpacity onPress={handleSubmit}>
                          <Icon
                            name="plus"
                            size={15}
                            color={'#148AA0'}
                            style={{ marginTop: 25, marginLeft: 10 }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Icon
              name="temperature-high"
              size={100}
              color={'white'}
              style={styles.iconStyle}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

// define your styles
const styles = StyleSheet.create({
  tempInnerContainer: {
    borderWidth: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 5,
    padding: 19,
  },
  tempOuterContainer: {
    marginVertical: 3,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    marginTop: 85,
    alignItems: 'center',
  },
  upperContainer: {
    flex: 1,
    backgroundColor: '#148AA0',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  lowerContainer: {
    flex: 3,
    backgroundColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    borderWidth: 4,
    backgroundColor: '#148AA0',
    padding: 25,
    borderRadius: 100,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 15,
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    borderBottomWidth: 2,
    borderColor: '#e8e8e8',
    fontWeight: 'bold',
  },
  PreviousMedWrapper: {
    borderWidth: 0,
    height: '55%',
    margin: 16,
    marginTop: 5,
    shadowColor: '#7d7d7d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 5,
    padding: 8,
  },
  textInputStyle: {
    fontSize: 17,
    marginTop: 5,
  },
});

Temperature.propTypes = {
  user: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  counter: PropTypes.number.isRequired,
  updatePatient: PropTypes.func.isRequired,
  updateCounter: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  updateSpeech: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    item: state.patientItem.item,
    counter: state.patientItem.counter,
    text: state.speech.text,
  };
};

const mapDispachToProps = dispatch => ({
  updatePatient: item => dispatch(patientActions.updatePatient(item)),
  updateCounter: counter => dispatch(patientActions.updateCounter(counter)),
  updateSpeech: text => dispatch(speechActions.updateSpeech(text)),
});

export default connect(mapStateToProps, mapDispachToProps)(Temperature);