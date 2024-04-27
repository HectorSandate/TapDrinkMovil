import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet } from 'react-native';
import { LiquidGaugeProgress } from '../components/LiquidGaugeProgress';

const MyComponent = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LiquidGaugeProgress size={200} value={45} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    width: '90%',
  },
});

export default MyComponent;