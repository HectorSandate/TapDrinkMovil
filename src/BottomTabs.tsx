import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Perfil from "./screens/Perfil";
import Favoritos from "./screens/Favoritos";
import Recientes from "./screens/Recientes";
import Admin from "./screens/Admin"; // Importa la pantalla Admin
import CustomBottomTab from "./components/BottomTabs/CustomBottomTab";
import { useAuth } from "./components/context/AuthContext";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    const { user } = useAuth(); // Obtén la información del usuario desde el contexto de autenticación

    return (
        <Tab.Navigator tabBar={props => <CustomBottomTab {...props}/>}>
            <Tab.Group
                screenOptions={{
                    headerShown: false,
                }}>
                <Tab.Screen
                    options={{tabBarLabel: 'Inicio'}}
                    name="Inicio"
                    component={Home}
                />

                <Tab.Screen
                    options={{tabBarLabel: 'Progreso'}}
                    name="Favoritos"
                    component={user.nivel === "admin" ? Admin : Favoritos} // Verifica el nivel del usuario
                />

                <Tab.Screen
                    options={{tabBarLabel: 'Todos'}}
                    name="Recientes"
                    component={Recientes}
                />

                <Tab.Screen
                    options={{tabBarLabel: 'Perfil'}}
                    name="Perfil"
                    component={Perfil}
                />
            </Tab.Group>
        </Tab.Navigator>
    );
}

