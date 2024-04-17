import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa tus pantallas aquí
import RegisterScreen from './screens/register';
import LoginScreen from './screens/login';
import ResultadosScreen from './screens/ResultadosScreen';
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ResultadosScreen" component={ResultadosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
