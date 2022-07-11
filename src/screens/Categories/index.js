//import liraries
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from '../../components/BackButton';
import { Avatar } from 'react-native-paper';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Voice from '@react-native-voice/voice';
import { updateFavoriteTemperature, updateFavoriteBp, updateFavoriteInj, updateFavoriteMeds, updateFavoriteOxyg } from '../../api/UpdatePat';
import * as patientActions from '@Action/patient.js';

// create a component
const Categories = props => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const {item, user} = props;
  

  useEffect(() => {
    setFilterData(DATA);
    let mounted = true
    if (mounted) {
      Voice.onSpeechStart = onSpeechStartHandle;
      Voice.onSpeechEnd = onSpeechEndHandle;
      Voice.onSpeechResults = onSpeechResultsHandle;
    }
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      mounted = false
    };
  }, []);

  const searchFilter = text => {
    if (text) {
      const newData = DATA.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(DATA);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {    
    return (      
      <View style={styles.categoriesWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screenName)}
          style={{ flexDirection: 'row' }}>
          <View style={styles.iconWrapper}>
            <Icon
              name={item.icon}
              size={25}
              color={'black'}
              style={styles.iconStyle}
            />
          </View>
          <Text style={styles.categoryName}>{item.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateFavoritesState(item.fav, item.title)} style={{ marginRight: 10 }}>
          <Icon
            name="plus"
            size={15}
            color={'#148AA0'}
            style={styles.chevronStyle}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const updateFavoritesState = (value, title) => {
    
    if (title === 'Temperature') {
      item.tempBool = true
      updateFavoriteTemperature(value)
    } else if (title === 'Medicines') {
      item.medsBool = true
      updateFavoriteMeds(value)
    } else if (title === 'Blood Pressure') {
      item.bpBool = true
      updateFavoriteBp(value)
    } else if (title === 'Oxygen Saturation') {
      item.oxygBool = true
      updateFavoriteOxyg(value)
    } else if (title === 'Injuries') {
      item.injBool = true
      updateFavoriteInj(value)
    }
  }

  const onSpeechStartHandle = e => {
    console.log('start handler==>>>', e);
  };
  const onSpeechEndHandle = e => {
    setLoading(false);
    console.log('stop handler', e);
    stopRecording()

  };

  const onSpeechResultsHandle = e => {

    let voice = e.value[0];
    searchFilter(voice);
    console.log('speech result handler', e);
    Voice.destroy().then(Voice.removeAllListeners)

  };

  const start = async () => {
    setLoading(true);
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error raised', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log('error raised', error);
    }
  };

  const DATA = [
    {
      id: '1',
      title: 'Temperature',
      icon: 'temperature-low',
      screenName: 'Temperature',
      fav: {
        tempBool: true,
        _id: item._id
      }
    },
    {
      id: '2',
      title: 'Medicines',
      icon: 'pills',
      screenName: 'Medicines',
      fav:{
        medsBool: true,
        _id: item._id
      } 
    },
    {
      id: '3',
      title: 'Blood Pressure',
      icon: 'heartbeat',
      screenName: 'BloodPressure',
      fav: {
        bpBool: true,
        _id: item._id
      }
    },
    {
      id: '14',
      title: 'Oxygen Saturation',
      icon: 'lungs',
      screenName: 'OxygenSaturation',
      fav: {
        oxygBool: true,
        _id: item._id
      } 
    },
    {
      id: '5',
      title: 'Injuries',
      icon: 'user-injured',
      screenName: 'Injuries',
      fav: {
        injBool: true,
        _id: item._id
      }
    },
  ];

  

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <BackButton
            onPress={() =>
              navigation.replace('Patient', {
                screen: 'PatientScreen',
                params: { curr_patient: props.item },
              })
            }
          />
        </View>
        <View>
          <Text style={styles.categoriesText}>Categories</Text>
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
      <View style={styles.searchBar}>
        <TextInput
          style={{ width: '90%' }}
          value={search}
          placeholder="Search"
          onChangeText={voice => searchFilter(voice)}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="#148AA0" />
        ) : (
          <View style={{ height: '60%' }}>
            <TouchableOpacity onPress={start}>
              <Icon name="microphone" size={25} color={'#148AA0'} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{ width: '30%', margin: 10, marginLeft: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DashboardScreen')}
          style={styles.dashBoardButton}>
          <Text style={{ color: 'white' }}> DashBoard </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filterData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  itemStyle: {
    padding: 10,
  },
  categoriesText: {
    color: 'black',
    fontSize: 18,
  },

  searchBar: {
    borderColor: '#565756',
    borderRadius: 9,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    marginTop: 30,
    marginHorizontal: 10,
  },
  dashBoardButton: {
    backgroundColor: '#148AA0',
    height: 43,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  categoriesWrapper: {
    backgroundColor: 'white',
    height: 55,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  categoryName: {
    padding: 12,
    fontSize: 20,
    marginLeft: 10,
    color: 'black',
  },
  iconStyle: {
    borderColor: '#3d3d3d',
    width: 40,
    borderRadius: 10,
    height: 40,
    borderWidth: 2,
    padding: 4,
    marginTop: 7,
    marginLeft: 10,
  },
  // iconWrapper: {
  //   borderWidth: 2,
  //   marginTop: 7,
  //   marginLeft: 10,
  //   borderColor: '#3d3d3d',
  //   borderRadius: 10,
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  chevronStyle: {
    marginTop: 18,
  },
});

Categories.propTypes = {
  user: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    item: state.patientItem.item,
  };
};


export default connect(mapStateToProps)(Categories);