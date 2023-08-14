import React, { useState, useEffect } from 'react';


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

// react navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen Components
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';


// Local Storage
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage






// screen navigation init stack
const Stack = createNativeStackNavigator();


function App() {

  const [userToken, setUserToken] = useState(null);


  // Check for token in AsyncStorage when app initializes
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    };
    checkToken();
  }, []);



  return (
    <NavigationContainer>

      {/* creates a stack of screens to navigate through */}
      <Stack.Navigator>

        {/* /* LOGIN PAGE */}
        < Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />

        {/* /* HOMESCREEN PAGE  */}
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
              <Button title="HighScores" color="#000000"
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