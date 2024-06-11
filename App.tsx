import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {MainStackNavigator} from './src/navigation/StackNavigator';

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning: ...']);

const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};
export default App;
