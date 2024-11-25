import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';

const ChefPage = () => {
  const [meals, setMeals] = useState([]);
  const [mealData, setMealData] = useState({
    courseType: '',
    mealName: '',
    description: '',
    price: '',
  });

  const handleAddMeal = () => {
    setMeals([...meals, { ...mealData, id: Math.random().toString() }]);
    setMealData({ courseType: '', mealName: '', description: '', price: '' });
  };

  const handleDeleteMeal = (id) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Course Type"
        value={mealData.courseType}
        onChangeText={(text) => setMealData({ ...mealData, courseType: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Meal Name"
        value={mealData.mealName}
        onChangeText={(text) => setMealData({ ...mealData, mealName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={mealData.description}
        onChangeText={(text) => setMealData({ ...mealData, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={mealData.price}
        onChangeText={(text) => setMealData({ ...mealData, price: text })}
      />
      <Button title="Add Meal" onPress={handleAddMeal} />

      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.courseType}</Text>
            <Text>{item.mealName}</Text>
            <Text>{item.description}</Text>
            <Text>${item.price}</Text>
            <Button title="Delete" onPress={() => handleDeleteMeal(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default ChefPage;

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
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
});
