import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';

// Importa tus pantallas aquí
import RegisterScreen from './src/screens/register';
import LoginScreen from './src/screens/login';
import BottomTabs from './src/BottomTabs';
import ResultadosScreen from './src/screens/ResultadosScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ResultadosScreen" component={ResultadosScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <StatusBar barStyle={'dark-content'} />
        <Navigation />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}