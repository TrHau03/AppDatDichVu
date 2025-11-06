import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { StatusBarStyleEnum } from '../../config/statusBar';
import Home from '../../screens/Home';
import { RootStackEnum } from './type';

const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <>
      <StatusBar animated barStyle={StatusBarStyleEnum.dark} />
      <Stack.Navigator
        initialRouteName={RootStackEnum.Home}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={RootStackEnum.Home} component={Home} />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;
