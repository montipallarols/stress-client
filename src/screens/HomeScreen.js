import React, { useEffect } from "react";
import { Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { emotionsFetched, fetchEmotions } from "../store/emotions/actions";
import { selectAllEmotions } from "../store/emotions/selectors";
import { logOut } from "../store/user/actions";

import { selectToken, selectUser } from "../store/user/selectors";


export default function HomeScreen({ navigation }) {
  useEffect(() => {
    console.log("FETCH GOT HIT");
    dispatch(fetchEmotions());
  }, []);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = user.token;
  const emotions = useSelector(selectAllEmotions);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  function onPressLogout() {
    console.log("logout");
    dispatch(logOut());
  }

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

      {emotions?.map((emotion) => (
        <Text key={emotion.id}>
          {emotion.level}
          {emotion.user.firstName} {emotion.user.lastName}
          {emotion.description}
        </Text>
      ))}

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
