import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  Stack,
  NativeBaseProvider,
  Spinner,
  ScrollView,
  Button,
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";

import Paho from "paho-mqtt";
import { useNavigation } from '@react-navigation/native'; // Importa la función useNavigation

const Todos = () => {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const navigation = useNavigation(); // Obtiene el objeto de navegación

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

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const response = await axios.get(
          "https://taplibkback.onrender.com/api/recetas/active"
        );
        setRecetas(response.data.recetas);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRecetas();
  }, []);

  const enviarDatos = (procedimiento, nombreReceta) => {
    if (connected) {
      const mensaje = `${procedimiento}`;
      console.log("Enviando procedimiento: ", procedimiento);
      client.current.send("recetas/procedimiento", mensaje);
      
      // Navega a la pantalla de favoritos y pasa el nombre de la receta como parámetro
      navigation.navigate('Favoritos', { nombreReceta });
    } else {
      console.log("No se puede enviar el mensaje. Cliente MQTT no conectado.");
    }
  };

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner size="lg" />
      </Center>
    );
  }

  // Agrupar recetas por categoría
  const recetasPorCategoria = recetas.reduce((acc, receta) => {
    acc[receta.categoria] = [...(acc[receta.categoria] || []), receta];
    return acc;
  }, {});

  return (
    <LinearGradient
      colors={["#141517", "#FFC107"]}
      locations={[0.5, 8]}
      style={{ flex: 1 }}
    >
      <ScrollView stickyHeaderIndices={[0]}>
        {Object.entries(recetasPorCategoria).map(
          ([categoria, recetasDeCategoria]) => (
            <Box key={categoria}>
              <Box bg="black" py={4}>
                <Heading marginTop={15} size="md" ml="4" color="white">
                  {categoria}
                </Heading>
              </Box>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              >
                {recetasDeCategoria.map((receta) => (
                  <Box
                    key={receta._id}
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    borderWidth="1"
                    _dark={{
                      borderColor: "coolGray.600",
                      backgroundColor: "gray.700",
                    }}
                    _web={{
                      shadow: 2,
                      borderWidth: 0,
                    }}
                    _light={{
                      backgroundColor: "gray.50",
                    }}
                    mx={2}
                  >
                    <Box>
                      <AspectRatio ratio={16 / 9} h={200}>
                        <Image
                          source={{
                            uri:
                              receta.image && receta.image.secure_url
                                ? receta.image.secure_url
                                : "URL_DE_IMAGEN_POR_DEFECTO",
                          }}
                          alt={receta.nombre}
                          resizeMode="cover"
                        />
                      </AspectRatio>
                      <Center
                        bg="violet.500"
                        _dark={{
                          bg: "violet.400",
                        }}
                        _text={{
                          color: "warmGray.50",
                          fontWeight: "700",
                          fontSize: "xs",
                        }}
                        position="absolute"
                        bottom="0"
                        px="3"
                        py="1.5"
                        w="100%"
                      >
                        {receta.categoria}
                      </Center>
                    </Box>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Heading size="md" ml="-1">
                          {receta.nombre}
                        </Heading>
                        <Text
                          fontSize="xs"
                          _light={{
                            color: "violet.500",
                          }}
                          _dark={{
                            color: "violet.400",
                          }}
                          fontWeight="500"
                          ml="-0.5"
                          mt="-1"
                        >
                          Duración: {receta.duracion}
                        </Text>
                        {/* Botón "Pedir" dentro de cada tarjeta */}
                        <Button
                          bg="black"
                          _text={{ color: "white", fontSize: 18 }}
                          size="xs"
                          onPress={() => enviarDatos(receta.procedimiento, receta.nombre)}
                          position="absolute"
                          bottom={2}
                          right={2}
                        >
                          Pedir
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </ScrollView>
            </Box>
          )
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Todos />
    </NativeBaseProvider>
  );
};