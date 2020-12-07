import React, { useState } from "react";
import { Login } from "../store/user/actions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

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
      <Button text={"Login"} onPress={submitForm} />
    </View>
  );
}
