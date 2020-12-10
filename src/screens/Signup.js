import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { selectToken } from "../store/user/selectors";
import { signUp } from "../store/user/actions";

export default function Signup({navigation}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const submitForm = () => {
    dispatch(signUp(firstName, lastName, email, password, phone));
    console.log(firstName, lastName, email, password, phone);
    navigation.navigate("Home")
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setPhone("");
  };

  return (
    <View>
      <Text style={styles.text}>Signup</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={(text) => setEmail(text)}
        type="email"
        placeholder="Email"
        required
      />
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry
        required
      />
      <TextInput
        style={styles.textInput}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        placeholder="First Name"
        required
      />
      <TextInput
        style={styles.textInput}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        placeholder="Last Name"
        required
      />
      <TextInput
        style={styles.textInput}
        value={phone}
        onChangeText={(text) => setPhone(text)}
        placeholder="Phone"
      />
      <TouchableOpacity style={styles.button} 
      onPress={submitForm}>
        <Text style={styles.btntxt}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
      height: 60, 
      borderWidth: 1,
      margin: 10,
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