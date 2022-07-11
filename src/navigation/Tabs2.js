//import liraries
import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Patient from '@Screen/Patient';
import Categories from '@Screen/Categories';
import Profile from '@Screen/Profile';
import Dashboard from '@Screen/Dashboard';
import {moderateScale} from 'react-native-size-matters';

// create a component
const Tabs2 = ({route, navigation}) => {
  const Tab2 = createBottomTabNavigator();
  const curr_patient = route.params.curr_patient
  return (
    <Tab2.Navigator
      screenOptions={{
        activeTintColor: '#148AA0',
        inactiveTintColor: '#9ea9b3',
        headerShown: false,
        tabStyle: {
          marginVertical: moderateScale(10),
        },
        tabBarShowLabel: false,
      }}>
      <Tab2.Screen
        name="PatientScreen"
        component={Patient}
        initialParams={{curr_patient: curr_patient}}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="hospital-user" size={size} color={color}/>
          ),
        }}
      />

      <Tab2.Screen
        name="CategoriesScreen"
        component={Categories}
        //initialParams={{curr_patient: curr_patient}}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="plus-square" size={size} color={color} />
          ),
        }}
      />

      <Tab2.Screen
        name="DashboardScreen"
        component={Dashboard}
        //initialParams={{curr_patient: curr_patient}}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="clipboard" size={size} color={color} />
          ),
        }}
      />

      <Tab2.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="user-cog" size={size} color={color} />
          ),
        }}
      />
    </Tab2.Navigator>


  );
};

//make this component available to the app
export default Tabs2;