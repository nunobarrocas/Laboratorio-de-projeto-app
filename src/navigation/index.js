//import liraries
import React, { useEffect } from 'react';
import AuthStack from '@Navigation/AuthStack'
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import Constant from '@Constant'
import MainStack from '@Navigation/MainStack';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { setTokenInterceptor } from '../utils/setTokenInterceptor';


const {BASE_URL} = Constant


// create a component
const RootNavigation = (props) => {

    const {isLoggedIn, accessToken} = props

    const setUrlConfig = () =>{        
        axios.defaults.baseURL = BASE_URL
    }

    useEffect(() => {
        setUrlConfig()
        if(isLoggedIn) {            
            setTokenInterceptor(props.user)
        }        
    }, [])

    return (
        <NavigationContainer>
            {!isLoggedIn ? (
                <AuthStack/>

            ) : (
                <MainStack/>
            )}            
        </NavigationContainer>
    );
};

RootNavigation.propTypes = {
    user: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  };

const mapStateToProps = state => {
    return {
      user: state.auth.user,
      isLoggedIn: state.auth.isLoggedIn,
      accessToken: state.auth.accessToken
    };
  };

  const mapDispachToProps = dispatch => {return {}};

//make this component available to the app
export default connect(mapStateToProps, mapDispachToProps)(RootNavigation) ;