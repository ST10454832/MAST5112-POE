import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home';
import Menu from './Screens/Menu';
import Cheflogin from './Screens/Cheflogin';
import ChefPage from './Screens/ChefPage';
import Checkout from './Screens/Checkout';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Menu' component={Menu}/>
        <Stack.Screen name='Login' component={Cheflogin}/>
        <Stack.Screen name='Page' component={ChefPage}/>
        <Stack.Screen name='Checkout' component={Checkout}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
