import React from 'react'
import { Text, View, Button, StyleSheet, SafeAreaView, ScrollView, TextInput } from "react-native";

export default function Reflection() {
    return (
        <View>
      <Text>Reflection</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        type="email"
        placeholder="Enter email"
        required
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="password"
        secureTextEntry
        required
      />
      <TextInput
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        placeholder="First Name"
        required
      />
      <Button title="Login" text={"Add reflection"} onPress={submitReflection} />
    </View>
    )
}
