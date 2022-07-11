//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from '../../components/BackButton';
import { Avatar } from 'react-native-paper';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { updateMedicines } from '../../api/UpdatePat';
import { updatePatient } from '../../redux/actions/patient';
import * as patientActions from '@Action/patient.js';
import * as yup from 'yup';

// create a component
const Medicines = (props) => {

  const medicationValidationSchema = yup.object().shape({
    meds: yup.string().required("Introduce a medicine")
  })


  const navigation = useNavigation()

  const { user, updatePatient, item, updateCounter, counter } = props
  const [medicine, setMedicines] = useState(item.medicines)


  const newArrayMedicines = (medsValue) => {
    updateCounter(counter + 1)
    setMedicines((prevState) => {
      prevState.splice(0, 0, { _id: counter, meds: medsValue })
      return [...prevState]
    })
  }

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <StatusBar backgroundColor={'#148AA0'} barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <BackButton
                onPress={() => navigation.navigate('CategoriesScreen')}
              />
            </View>
            <View>
              <Text style={styles.titleText}>Medicines</Text>
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
            <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>Current Medicines</Text>
          </View>
          <View style={styles.PreviousMedWrapper}>
            <FlatList
              keyExtractor={item => item._id}
              data={Object.values(medicine)}
              extraData={medicine}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.tempOuterContainer}>
                    <View style={styles.tempInnerContainer}>
                      <Text
                        key={index}
                        style={{ fontSize: 20, color: 'black' }}>
                        {item.meds}
                      </Text>
                    </View>
                  </View>
                )
              }}
            />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Formik
              validationSchema={medicationValidationSchema}
              initialValues={{ _id: item._id, meds: '' }}
              onSubmit={async (values, { resetForm }) => {
                newArrayMedicines(values.meds)
                item.medicines = medicine
                updatePatient(item)
                updateMedicines(values)
                resetForm()
                console.log(item)
              }}>
              {({ handleSubmit, isValid, values, errors, handleChange, touched }) => (
                <>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: '50%',
                        height: '100%',
                      }}>
                      <TextInput
                        //keyboardType='numeric'
                        name='meds'
                        //maxLength={2}
                        style={styles.textInputStyle}
                        placeholder='Add new medicine'
                        underlineColorAndroid={'#148AA0'}
                        onChangeText={handleChange('meds')}
                        value={values.meds || ''}
                      />
                      {errors.meds && touched.meds && (
                        <Text style={{ fontSize: 16, color: 'red' }}>
                          {' '}
                          {errors.meds}
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
            name="pills"
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
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    marginTop: 90,
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
    padding: 8
  },
  textInputStyle: {

    fontSize: 17,
    marginTop: 5,
  },
  tempInnerContainer: {
    borderWidth: 0,
    height: 64,
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
    elevation: 3,
    padding: 19,
  },
  tempOuterContainer: {
    marginVertical: 3,
    marginHorizontal: 20,
  },
});

Medicines.propTypes = {
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
  updatePatient: (item) => dispatch(patientActions.updatePatient(item)),
  updateCounter: counter => dispatch(patientActions.updateCounter(counter)),
});

export default connect(mapStateToProps, mapDispachToProps)(Medicines);
