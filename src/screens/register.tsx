import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios'; // Importar axios para realizar solicitudes HTTP
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        try {
            // Verificar que las contraseñas coincidan
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }

            // Realizar la solicitud de registro
            const response = await axios.post('https://taplibkback.onrender.com/api/register', {
                name,
                email,
                password,
            });

            // Procesar la respuesta
            console.log(response.data); // Manejar la respuesta según sea necesario

            // Navegar a la pantalla de inicio de sesión u otra pantalla
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error('Error al registrar:', error);
            // Manejar errores aquí
        }
    };

    return (
        <LinearGradient
            colors={['#141517', '#FFC107']}
            locations={[0.5, 0.8]}
            style={styles.container}
        >
            <View style={styles.header}>
                <Image source={require('../../assets/Logo.png')} style={styles.logo} />
                <Text style={styles.title}>¡Bienvenido!</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Nombre"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Correo Electrónico"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Confirmar Contraseña"
                        secureTextEntry={true}
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Crear Cuenta</Text>
            </TouchableOpacity>
            <View style={styles.separator}>
                <View style={styles.line} />
                <Text style={styles.separatorText}>Continuar Con:</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.googleButton}>
                    <FontAwesome name="google" size={30} color="#FF3D00" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.facebookButton}>
                    <MaterialIcons name="facebook" size={33} color="#1877F2" />
                </TouchableOpacity>
            </View>
            <View style={styles.loginAccount}>
                <Text style={styles.loginAccountText}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.loginAccountButton}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        paddingTop: 25,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 207,
        height: 63,
        marginBottom: 30,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 25,
        color: 'white',
    },
    form: {
        marginBottom: 10,
    },
    inputContainer: {
        alignItems: 'center',
        marginBottom: 18,
    },
    input: {
        height: 50,
        width: 289,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        fontSize: 18,
    },
    registerButton: {
        backgroundColor: '#FFC107',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 54,
        width: 170,
        marginBottom: 15,
        alignSelf: 'center',
    },
    registerButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 15,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'white',
        marginRight: 10,
        marginLeft: 10,
    },
    separatorText: {
        color: 'white',
        fontSize: 18,
    },
    socialButtons: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    googleButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        width: 70,
        height: 50,
        alignItems: 'center',
    },
    facebookButton: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
        width: 70,
        height: 50,
        alignItems: 'center',
    },
    loginAccount: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    loginAccountText: {
        marginRight: 5,
        color: 'black',
        fontSize: 18,
    },
    loginAccountButton: {
        color: '#FFC107',
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: 'black',
        width: 120,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 8,
    },
});

export default RegisterScreen;
