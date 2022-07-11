//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Touchable, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setTokenInterceptor } from '../../utils/setTokenInterceptor';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

// create a component
const Opening = (props ) => {

    const { isLoggedIn, accessToken, user } = props;

    const navigation = useNavigation();

    useEffect(() => {
        if (isLoggedIn) {
            setTokenInterceptor(user)
        }
        navigation.navigate(!isLoggedIn ? 'Opening' : 'HomeScreen')

    })

    const renderPage = () => {
        return (
            <View style={{backgroundColor:'white', height: '100%'}}>
                <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('@Asset/health2.png')} style={{ width: '100%', height: '58%', resizeMode: "contain" }}></Image>
                    <Text style={styles.titletext}>CONTROLLED </Text>
                    <Text style={styles.titletext}>HEALTH </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}
                        style={styles.signup}>
                        <Text style={styles.buttontext}>
                            Sign up with Email
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}
                        style={styles.login}>
                        <Text style={styles.buttontext}>
                            Login
                        </Text>
                    </TouchableOpacity>


                </View>
            </View>
        )
    }



    // define your styles
    const styles = StyleSheet.create({
        titletext: {
            color: '#148AA0',
            fontSize: 45,
            fontWeight: 'bold'
        },
        buttontext: {
            color: 'white',
            fontWeight: 'bold',
            position: 'absolute'
        },
        signup: {
            backgroundColor: '#148AA0',
            height: scale(43),
            borderRadius: scale(20),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            marginTop: 30,
            width: '150%'
        },
        login: {
            backgroundColor: '#148AA0',
            height: scale(43),
            borderRadius: scale(20),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10, width: '70%'
        }
    });



    return (
        <View>
            {renderPage()}
        </View>
    );
};

Opening.propTypes = {
    user: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,

}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn,
        accessToken: state.auth.accessToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Opening);


//make this component available to the app
;
