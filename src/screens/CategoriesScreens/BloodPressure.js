//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from '../../components/BackButton';
import { Avatar } from 'react-native-paper';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { updateBloodPressure } from '../../api/UpdatePat';
import { updatePatient } from '../../redux/actions/patient';
import * as patientActions from '@Action/patient.js';
import * as yup from 'yup';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';


// create a component
const BloodPressure = (props) => {

  const navigation = useNavigation()

  const bloodPressureValidationSchema = yup.object().shape({
    high: yup.string().required("Introduce a value"),
    low: yup.string().required("Introduce a value")
  })

  const { user, updatePatient, item, updateCounter, counter } = props
  const [bloodPress, setbloodPress] = useState(item.bloodPressure)
  
  
  const newArrayBloodPressure = (highValue, lowValue, dateValue) => {
    updateCounter(counter + 1)
    setbloodPress((prevState) => {
      prevState.splice(0, 0, { _id: counter, high: highValue, low: lowValue, date: dateValue })
      return [...prevState]
    })
  }

  const getTime = () => {
    let dat = Date.now();
    let time = new Date(dat)
    let day = time.getDate();
    let month = time.getMonth();
    let year = time.getFullYear();
    let timeofupdate = day + "-" + month + "-" + year
    return (timeofupdate)
  }

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor={'#148AA0'} />
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <BackButton
                onPress={() => navigation.navigate('CategoriesScreen')}
              />
            </View>
            <View>
              <Text style={styles.titleText}>Blood Pressure</Text>
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
            <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>Previous Blood Pressures</Text>
          </View>
          <View style={styles.PreviousMedWrapper}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between',  marginVertical: 3, marginHorizontal: 20}}>
              <Text style={{ fontSize: 20, color: 'black', marginTop: 10 }}>Systolic</Text>
              <Text style={{ fontSize: 20, color: 'black', marginTop: 10 }}>Diastolic</Text>
            </View>
            <FlatList
              keyExtractor={item => item._id}
              data={Object.values(bloodPress)}
              extraData={bloodPress}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ marginVertical: 3, marginHorizontal: 20 }}>

                    <View style={styles.innerContainer}>
                      <Text style={{ fontSize: 18, color: 'black' }} key={index}>{item.high}mm/Hg</Text>
                      <Text style={{ fontSize: 18, color: 'black' }}>{item.date}</Text>
                      <Text style={{ fontSize: 18, color: 'black' }}>{item.low}mm/Hg</Text>
                    </View>
                  </View>
                )
              }}
            />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Formik
              validationSchema={bloodPressureValidationSchema}
              initialValues={{ _id: item._id, high: '', low: '' }}
              onSubmit={async (values, { resetForm }) => {
                newArrayBloodPressure(values.high, values.low, getTime())
                item.bloodPressure = bloodPress
                updatePatient(item)
                updateBloodPressure(values)
                resetForm()
                console.log(item)
              }}>
              {({ handleSubmit, isValid, values, errors, handleChange, touched }) => (
                <>
                <View>
                  <TextInput
                    keyboardType='numeric'
                    name='high'
                    maxLength={4}
                    style={styles.textInputStyle}
                    placeholder='Add new systolic'
                    underlineColorAndroid={'#148AA0'}
                    onChangeText={handleChange('high')}
                    value={values.high || ''}
                  />
                  {errors.high && touched.high && (
                    <Text style={{ fontSize: 16, color: 'red' }}>
                      {' '}
                      {errors.high}
                    </Text>
                  )}
                  </View>
                    <View>
                  <TextInput
                    keyboardType='numeric'
                    name='low'
                    maxLength={3}
                    style={styles.textInputStyle}
                    placeholder='Add new diastolic'
                    underlineColorAndroid={'#148AA0'}
                    onChangeText={handleChange('low')}
                    value={values.low || ''}
                  />
                  {errors.low && touched.low && (
                    <Text style={{ fontSize: 16, color: 'red' }}>
                      {' '}
                      {errors.low}
                    </Text>
                  )}
                  </View>
                  <View style={{marginLeft: 15}}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Icon
                      name='plus'
                      size={15}
                      color={'#148AA0'}
                      style={{ marginTop: 5 }}

                    />
                  </TouchableOpacity>
                  </View>
                </>
                
              )}
            </Formik>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Icon
            name="heartbeat"
            size={100}
            color={'white'}
            style={styles.iconStyle}
          />
        </View>

      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 0,
    height: 60,
    marginTop: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 4,
    padding: 19
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    marginTop: 85,
    alignItems: 'center'
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
  },
  textInputStyle: {
    fontSize: 17,
  }
});

BloodPressure.propTypes = {
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
  updatePatient: (item) =>
    dispatch(patientActions.updatePatient(item)),
  updateCounter: counter => 
    dispatch(patientActions.updateCounter(counter)),
});

export default connect(mapStateToProps, mapDispachToProps)(BloodPressure);