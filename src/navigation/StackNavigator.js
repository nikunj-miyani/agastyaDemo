import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import AgastyaAI from '../screens/AgastyaAI';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AgastyaAI" component={AgastyaAI} />
    </Stack.Navigator>
  );
};

export {MainStackNavigator};
