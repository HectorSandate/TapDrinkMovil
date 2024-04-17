import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Perfil from "./screens/Perfil";
import Favoritos from "./screens/Favoritos";
import Recientes from "./screens/Recientes";
import CustomBottomTab from "./components/BottomTabs/CustomBottomTab";


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return(
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
                options={{tabBarLabel: 'Favoritos'}}
                name="Favoritos"
                component={Favoritos}
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
    )
}