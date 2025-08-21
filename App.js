import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import IconButton from "./components/UI/IconButton";
import EditScreen from "./screens/EditScreen";
import Colors from "./constant/color";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: Colors.primary10,
            contentStyle: {
              backgroundColor: Colors.primary100,
            },
            headerStyle: {
              backgroundColor: Colors.primary400,
            },
          }}
        >
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "All Planned",
            }}
          />
          <Stack.Screen
            name="EditScreen"
            component={EditScreen}
            options={{
              title: "Edit Screen",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
