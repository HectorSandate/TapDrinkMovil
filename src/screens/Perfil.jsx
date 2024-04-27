// Modificar Perfil
import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { Icon, Input, NativeBaseProvider, Stack, Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker'; 
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP
import { useAuth } from "../components/context/AuthContext"; //IMPORTANTE 

const ProfileEditor = () => {
  const [show, setShow] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // Estado para almacenar la imagen seleccionada
  const { user } = useAuth(); // Usando el contexto para obtener la información del usuario

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access camera roll is required!');
      }
    })();
  }, []);

  const handleImageClick = () => {
    setModalVisible(true);
  };

  const handleSelectImage = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!pickerResult.cancelled) {
        setSelectedImage(pickerResult.uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const handleConfirmChanges = async () => {
    try {
      const userId = user.userId; // Obtener el ID del usuario actual
      const userData = {
        name,
        email,
        password,
        confirmPassword,
        image: selectedImage, // Agrega la imagen seleccionada a los datos del usuario
      };
      const response = await axios.put(`https://taplibkback.onrender.com/api/user/${userId}`, userData);
      console.log('Cambios confirmados:', response.data);
    } catch (error) {
      console.error('Error al confirmar los cambios:', error);
    }
  };
  
  

  return (
    <LinearGradient
      colors={['#141517', '#FFC107']}
      locations={[0.5, 0.8]}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Modificar Perfil</Text>
      </View>
      <Stack space={4} w="100%" alignItems="center">
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.profileImageContainer} onPress={handleImageClick}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.profileImage} />
            ) : (
              <Image source={require('../../assets/defaultuser.jpg')} style={styles.profileImage} />
            )}
          </TouchableOpacity>
        </View>
        <Input
          w={{base: "75%",md: "25%"}}
          value={name}
          onChangeText={(text) => setName(text)}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="person" />} size={5} ml="2" color="black"  
            />
          }
          placeholder="Nombre"
          _light={{ backgroundColor: '#D9D9D9' }} 
        />
        <Input
          w={{base: "75%", md: "25%" }}
          value={email}
          onChangeText={(text) => setEmail(text)}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="email" />} size={5} ml="2" color="black" 
            />
          }
          placeholder="Correo"
          _light={{ backgroundColor: '#D9D9D9' }}
        />
        <Input
          w={{base: "75%", md: "25%"}}
          value={password}
          onChangeText={(text) => setPassword(text)}
          type={show ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="black" 
              />
            </Pressable>
          }
          placeholder="Contraseña"
          _light={{ backgroundColor: '#D9D9D9' }} 
        />
        <Input
          w={{base: "75%", md: "25%"}}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          type={show ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="black" 
              />
            </Pressable>
          }
          placeholder="Confirmar Contraseña"
          _light={{ backgroundColor: '#D9D9D9' }} 
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleConfirmChanges}>
            <Text style={styles.buttonText}>Confirmar Cambios</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Image
              source={require('../../assets/defaultuser.jpg')}
              style={styles.modalImage}
            />
          </View>
        </Modal>
      </Stack>
    </LinearGradient>
  );
};

const styles={
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 25,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 25
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginTop: 35
  },
  imageContainer: {
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    width: 220,
    height: 50,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFC107',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
};

const App = () => {
  return (
    <NativeBaseProvider>
      <ProfileEditor />
    </NativeBaseProvider>
  );
};

export default App;
