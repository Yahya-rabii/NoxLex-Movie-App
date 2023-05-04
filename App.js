import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import AboutMe from "./screens/AboutMe";
import ActorScreen from "./screens/ActorScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const scheme = useColorScheme();

  const theme = scheme === "dark" ? DarkTheme : DefaultTheme;
  const themeContainerStyle = {
    backgroundColor: theme.colors.background,
  };
  const themeTextStyle = {
    color: theme.colors.text,
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Movie" component={MovieScreen} />
        <Stack.Screen name="Actor" component={ActorScreen} />
        <Stack.Screen name="AboutMe" component={AboutMe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
    color: "#121212",
    resizeMode: "contain",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
  },
});
