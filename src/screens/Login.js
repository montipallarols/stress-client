import React, { useState } from "react";
import { login } from "../store/user/actions";
import { View, Text, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  //  useEffect(() => {
  //   if (token !== null) {
  //     navigation.navigate("Home");
  //   }
  // }, [token, navigation]);

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
      <Text>Login</Text>
      <TextInput
        value={emgail}
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
