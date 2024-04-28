import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const Admin = () => {
  const [recetasCount, setRecetasCount] = useState(0);
  const [licoresCount, setLicoresCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [licor, setLicor] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Obtener el número de recetas activas
      const recetasResponse = await axios.get(
        "https://taplibkback.onrender.com/api/recetas/active"
      );
      setRecetasCount(recetasResponse.data.recetas.length);

      // Obtener el número de licores activos
      const licoresResponse = await axios.get(
        "https://taplibkback.onrender.com/api/licores/active"
      );
      console.log("Respuesta de la API:", licoresResponse.data);
      setLicoresCount(licoresResponse.data.licor.length);
      setLicor(licoresResponse.data.licor);

      // Obtener el número de usuarios activos
      const usersResponse = await axios.get(
        "https://taplibkback.onrender.com/api/users/active"
      );
      setUsersCount(usersResponse.data.users.length);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#141517", "#FFC107"]}
      locations={[0.5, 8]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Text style={styles.gridText}>Recetas Registradas:</Text>
            <Text style={styles.quantityText}>{recetasCount}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridText}>Bebidas solicitadas:</Text>
            <Text style={styles.quantityText}>15</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridText}>Licores Registrados:</Text>
            <Text style={styles.quantityText}>{licoresCount}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridText}>Usuarios Registrados:</Text>
            <Text style={styles.quantityText}>{usersCount}</Text>
          </View>
        </View>
        <View style={styles.liquorsContainer}>
          <Text style={styles.header}>Licores Registrados:</Text>
          <FlatList
            data={licor}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.liquorItem}>
                <Text>{item.nombreLicor}</Text>
                <Text style={styles.quantityText}>{item.mililitros}</Text>
              </View>
            )}
            scrollEnabled={true}
            contentContainerStyle={styles.liquorsContent}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "transparent",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gridItem: {
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#333",
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  gridText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  quantityText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6347",
  },
  liquorsContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  liquorItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  liquorsContent: {
    paddingBottom: 10,
  },
});

export default Admin;
