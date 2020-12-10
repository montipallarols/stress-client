import { Provider } from "react-redux";
import "localstorage-polyfill";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./src/store/rootReducer";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import MyProfile from "./src/screens/MyProfile";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";

import Reflection from "./src/screens/Reflection";
import Feelings from "./src/screens/Feelings";

const Stack = createStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f57b51",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
          <Stack.Screen
            name="My Profile"
            component={MyProfile}
            options={{ title: "My Profile" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="SignUp"
            component={Signup}
            options={{ title: "SignUp" }}
          />
          <Stack.Screen
            name="Reflection"
            component={Reflection}
            options={{ title: "Reflection" }}
          />
            <Stack.Screen 
            name="Feelings"
            component={Feelings}
            options={{ title: "Feelings" }}

          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
