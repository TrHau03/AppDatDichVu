import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { StatusBarStyleEnum } from '../../config/statusBar';
import BookService from '../../screens/BookService';
import Home from '../../screens/Home';
import PaymentMethod from '../../screens/PaymentMethod';
import ServiceDetail from '../../screens/ServiceDetail';
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
        <Stack.Screen
          name={RootStackEnum.ServiceDetail}
          component={ServiceDetail}
        />
        <Stack.Screen
          name={RootStackEnum.BookService}
          component={BookService}
        />
        <Stack.Screen
          name={RootStackEnum.PaymentMethod}
          component={PaymentMethod}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;
