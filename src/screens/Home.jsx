import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native"; // Importa ActivityIndicator desde react-native
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../components/context/AuthContext"; //IMPORTANTE 

const Home = () => {
  const navigation = useNavigation();
  const [nombreCocktail, setNombreCocktail] = useState("");
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar el estado de carga
  const { user } = useAuth(); // Usando el contexto para obtener la información del usuario

  const handleSearch = async () => {
    try {
      if (!nombreCocktail && !filtro) {
        Alert.alert(
          "Advertencia",
          "Debes llenar por lo menos algún campo para realizar la búsqueda."
        );
        return;
      }

      setLoading(true); // Establecer el estado de carga a true al iniciar la búsqueda

      let url = "https://taplibkback.onrender.com/api/recetas/active";

      if (nombreCocktail) {
        url += `/nombre/${nombreCocktail}`;
      } else if (filtro) {
        url += `/categoria/${filtro}`;
      }

      const response = await axios.get(url);
      console.log("Respuesta del servidor:", response.data);

      if (response.data && response.data.length > 0) {
        navigation.navigate("ResultadosScreen", {
          nombreCocktail: nombreCocktail,
          filtro: filtro,
          recetas: response.data,
        });
      } else {
        Alert.alert(
          "Información",
          "No se encontraron recetas con esas características."
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert(
          "Error",
          "No se encontraron recetas con esas características."
        );
      } else {
        console.error("Error al buscar recetas:", error);
      }
    } finally {
      setLoading(false); // Establecer el estado de carga a false al finalizar la búsqueda
    }
  };

  const handleClearFilter = () => {
    setFiltro("");
  };

  return (
    <LinearGradient
      colors={["#141517", "#FFC107"]}
      locations={[0.5, 8]}
      style={styles.container}
    >
      <View style={styles.imageTextContainer}>
        <Image source={require("../../assets/Logo.png")} style={styles.logo} />
        <Text style={styles.title}>Busca y Pide Tu Coctel Favorito</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>
          {user && (
            <Text>
              Bienvenido, {user.name} Nivel: {user.nivel}
            </Text>
          )}
          <Text>
            Siente el ritmo, Disfruta El Sabor,{"\n"}
            Con un solo Toque
          </Text>
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nombre Del Coctel"
          style={styles.input}
          value={nombreCocktail}
          onChangeText={setNombreCocktail}
        />
      </View>
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={filtro}
          onValueChange={(itemValue, itemIndex) => setFiltro(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          placeholder="Filtrar"
        >
          <Picker.Item label="Filtrar" value="" />
          <Picker.Item label="Con Alcohol" value="Con alcohol" />
          <Picker.Item label="Sin Alcohol" value="Sin alcohol" />
        </Picker>
        <TouchableOpacity
          onPress={handleClearFilter}
          style={styles.filterButton}
        >
          <Image
            source={require("../../assets/sin-filtro.png")}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSearch}
          style={[styles.button, loading && styles.disabledButton]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="black" /> // Mostrar icono de carga si loading es true
          ) : (
            <Text style={styles.buttonText}>Buscar</Text>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 25,
  },
  imageTextContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 207,
    height: 63,
    marginBottom: 34,
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainer: {
    marginBottom: 50,
  },
  subtitle: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 41,
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#D9D9D9",
    marginBottom: 41,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  pickerItem: {
    fontSize: 16,
    color: "black",
  },
  filterButton: {
    padding: 10,
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: "#777777",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 41,
    width: "100%",
  },
  button: {
    width: 174,
    height: 50,
    backgroundColor: "#FFC107",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#D9D9D9", // Cambia el color del botón cuando está deshabilitado
  },
};

export default Home;
