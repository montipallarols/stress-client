import React from "react";
import { Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/user/actions";
import { selectToken, selectUser } from "../store/user/selectors";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = user.token;

  function onPressLogout() {
    console.log("logout");
    dispatch(logOut());
  }
  console.log("token", token);

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

      {token ? (
        <Button
          title="My Profile"
          onPress={() => navigation.navigate("My Profile")}
        />
      ) : (
        <Button title="SignUp" onPress={() => navigation.navigate("SignUp")} />
      )}

      {token ? (
        <Button title="Logout" onPress={onPressLogout} />
      ) : (
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      )}
    </View>
  );
}
