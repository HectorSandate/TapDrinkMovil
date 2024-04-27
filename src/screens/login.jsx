import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../components/context/AuthContext";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);

  const handleCreateAccount = () => {
    navigation.navigate("RegisterScreen");
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setErrorAlert("Por favor, completa todos los campos");
        setTimeout(() => setErrorAlert(null), 5000);
        return;
      }

      setIsLoading(true);

      const response = await axios.post(
        "https://taplibkback.onrender.com/api/login",
        {
          email,
          password,
        }
      );

      setIsLoading(false);

      if (response.data) {
        const { token, userId, name, nivel } = response.data;
        console.log("Received token:", token);
        console.log("Received user ID:", userId);
        console.log("Received user ID:", name);
        console.log("Received user ID:", nivel);

        login({ token, userId, email, name, nivel });
      }

      console.log("Respuesta del servidor:", response.data);

      if (
        response.status === 200 &&
        response.data.message === "Login successful"
      ) {
        navigation.navigate("BottomTabs");
      } else {
        setErrorAlert(response.data.message);
        setTimeout(() => setErrorAlert(null), 5000);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorAlert(
        "Hubo un error al intentar iniciar sesión. Por favor, inténtalo de nuevo."
      );
      setTimeout(() => setErrorAlert(null), 5000);
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#141517", "#FFC107"]}
      locations={[0.5, 0.8]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image source={require("../../assets/logoTap.png")} style={styles.logo} />
        <Text style={styles.title}>Welcome Back</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Correo Electrónico"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            editable={!isLoading} // Deshabilitar si isLoading es true
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Contraseña"
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            editable={!isLoading} // Deshabilitar si isLoading es true
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Recuperar Contraseña</Text>
        </TouchableOpacity>
      </View>
      {!!errorAlert && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>{errorAlert}</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.loginButtonText}>
          {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}
        </Text>
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
      <View style={styles.createAccount}>
        <Text style={styles.createAccountText}>¿No tienes una cuenta?</Text>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.createAccountButton}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    paddingTop: 25,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 207,
    height: 63,
    marginBottom: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 25,
    color: "white",
  },
  form: {
    marginBottom: 23,
  },
  inputContainer: {
    alignItems: "center",
    marginBottom: 18,
  },
  input: {
    height: 50,
    width: 289,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    fontSize: 18,
  },
  forgotPassword: {
    textAlign: "right",
    color: "white",
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: "#FFC107",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    width: 170,
    marginBottom: 30,
    alignSelf: "center",
  },
  loginButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "white",
    marginRight: 10,
    marginLeft: 10,
  },
  separatorText: {
    color: "white",
    fontSize: 18,
  },
  socialButtons: {
    flexDirection: "row",
    marginBottom: 20,
    alignSelf: "center",
  },
  googleButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    width: 70,
    height: 50,
    alignItems: "center",
  },
  facebookButton: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
    width: 70,
    height: 50,
    alignItems: "center",
  },
  createAccount: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  createAccountText: {
    marginRight: 5,
    color: "black",
    fontSize: 18,
  },
  createAccountButton: {
    color: "#FFC107",
    fontWeight: "bold",
    fontSize: 20,
    backgroundColor: "black",
    width: 120,
    height: 30,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 8,
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
});

export default LoginScreen;

