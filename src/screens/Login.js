import React, { useState } from "react";
import { login } from "../store/user/actions";
import { View, Text, TextInput, Button } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitForm(event) {
    event.preventDefault();

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
  }

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        placeholder="Enter email"
        required
      />
      <TextInput
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="password"
        secureTextEntry
      />
      <Button title="Login" text={"Login"} onPress={submitForm} />
    </View>
  );
}
