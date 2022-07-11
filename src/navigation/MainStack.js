//import liraries
import React from 'react';
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './Tabs';
import Register from '@Screen/Register'
import Profile from '@Screen/Profile'
import Categories from '@Screen/Categories'
import Dashboard from '@Screen/Dashboard'
import Tabs2 from './Tabs2';
import Temperature from '../screens/CategoriesScreens/Temperature';
import BloodPressure from '../screens/CategoriesScreens/BloodPressure'
import Injuries from '../screens/CategoriesScreens/Injuries';
import OxygenSaturation from '../screens/CategoriesScreens/OxygenSaturation';
import Medicines from '../screens/CategoriesScreens/Medicines';
import Opening from '@Screen/Opening'
import Loading from '@Screen/Loading'


// create a component
const MainStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Loading">
            <Stack.Screen name="HomeScreen" component={Tabs} /> 
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Patient" component={Tabs2} />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Temperature" component={Temperature} />
            <Stack.Screen name="BloodPressure" component={BloodPressure} />
            <Stack.Screen name="Injuries" component={Injuries} />
            <Stack.Screen name="OxygenSaturation" component={OxygenSaturation} />
            <Stack.Screen name="Medicines" component={Medicines} />
            <Stack.Screen name="Opening" component={Opening} />
        </Stack.Navigator>
    );
};

//make this component available to the app
export default MainStack;
