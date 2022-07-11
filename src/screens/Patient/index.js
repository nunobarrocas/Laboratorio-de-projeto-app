//import liraries
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import BackButton from '../../components/BackButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePatient } from '../../redux/actions/patient';
import * as patientActions from '@Action/patient.js';
import { Avatar } from 'react-native-paper';
import { updateFavoriteTemperature, updateFavoriteBp, updateFavoriteInj, updateFavoriteMeds, updateFavoriteOxyg } from '../../api/UpdatePat';


// create a component
const Patient = props => {
  const navigation = useNavigation();

  const { updatePatient, item, user } = props;

  const curr_patient = props.route.params.curr_patient;

  const [render, setrender] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      updatePatient(curr_patient);
      return () => curr_patient;
    }, []),
  );

  const DATA = [
    {
      id: '1',
      title: 'Temperature',
      bool: item.tempBool,
      iconName: 'temperature-high',
      screenName: 'Temperature',
      fav: {
        tempBool: false,
        _id: item._id
      }
    },
    {
      id: '2',
      title: 'Medicines',
      bool: item.medsBool,
      iconName: 'pills',
      screenName: 'Medicines',
      fav: {
        medsBool: false,
        _id: item._id
      }
    },
    {
      id: '3',
      title: 'Blood Pressure',
      bool: item.bpBool,
      iconName: 'heartbeat',
      screenName: 'BloodPressure',
      fav: {
        bpBool: false,
        _id: item._id
      }
    },
    {
      id: '4',
      title: 'Oxygen Saturation',
      bool: item.oxygBool,
      iconName: 'lungs',
      screenName: 'OxygenSaturation',
      fav: {
        oxygBool: false,
        _id: item._id
      }
    },
    {
      id: '5',
      title: 'Injuries',
      bool: item.injBool,
      iconName: 'user-injured',
      screenName: 'Injuries',
      fav: {
        injBool: false,
        _id: item._id
      }
    },
  ];

  const updateFavoritesState = (value, title) => {
    if (render) {
      setrender(false)
    } else if (!render) {
      setrender(true)
    }
    
    
    if (title === 'Temperature') {
      item.tempBool = false
      updateFavoriteTemperature(value)
    } else if (title === 'Medicines') {
      item.medsBool = false
      updateFavoriteMeds(value)
    } else if (title === 'Blood Pressure') {
      item.bpBool = false
      updateFavoriteBp(value)
    } else if (title === 'Oxygen Saturation') {
      item.oxygBool = false
      updateFavoriteOxyg(value)
    } else if (title === 'Injuries') {
      item.injBool = false
      updateFavoriteInj(value)
    }
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#148AA0" />
      <View style={styles.upperContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <BackButton onPress={() => navigation.navigate('HomeScreenTab')} />
          </View>
          <View>
            <Text style={styles.titleText}>Patient</Text>
          </View>
          <View style={{ marginRight: 10 }}>
            <View style={styles.avatarUser}>
              <Avatar.Image
                size={40}
                backgroundColor={'white'}
                source={
                  user.avatar == ''
                    ? require('@Asset/profilepic.jpg')
                    : { uri: user.avatar }
                }
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.lowerContainer}></View>
      <View style={styles.profileContainer}>
        <View style={styles.wrapper}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.patientName}>{curr_patient.name}</Text>
          </View>
          <View style={{ marginTop: 20, marginBottom: 25, width: '100%' }}>
            <Text style={{ marginLeft: 10, fontSize: 30, color: '#148AA0', fontWeight: 'bold' }}>
              Favorite{'\n'}Categories
            </Text>
          </View>

          <FlatList
            keyExtractor={item => item.id}
            data={DATA}
            extraData={render}
            contentContainerStyle={styles.list}
            renderItem={({ item, index }) => {
              if (item.bool === true) {
                return (
                  <View style={styles.carStyle}>
                    <TouchableOpacity key={index} style={styles.firstBoxStyle} onPress={() => navigation.navigate(item.screenName)}>
                      <View style={styles.iconContainer1}>
                        <Icon
                          name={item.iconName}
                          size={20}
                          color={'black'}
                          style={styles.iconStyle}
                        />
                        <TouchableOpacity onPress={() => updateFavoritesState(item.fav, item.title)}>
                          <Icon
                            name="minus"
                            size={15}
                            color={'#148AA0'}
                            style={styles.iconStyle2}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{ height: '100%', justifyContent: 'center', marginLeft: 10, marginTop: 15 }}>
                        <Text style={styles.title}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }
            }}
          />

        </View>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.avatarUser}>
          <Avatar.Image
            size={140}
            backgroundColor={'white'}
            source={
              item.avatar == ''
                ? require('@Asset/profilepic.jpg')
                : { uri: item.avatar }
            }
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    </View>
  );
};
// define your styles
const styles = StyleSheet.create({
  iconStyle2: {
    padding: 5,
    borderRadius: 5,
    marginRight: 3,
    marginTop: 0,
  },
  iconStyle: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  firstBoxStyle: {
    borderWidth: 0,
    height: 130,
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'white',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  carStyle: {
    width: 155,
    borderWidth: 0,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 10,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  upperContainer: {
    flex: 1,
    backgroundColor: '#148AA0',
  },
  lowerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileContainer: {
    width: '100%',
    height: '82%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: 0,
  },
  wrapper: {
    backgroundColor: 'white',
    width: '95%',
    height: '95%',
    shadowColor: '#7d7d7d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 5,
  },
  iconContainer: {
    position: 'absolute',
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer1: {
    position: 'absolute',
    width: '100%',
    height: '40%',
    alignItems: 'flex-start',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    borderBottomWidth: 2,
    borderColor: '#e8e8e8',
    fontWeight: 'bold',
  },
  patientName: {
    marginTop: 70,
    fontSize: 30,
    color: '#001c21',
  },

  avatarUser: {
    alignItems: 'center',
  },
});

//make this component available to the app
Patient.propTypes = {
  user: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  updatePatient: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    item: state.patientItem.item,
  };
};

const mapDispachToProps = dispatch => ({
  updatePatient: item => dispatch(patientActions.updatePatient(item)),
});

export default connect(mapStateToProps, mapDispachToProps)(Patient);
