import React from "react";
import { Text, View, Button } from "react-native";

export default function HomeScreen({navigation}) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 40,
          textAlign: "center",
        }}
      >
        My Profile
      </Text>
    
      <Button title="Home" onPress={() => navigation.push("Home")}/>
    </View>
  );
}