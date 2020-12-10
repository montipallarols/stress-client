import React, { useState } from "react";
import { login } from "../store/user/actions";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();



  function submitForm(text) {
    // event.preventDefault();

    dispatch(login(email, password));
    console.log("Login with", email, password)
    navigation.navigate("Home")
    setEmail("");
    setPassword("");
  }

  return (
    <View>
      <Text style={styles.text}>Login</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={(text) => setEmail(text)}
        type="email"
        placeholder="Enter email"
        placeholderTextColor="#404040"
        required
      />
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        placeholderTextColor="#404040"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} 
      onPress={submitForm}>
        <Text style={styles.btntxt}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
      height: 60, 
      borderWidth: 1,
      margin: 20,
      padding: 10
  },
  text: {
      fontSize: 30,
      textAlign: "center",
      margin: 20
  },
  button: {
    width: "80%",
    height: 60,
    marginBottom: 25,
    marginTop: 25,
    backgroundColor: "#bedbbb",
    alignSelf: "center",
    justifyContent: "center",
  },
  btntxt: {
    textAlign: "center",
    color: "#292929",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 20
  },
});