import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import IconButton from "./components/UI/IconButton";
import EditScreen from "./screens/EditScreen";
import Colors from "./constant/color";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import ReminderContextProvider from "./store/reminder";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ReminderContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: Colors.primary100,
              contentStyle: {
                backgroundColor: Colors.primary300,
              },
              headerStyle: {
                backgroundColor: Colors.primary600,
              },
            }}
          >
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={({ navigation }) => ({
                title: "All Planned",
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon={"add"}
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.navigate("EditScreen")}
                  />
                ),
              })}
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
      </ReminderContextProvider>
    </>
  );
}
