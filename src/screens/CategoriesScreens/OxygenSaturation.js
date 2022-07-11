//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from '../../components/BackButton';
import { Avatar } from 'react-native-paper';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { updateOxygen } from '../../api/UpdatePat';
import { updateCounter, updatePatient } from '../../redux/actions/patient';
import * as patientActions from '@Action/patient.js';
import * as yup from 'yup';

// create a component
const OxygenSaturation = (props) => {

  const navigation = useNavigation()

  const oxygenValidationSchema = yup.object().shape({
    oxygen: yup.string().required("Introduce a medicine")
  })


  const { user, updatePatient, item, updateCounter, counter } = props
  const [oxygenSat, setOxygen] = useState(item.oxygenSaturation)


  const newArrayOxygen = (oxygValue, dateValue) => {
    updateCounter(counter + 1)
    setOxygen((prevState) => {
      prevState.splice(0, 0, { _id: counter, oxyg: oxygValue, date: dateValue })
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
              <Text style={styles.titleText}>Oxygen Saturation</Text>
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
            <Text style={{ fontSize: 29, color: 'black', fontWeight: 'bold' }}>Previous Oxygen Saturations</Text>
          </View>
          <View style={styles.PreviousMedWrapper}>
            <FlatList
              keyExtractor={item => item._id}
              data={Object.values(oxygenSat)}
              extraData={oxygenSat}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.tempOuterContainer}>
                    <View style={styles.tempInnerContainer}>
                      <Text
                        key={index}
                        style={{ fontSize: 20, color: 'black' }}>
                        {item.oxyg}%
                      </Text>
                      <Text style={{ fontSize: 20, color: 'black' }}>
                        {item.date}
                      </Text>
                    </View>
                  </View>
                )
              }}
            />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Formik
              validationSchema={oxygenValidationSchema}
              initialValues={{ _id: item._id, oxygen: '' }}
              onSubmit={async (values, { resetForm }) => {
                newArrayOxygen(values.oxygen, getTime())
                item.oxygenSaturation = oxygenSat
                updatePatient(item)
                updateOxygen(values)
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
                        keyboardType="numeric"
                        name="oxygen"
                        maxLength={2}
                        style={styles.textInputStyle}
                        placeholder="Add new value"
                        underlineColorAndroid={'#148AA0'}
                        onChangeText={handleChange('oxygen')}
                        value={values.oxygen || ''}
                      />
                      {errors.oxygen && touched.oxygen && (
                        <Text style={{ fontSize: 16, color: 'red' }}>
                          {' '}
                          {errors.oxygen}
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
            name="lungs"
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

OxygenSaturation.propTypes = {
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

export default connect(mapStateToProps, mapDispachToProps)(OxygenSaturation);
