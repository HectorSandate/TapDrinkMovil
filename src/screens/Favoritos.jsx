import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Image } from 'react-native';
import { LiquidGaugeProgress } from '../components/LiquidGaugeProgress';
import { LinearGradient } from "expo-linear-gradient";
import Paho from 'paho-mqtt';

const FavoritosScreen = ({ route }) => {
  const selectedDrink = "Bebida 1"; // Aquí debes colocar el nombre de la bebida seleccionada
  const componentAlreadyExists = "Componente Ya Existente"; // Aquí debes colocar el nombre del componente ya existente

  const [progress, setProgress] = useState(0);
  const [nombreReceta, setNombreReceta] = useState(""); // Estado local para almacenar el nombre de la receta

  const client = new Paho.Client(
    "test.mosquitto.org",
    8080,
    "progreso/bebida"
  );

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Conectado a MQTT");
        client.subscribe("/progreso/bebida");
      },
      onFailure: () => {
        console.log("Fallo la conexión a MQTT");
      },
    });

    client.onMessageArrived = (message) => {
      const newProgress = parseInt(message.payloadString);
      setProgress((prevProgress) => prevProgress + newProgress);
    };

    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
  }, []);

  // Actualiza el nombre de la receta cuando se recibe un nuevo nombre a través de route.params
  useEffect(() => {
    const { nombreReceta } = route.params || {};
    if (nombreReceta) {
      setNombreReceta(nombreReceta);
    }
  }, [route.params]);

  return (
    <LinearGradient
      colors={["#141517", "#FFC107"]}
      locations={[0.5, 8]}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logoTap.png')} // Aquí debes colocar la ruta de tu imagen
          style={styles.logo}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Bebida en curso:</Text>
        <Text style={styles.selectedDrink}>{nombreReceta || selectedDrink}</Text>
      </View>
      <View style={styles.progressContainer}>
        <LiquidGaugeProgress size={200} value={progress} />
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginTop: 40,
  },
  logo: {
    width: 207,
    height: 65,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  selectedDrink: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  },
});

export default FavoritosScreen;
