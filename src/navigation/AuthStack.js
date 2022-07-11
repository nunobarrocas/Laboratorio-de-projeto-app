//import liraries
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Opening from '@Screen/Opening'
import Login from '@Screen/Login'
import SignUp from '@Screen/SignUp'
import Tabs from './Tabs';

// create a component
const AuthStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }} 
            initialRouteName="Opening">           
            <Stack.Screen name="Opening" component={Opening} />
            <Stack.Screen name="HomeScreen" component={Tabs} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />            
        </Stack.Navigator>
    );
};

//make this component available to the app
export default AuthStack;
