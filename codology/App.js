import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

// react navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen Components
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';


// screen navigation init stack
const Stack = createNativeStackNavigator();




function App() {


  return (
    <NavigationContainer>

      {/* creates a stack of screens to navigate through */}
      <Stack.Navigator>

        {/* LOGIN PAGE */}
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />

        {/* HOMESCREEN PAGE */}
        <Stack.Screen name="Home" component={HomeScreen}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: 'darkslateblue' },
            headerRight: () => (
              <Button title="Sign Out" color="#000000"
                onPress={() =>
                  auth
                    .signOut()
                    .then(() => { navigation.replace("Login") })
                    .catch(error => { alert(error.message) })}
              />
            ),
            headerLeft: () => (
              <Button title="STATS" color="#000000"
                onPress={() => console.log("stats!")} />
            ),
          })}
        />

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
export default App;