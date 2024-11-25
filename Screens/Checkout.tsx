import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCart(parsedCart);
          calculateTotal(parsedCart);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load cart.');
      }
    };

    fetchCart();
  }, []);

  const calculateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    setTotal(totalPrice.toFixed(2));
  };

  const handleCheckout = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      Alert.alert('Success', 'Checkout completed!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to complete checkout.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.mealText}>{item.courseType}</Text>
            <Text style={styles.mealText}>{item.mealName}</Text>
            <Text style={styles.mealText}>${item.price}</Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${total}</Text>
      <Button title="Complete Checkout" onPress={handleCheckout} />
    </View>
  );
};

export default Checkout;

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
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
