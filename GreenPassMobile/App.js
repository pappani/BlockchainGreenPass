import React from 'react';
import Scanner from './screens/Scanner';
import Home from './screens/Home';
import Certificate from './screens/Certificate';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
function App() {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="Certificate" component={Certificate} options={{headerLeft: (props) => null}} />
      </Stack.Navigator>
    );
}

export default () => {
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}