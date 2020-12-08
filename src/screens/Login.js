import React, { useState, useEffect } from "react";
import { login } from "../store/user/actions";
import { View, Text, TextInput, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //  useEffect(() => {
  //   if (token !== null) {
  //     navigation.navigate("Home");
  //   }
  // }, [token, navigation]);

  function submitForm() {
    // event.preventDefault();

    dispatch(login(email, password));
    console.log("Login with", email, password)
    navigation.navigate("Home")
    setEmail("");
    setPassword("");
  }


  return (
    <View>
      <Text>Login</Text>
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
      />
      <Button title="Login" text={"Login"} onPress={submitForm} />
    </View>
  );
}
