import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import IconButton from "./components/UI/IconButton";
import EditScreen from "./screens/EditScreen";
import Colors from "./constant/color";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "All Planned",
            contentStyle: {
              backgroundColor: Colors.primary50,
            },
            headerStyle: {
              backgroundColor: Colors.primary400,
            },
          })}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{
            title: "Edit Screen",
            contentStyle: {
              backgroundColor: Colors.primary50,
            },
            headerStyle: {
              backgroundColor: Colors.primary400,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
