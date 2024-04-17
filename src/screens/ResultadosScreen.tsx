import React from "react";
import { ScrollView, Box, Heading, AspectRatio, Image, Text, Center, Button } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { position } from "native-base/lib/typescript/theme/styled-system";

const ResultadosScreen = ({ route, navigation }) => {
  console.log("Datos recibidos en la pantalla de resultados:", route.params);

  const { recetas, nombreCocktail, filtro } = route.params;
  const titulo = nombreCocktail ? `Resultados de búsqueda: ${nombreCocktail}` : `Resultados de búsqueda: ${filtro}`;

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
      <Box style={styles.scrollViewContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {recetas.map((receta, index) => (
            <Box key={index} style={styles.recetaContainer}>
              <Box style={styles.imageContainer}>
                <AspectRatio ratio={16 / 9}>
                  <Image source={{ uri: receta.image.secure_url || '' }} alt={receta.nombre || ''} />
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
              </Box>
              <Box>
                <Button style={styles.pedir}>
                  <Text style={styles.textPedir}>Pedir</Text>
                </Button>
              </Box>
            </Box>
          ))}
        </ScrollView>
      </Box>
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
    paddingBottom: 20,
    paddingLeft: 20,
    alignItems: 'flex-start',
  },
  titulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 25,
  },
  scrollViewContainer: {
    flex: 1,
    paddingTop: 20, 
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  recetaContainer: {
    width: '80%',
    marginBottom: 20,
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
  },
  pedir: {
    backgroundColor: 'black',
    borderRadius: 10,
    width: 100, 
    height: 40, 
    justifyContent: 'center', 
    alignSelf: 'flex-end', 
    marginRight: 10,
    marginBottom: 10,
  },
  textPedir: {
    fontSize: 18, 
    color: 'white', 
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    top: 20,
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
