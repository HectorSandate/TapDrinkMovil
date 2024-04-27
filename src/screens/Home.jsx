import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../components/context/AuthContext";

const Home = () => {
  const navigation = useNavigation();
  const [nombreCocktail, setNombreCocktail] = useState("");
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { user } = useAuth();

  const handleSearch = async () => {
    try {
      if (!nombreCocktail && !filtro) {
        setAlertMessage("Debes llenar por lo menos algún campo para realizar la búsqueda.");
        setTimeout(() => {
          setAlertMessage(""); // Limpiar la alerta después de 5 segundos
        }, 5000);
        return;
      }

      setLoading(true);

      let url = "https://taplibkback.onrender.com/api/recetas/active";

      if (nombreCocktail) {
        url += `/nombre/${nombreCocktail}`;
      } else if (filtro) {
        url += `/categoria/${filtro}`;
      }

      const response = await axios.get(url);

      if (response.data && response.data.length > 0) {
        navigation.navigate("ResultadosScreen", {
          nombreCocktail: nombreCocktail,
          filtro: filtro,
          recetas: response.data,
        });
      } else {
        setAlertMessage("No se encontraron recetas con esas características.");
        setTimeout(() => {
          setAlertMessage(""); // Limpiar la alerta después de 5 segundos
        }, 5000);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setAlertMessage("No se encontraron recetas con esas características.");
        setTimeout(() => {
          setAlertMessage(""); // Limpiar la alerta después de 5 segundos
        }, 5000);
      } else {
        console.error("Error al buscar recetas:", error);
      }
    } finally {
      setLoading(false);
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
        <Image source={require("../../assets/logoTap.png")} style={styles.logo} />
        <Text style={styles.title}>Busca y Pide Tu Coctel Favorito</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>
          {user && (
            <Text>
              Bienvenido {user.name}{"\n"}
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
            <ActivityIndicator color="black" />
          ) : (
            <Text style={styles.buttonText}>Buscar</Text>
          )}
        </TouchableOpacity>
      </View>

      {alertMessage !== "" && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>{alertMessage}</Text>
        </View>
      )}
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
    top: 15,
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
    backgroundColor: "#D9D9D9",
  },
  alertContainer: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  alertText: {
    color: "white",
    textAlign: "center",
  },
};

export default Home;
