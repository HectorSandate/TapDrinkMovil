import React, { useEffect, useState, useRef } from "react";
import { ScrollView, Box, Heading, AspectRatio, Image, Text, Center, Button } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import Paho from "paho-mqtt";

const ResultadosScreen = ({ route, navigation }) => {
  console.log("Datos recibidos en la pantalla de resultados:", route.params);

  const { recetas, nombreCocktail, filtro } = route.params;
  const titulo = nombreCocktail ? `Resultados de búsqueda: ${nombreCocktail}` : `Resultados de búsqueda: ${filtro}`;

  const [connected, setConnected] = useState(false);
  const client = useRef(null);

  useEffect(() => {
    client.current = new Paho.Client(
      "test.mosquitto.org",
      8080,
      "recetas/procedimiento"
    );

    client.current.connect({
      onSuccess: () => {
        console.log("Conectado");
        setConnected(true);
      },
      onFailure: () => {
        console.log("Fallo la conexión");
        setConnected(false);
      },
    });

    return () => {
      if (client.current.isConnected()) {
        client.current.disconnect();
      }
    };
  }, []);

  const enviarDatos = (procedimiento) => {
    if (connected) {
      const mensaje = `${procedimiento}`;
      console.log("Enviando procedimiento: ", procedimiento);
      client.current.send("recetas/procedimiento", mensaje);
    } else {
      console.log("No se puede enviar el mensaje. Cliente MQTT no conectado.");
    }
  };

  if (!recetas || recetas.length === 0) {
    console.log("No hay recetas disponibles.");
    return (
      <Center flex={1}>
        <Text>No se encontraron recetas.</Text>
        <Button onPress={() => navigation.goBack()} style={styles.button}>
          Volver
        </Button>
      </Center>
    );
  }

  console.log("Recetas recibidas:", recetas);

  return (
    <LinearGradient colors={['#141517', '#FFC107']} locations={[0.5, 8]} style={styles.container}>
      <Box style={styles.header}>
        <Text style={styles.titulo}>{titulo}</Text>
      </Box>
      <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
        {recetas.map((receta, index) => (
          <Box key={index} style={styles.recetaContainer}>
            <Box style={styles.imageContainer}>
              <AspectRatio ratio={1 / 1}>
                <Image
                  source={{ uri: receta.image && receta.image.secure_url ? receta.image.secure_url : 'https://via.placeholder.com/200' }}
                  alt={receta.nombre || ''}
                  resizeMode="cover"
                  style={styles.image}
                />              
              </AspectRatio>
              <Center style={styles.categoriaContainer}>
                <Text style={styles.categoriaText}>{receta.categoria || ''}</Text>
              </Center>
            </Box>
            <Box style={styles.textContainer}>
              <Heading size="md" style={styles.nombreText}>
                {receta.nombre || ''}
              </Heading>
              <Text style={styles.duracionText}>
                Duración: {receta.duracion || ''}
              </Text>
              <Text style={styles.procedimientoText}>
                {receta.procedimiento || ''}
              </Text>
            </Box>
            <Button style={styles.pedir} onPress={() => enviarDatos(receta.procedimiento)}>
              <Text style={styles.textPedir}>Pedir</Text>
            </Button>
          </Box>
        ))}
      </ScrollView>
      <Button onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.textPedir}>Volver</Text>
      </Button>
    </LinearGradient>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingLeft: 20,
    alignItems: 'flex-start',
  },
  titulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 35,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  recetaContainer: {
    width: 300,
    marginRight: 20,
    marginVertical: 90,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    height: 200,
  },
  categoriaContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgb(159, 122, 219)',
    padding: 6,
  },
  categoriaText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  textContainer: {
    padding: 10,
  },
  nombreText: {
    marginBottom: 5,
  },
  duracionText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  procedimientoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    maxHeight: 50, // Ajusta la altura máxima del texto del procedimiento
    overflow: 'hidden', // Oculta el exceso de texto
  },
  pedir: {
    backgroundColor: 'black',
    borderRadius: 10,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10, // Agrega margen inferior al botón
  },
  textPedir: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    top: 35,
    left: 20,
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

export default ResultadosScreen;
