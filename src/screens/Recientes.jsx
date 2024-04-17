import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Spinner } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';

const Todos = () => {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const response = await axios.get("https://taplibkback.onrender.com/api/recetas/active");
        setRecetas(response.data.recetas);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRecetas();
  }, []);

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <LinearGradient colors={['#141517', '#FFC107']} locations={[0.5, 8]} style={{ flex: 1 }}>
      <ScrollView>
        <Box alignItems="center" p={4}>
          <Heading size="lg" color="warmGray.50" mt={4} mb={2}>
            Todas las recetas
          </Heading>
          {recetas.map((receta) => (
            <Box key={receta._id} maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700"
            }} _web={{
              shadow: 2,
              borderWidth: 0
            }} _light={{
              backgroundColor: "gray.50"
            }} mb={4}>
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image source={{ uri: receta.image.secure_url }} alt={receta.nombre} />
                </AspectRatio>
                <Center bg="violet.500" _dark={{
                  bg: "violet.400"
                }} _text={{
                  color: "warmGray.50",
                  fontWeight: "700",
                  fontSize: "xs"
                }} position="absolute" bottom="0" px="3" py="1.5">
                  {receta.categoria}
                </Center>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    {receta.nombre}
                  </Heading>
                  <Text fontSize="xs" _light={{
                    color: "violet.500"
                  }} _dark={{
                    color: "violet.400"
                  }} fontWeight="500" ml="-0.5" mt="-1">
                    Duración: {receta.duracion}
                  </Text>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Box>
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
