import React from "react";
import { Text, View, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 40,
          textAlign: "center",
        }}
      >
        AntiStress
      </Text>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        How is everyone feeling today?
      </Text>
      <Button
        title="My Profile"
        onPress={() => navigation.navigate("My Profile")}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
