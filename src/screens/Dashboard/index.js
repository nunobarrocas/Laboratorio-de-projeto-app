import React, {useState, useEffect, useReducer} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const Dashboard = props => {
  const {updatePatient, item} = props;

  const [temperatures, setTemperatures] = useState(item.temperature);
  const [tempList, setTempList] = useState([]);
  const [tempDateList, setTempDateList] = useState([]);
  const [loading, isLoading] = useState(false);
  const [bloodP, setBloodP] = useState(item.bloodPressure[0]);
  const [oxyenSat, setOxygenSat] = useState(item.oxygenSaturation[0]);

  const hasTemperature = item.temperature.length > 0;

  const tempHandler = () => {
    for (let i = 0; i < 4; i++) {
      if (temperatures[i]) {
        // tempList.push(parseInt(temperatures[i].temp));
        // console.log(tempList);
        setTempList(prevState => {
          prevState.push(parseInt(temperatures[i].temp));
          return [...prevState];
        });
        setTempDateList(prevState => {
          prevState.push(temperatures[i].date);
          return [...prevState];
        });
      }
    }
  };

  const data = {
    labels: tempDateList,
    datasets: [
      {
        data: tempList,
      },
    ],
  };

  useEffect(() => {   
    tempHandler();
    isLoading(true);   
  }, []);

  if (loading) {
    return (
      <LinearGradient
        colors={['white', '#19b5d1', '#148AA0']}
        style={{height: '100%'}}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: '25%'}}>
            <Text style={styles.titleText}>DashBoard</Text>
          </View>
        </View>
        <View style={{marginTop: 10, marginLeft: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#148AA0'}}>
            {item.name}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              marginTop: 10,
              color: 'black',
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            Temperature
          </Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {hasTemperature ? (
              <LineChart
                data={data}
                width={370} // from react-native
                height={220}
                yAxisSuffix="ºC"
                yAxisInterval={2} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: '#148AA0',
                  backgroundGradientFrom: '#148AA0',
                  backgroundGradientTo: '#19b5d1',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#085e6e',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            ) : (
              <View>
                <LinearGradient
                  colors={['#19b5d1', '#148AA0']}
                  style={{
                    width: 370,
                    height: 220,
                    borderRadius: 16,
                    marginVertical: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.tempNoValue}>No values</Text>
                </LinearGradient>
              </View>
            )}
          </View>
          <View style={{height: '40%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 20,
                  color: 'black',
                  fontWeight: 'bold',
                  marginLeft: 15,
                }}>
                Blood Pressure
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 20,
                  color: 'black',
                  fontWeight: 'bold',
                  marginRight: 15,
                }}>
                Oxygen Saturation
              </Text>
            </View>
            <View style={styles.outerContainer}>
              <View style={styles.cardContainer}>
                <View style={styles.gifContainer}>
                  {bloodP ? (
                    <Text style={styles.bloodPTextHigh}>
                      {item.bloodPressure[0].high}
                    </Text>
                  ) : (
                    <Text style={styles.bloodPTextHigh}>No value</Text>
                  )}

                  <LottieView
                    source={require('../../assets/lf20_dxb2hrmt.json')}
                    autoPlay
                    loop
                  />
                  {bloodP ? (
                    <Text style={styles.bloodPTextLow}>
                      {item.bloodPressure[0].low}
                    </Text>
                  ) : (
                    <Text style={styles.bloodPTextLow}>No value</Text>
                  )}
                </View>
              </View>
              <View style={styles.cardContainer}>
                <View style={styles.gifContainer}>
                  <View style={{height: '40%', width: '50%'}}>
                    <LottieView
                      source={require('../../assets/lf20_hz8sbbfc.json')}
                      autoPlay
                      loop
                    />
                  </View>
                </View>
                {oxyenSat ? (
                  <View style={styles.oxygenContainer}>
                    <View>
                      <Text style={styles.oxygnText}>
                        {item.oxygenSaturation[0].oxyg}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.oxygenContainer}>
                    <Text style={styles.oxygnText}>00</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  } else {
    return (
      <ActivityIndicator size={70} color="#148AA0" style={{marginTop: 60}} />
    );
  }
};

const styles = StyleSheet.create({
  tempNoValue: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
  },
  oxygenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '60%',
    bottom: 0,
    right: 0,
    marginBottom: 20,
    marginRight: 15,
    borderWidth: 5,
    borderColor: '#148AA0',
    borderRadius: 90,
  },
  oxygnText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    borderWidth: 5,
    borderRadius: 90,
    padding: 20,
    borderColor: 'white',
    backgroundColor: '#148AA0',
  },
  bloodPTextHigh: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 20,
    color: 'black',
  },
  bloodPTextLow: {
    bottom: 0,
    position: 'absolute',
    right: 0,
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
    marginRight: 25,
    color: 'black',
  },
  titleText: {
    color: '#148AA0',
    fontSize: 20,
    borderBottomWidth: 2,
    borderColor: '#e8e8e8',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  gifContainer: {
    height: 220,
    width: 175,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  outerContainer: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  cardContainer: {
    justifyContent: 'center',
    width: '45%',
    height: '100%',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 25,
    marginHorizontal: 10,
    marginTop: 15,
  },
});

Dashboard.propTypes = {
  item: PropTypes.object.isRequired,
  updatePatient: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    item: state.patientItem.item,
  };
};

const mapDispachToProps = dispatch => ({
  updatePatient: item => dispatch(patientActions.updatePatient(item)),
});

export default connect(mapStateToProps, mapDispachToProps)(Dashboard);

//make this component available to the app