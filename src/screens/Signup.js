import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TextInput, Button } from "react-native";
import { selectToken } from "../store/user/selectors";
import { signUp } from "../store/user/actions";

export default function Signup() {
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
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setPhone("");
  };

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
        required
      />
      <TextInput
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        placeholder="First Name"
        required
      />
      <TextInput
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        placeholder="Last Name"
        required
      />
      <TextInput
        value={phone}
        onChangeText={(text) => setPhone(text)}
        placeholder="Phone"
      />
      <Button title="Login" text={"Login"} onPress={submitForm} />
    </View>
  );
}
