//import liraries
import React from 'react';
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from '@Screen/Home'
import Register from '@Screen/Register'
import Profile from '@Screen/Profile'
import { moderateScale } from 'react-native-size-matters';

// create a component
const Tabs = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
                activeTintColor: '#148AA0',
                inactiveTintColor: '#9ea9b3',
                headerShown: false,
                tabStyle: {
                    marginVertical: moderateScale(10)
                },
                tabBarShowLabel: false            
            }}>
            <Tab.Screen
                name="HomeScreenTab"
                component={Home}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="home" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Register"
                component={Register}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="plus-square" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="user-cog" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator >
    )
}

//make this component available to the app
export default Tabs;
