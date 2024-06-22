import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ExchangeRatesScreen from './src/screens/ExchangeRatesScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Exchange Rates" component={ExchangeRatesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
