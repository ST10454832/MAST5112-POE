import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = ({ navigation }) => {
  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const storedMeals = await AsyncStorage.getItem('meals');
        if (storedMeals) {
          setMeals(JSON.parse(storedMeals));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load meals.');
      }
    };

    fetchMeals();
  }, []);

  const handleAddToCart = (meal) => {
    setCart((prevCart) => [...prevCart, meal]);
  };

  const goToCheckout = async () => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      navigation.navigate('Checkout');
    } catch (error) {
      Alert.alert('Error', 'Failed to save cart.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.mealText}>{item.courseType}</Text>
            <Text style={styles.mealText}>{item.mealName}</Text>
            <Text style={styles.mealText}>{item.description}</Text>
            <Text style={styles.mealText}>${item.price}</Text>
            <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
          </View>
        )}
      />
      <Button title="Go to Checkout" onPress={goToCheckout} />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  mealText: {
    fontSize: 16,
  },
});
