// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Cargar el usuario desde AsyncStorage al iniciarse el contexto
        const loadUser = async () => {
            try {
                const savedUser = await AsyncStorage.getItem('user');
                if (savedUser !== null) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.log('Error al cargar el usuario desde AsyncStorage:', error);
            }
        };

        loadUser();
    }, []);

    const login = async (userData) => {
        setUser(userData);
        try {
            await AsyncStorage.setItem('user', JSON.stringify({
                userId: userData.userId,
                name: userData.name,
                nivel: userData.nivel
            }));
        } catch (error) {
            console.log('Error al guardar el usuario en AsyncStorage:', error);
        }
    };

    const logout = async () => {
        setUser(null);
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('email');
        } catch (error) {
            console.log('Error al eliminar el usuario de AsyncStorage:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
