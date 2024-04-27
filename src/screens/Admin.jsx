import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Admin = () => {
  // Datos simulados de licores registrados
  const liquorsData = [
    { nombre: 'Vodka', cantidad: 10 },
    { nombre: 'Ron', cantidad: 5 },
    { nombre: 'Whisky', cantidad: 8 },
    // Agrega más licores si es necesario
  ];

  return (
    <LinearGradient colors={['#141517', '#FFC107']} locations={[0.5, 8]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Text style={styles.gridText}>Recetas Registradas:</Text>
            <Text style={styles.quantityText}>25</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridText}>Bebidas solicitadas:</Text>
            <Text style={styles.quantityText}>15</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridText}>Licores Registrados:</Text>
            <Text style={styles.quantityText}>3</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridText}>Usuarios Registrados:</Text>
            <Text style={styles.quantityText}>50</Text>
          </View>
        </View>
        <View style={[styles.liquorsContainer, { height: liquorsData.length > 0 ? 'auto' : 0 }]}>
          <Text style={styles.header}>Licores Registrados:</Text>
          <FlatList
            data={liquorsData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.liquorItem}>
                <Text>{item.nombre}</Text>
                <Text style={styles.quantityText}>{item.cantidad}</Text>
              </View>
            )}
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
    backgroundColor: 'transparent', // Cambiado a transparente para que el gradiente se muestre correctamente
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridItem: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  gridText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quantityText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6347', // Color rojo
  },
  liquorsContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden', // Para recortar contenido si es necesario
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  liquorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Admin;

