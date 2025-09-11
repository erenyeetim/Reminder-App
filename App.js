import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import EditScreen from "./screens/EditScreen";
import Colors from "./constant/color";
import ReminderContextProvider from "./store/reminder";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CompletedScreen from "./screens/CompletedScreen";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ReminderScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: Colors.primary100,
        sceneStyle: {
          backgroundColor: Colors.primary300,
        },
        tabBarStyle: {
          backgroundColor: Colors.primary300,
        },
        headerStyle: {
          backgroundColor: Colors.primary600,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Current Reminder",
          tabBarLabel: "Current",
          tabBarLabelStyle: { fontFamily: "open-sans" },
          headerTitleStyle: {
            fontFamily: "open-sans",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedScreen}
        options={{
          title: "Completed Reminder",
          tabBarLabelStyle: { fontFamily: "open-sans" },
          headerTitleStyle: {
            fontFamily: "open-sans",
          },
          tabBarLabel: "Completed",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fonstLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
  if (!fonstLoaded) {
    return <AppLoading />;
  }
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
              name="ReminderScreen"
              component={ReminderScreens}
              options={{
                title: "All Planned",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EditScreen"
              component={EditScreen}
              options={{
                title: "Edit Screen",
                headerTitleStyle: {
                  fontFamily: "open-sans",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ReminderContextProvider>
    </>
  );
}
