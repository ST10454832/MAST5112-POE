import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ChrisEatery!</Text>
      <Button title="View Menu" onPress={() => navigation.navigate('Menu')} />
      <Button title="Chef Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
