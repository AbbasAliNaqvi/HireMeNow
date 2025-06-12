import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";  // we move your main UI here
import QuizScreen from "./Screens/QuizScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'HireMeNow' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'JavaScript Quiz' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
