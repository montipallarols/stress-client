import React, { useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { emotionsFetched, fetchEmotions } from "../store/emotions/actions";
import { selectAllEmotions } from "../store/emotions/selectors";
import { getUserWithStoredToken, logOut } from "../store/user/actions";
import Constants from "expo-constants";

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
  console.log("emotions", emotions);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <View style={styles.container}>
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
          </View>
          <View style={styles.container}>
            {token ? (
              <Button
                title="My Profile"
                onPress={() => navigation.navigate("My Profile")}
              />
            ) : (
              <Button
                title="SignUp"
                onPress={() => navigation.navigate("SignUp")}
              />
            )}

            {token ? (
              <Button title="Logout" onPress={onPressLogout} />
            ) : (
              <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
              />
            )}
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          {emotions?.map((emotion) => {
            return (
              <View key={emotion.id} style={styles.feedElement}>
                {emotion.level === 1 ? (
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 55,
                      textAlign: "center",
                      margin: 20,
                    }}
                  >
                    &#128533;
                  </Text>
                ) : emotion.level === 2 ? (
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 55,
                      textAlign: "center",
                      margin: 20,
                    }}
                  >
                    &#128528;
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 55,
                      textAlign: "center",
                      margin: 20,
                    }}
                  >
                    &#128513;
                  </Text>
                )}
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center",
                    margin: 20,
                  }}
                >
                  {emotion.user.firstName} {emotion.user.lastName}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center",
                    margin: 20,
                  }}
                >
                  {emotion.description}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <View>
          {token ? (
            <Button
              title="Feelings"
              onPress={() => navigation.navigate("Feelings")}
            />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: "#bedbbb",
    marginHorizontal: 5,
  },
  text: {
    fontSize: 15,
    margin: 20,
  },
  feedElement: {
    backgroundColor: "#bedbbc",
    marginHorizontal: 5,
    marginBottom: 5,
    borderWidth: 5,
    borderColor: "#000000",
  },
});
