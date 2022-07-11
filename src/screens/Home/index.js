//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { getPatients } from '@Api/Register';

import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import * as patientActions from '@Action/patient.js';
import { Avatar } from 'react-native-paper';

// create a component
const Home = props => {
    const navigation = useNavigation();
    const { user, updateCounter, counter } = props;

    
    const [username, setusername] = useState(user.name);
    const [pdata, setData] = useState([]);    

    useFocusEffect(
        React.useCallback(() => {
            setusername(user.name);
            getPatients(user._id)
                .then(res => setData(res.data))
            updateCounter(1)
            return () => setusername(user.name);
        }, []),
    );

    useEffect(() => {
        return () => {
            setData({}); //cleanup
        };
    }, []);

    const getAge = (birthdate) => {
        const year = birthdate.slice(-4);
        const day = birthdate.slice(0, 2);
        const month = birthdate.slice(3, 5);

        const iyear = parseInt(year, 10);
        const iday = parseInt(day, 10);
        const imonth = parseInt(month, 10)

        const dat = Date.now();
        const time = new Date(dat)
        const tday = parseInt(time.getDate());
        const tmonth = parseInt(time.getMonth());
        const tyear = parseInt(time.getFullYear());

        let age

        age = Math.abs(tyear - year)

        if (month > tmonth) {
            age = age + 1
            return age
        }
        if (month == tmonth && day > tday) {
            age = age + 1
            return age
        } else {
            return age
        }
    }

    const renderPage = () => {

        return (
            <View style={{ backgroundColor: '#148AA0', height: '100%' }}>
                <FocusAwareStatusBar barStyle="dark-content" backgroundColor={'#148AA0'} />
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <View>
                            <Text style={styles.helloText}>Hello!</Text>
                            <Text style={styles.userText}>{username}</Text>
                        </View>
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.text}> Patients </Text>
                    </View>
                    <View style={styles.lowerContainer}>
                        <FlatList
                            style={{ width: '100%' }}
                            keyExtractor={item => item._id}
                            data={Object.values(pdata)}
                            horizontal={true}
                            contentContainerStyle={{ alignItems: 'center', }}
                            renderItem={({ item, index }) => {
                                const age = getAge(item.birthdate)
                                return (
                                    <TouchableOpacity style={styles.cardShadow}
                                        key={index}
                                        data={item}
                                        activeOpacity={0.7}
                                        onPress={() =>
                                            navigation.navigate('Patient', {
                                                screen: 'PatientScreen',
                                                params: { curr_patient: item },
                                            })
                                        }>
                                        <View style={styles.wrapperPatient}>
                                            <View
                                            >
                                                <View style={styles.avatarUser}>
                                                    <Avatar.Image
                                                        size={90}
                                                        backgroundColor={'white'}
                                                        source={ item.avatar == '' ? require('@Asset/profilepic.jpg') : {uri: item.avatar}}
                                                        style={{ marginTop: 20 }}
                                                    />
                                                </View>
                                                {/* <CAvatar size={90} profileImage={item.avatar} style={{ marginTop: 20 }} /> */}
                                                <Text style={styles.PatientName}>{item.name}</Text>
                                                <Text style={styles.PatientName}>{age}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                    <View style={styles.outContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>CONTROLLED {'\n'}HEALTH</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return <View>{renderPage()}</View>;
};

const styles = StyleSheet.create({
    cardShadow: {
        marginHorizontal: 5,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 10,
    },
    titleText: {
        color: '#148AA0',
        fontSize: 45,
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 10,

    },
    wrapper: {
        borderWidth: 1,
        width: '100%',
    },
    wrapperPatient: {
        height: 230,
        width: 175,
        alignItems: 'center',
        marginHorizontal: 7,
        borderRadius: 15,
        backgroundColor: 'white'
    },
    textWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '35%',
        height: '6%',
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 10,
    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center'
    },
    helloText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 150,
    },
    userText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 0,
    },

    PatientName: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
    },
    upperContainer: {
        flex: 1,
        backgroundColor: '#148AA0',
        alignContent: 'center',
        justifyContent: 'center',
    },
    lowerContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 40,
        shadowColor: 'black',
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 10,

    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    outContainer: {
        position: 'absolute',
        width: '100%',
        height: '50%',
        alignItems: 'center',
    },
    titleContainer: {
        backgroundColor: 'white',
        height: '50%',
        width: '85%',
        // borderTopLeftRadius: 20,
        // borderBottomRightRadius: 20,
        borderRadius: 20,
        shadowColor: 'red',
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarUser: {
        alignItems: 'center',
    },
});

Home.propTypes = {
    user: PropTypes.object.isRequired,
    counter: PropTypes.number.isRequired,
    updateCounter: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        counter: state.patientItem.counter,
    };
};

const mapDispachToProps = dispatch => ({
    updateCounter: counter => dispatch(patientActions.updateCounter(counter)),
});

export default connect(mapStateToProps, mapDispachToProps)(Home);