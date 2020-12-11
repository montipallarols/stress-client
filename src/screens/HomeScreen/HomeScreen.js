import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { emotionsFetched, fetchEmotions } from "../../store/emotions/actions";
import { selectAllEmotions } from "../../store/emotions/selectors";
import {
  fetchAllUsers,
  getUserWithStoredToken,
  logOut,
} from "../../store/user/actions";
import Constants from "expo-constants";
import WhatsAppShare from "../../components/Share";

import {
  selectAllUsers,
  selectToken,
  selectUser,
} from "../../store/user/selectors";
import CommentForm from "./CommentForm";
import { FlatList } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = user.token;
  const emotions = useSelector(selectAllEmotions);
  const allUsers = useSelector(selectAllUsers);

  const [commentMode, setCommentMode] = useState(false);
  // const [chosenEmotionId, setChosenEmotionId] = useState(null);

  function commentHandler() {
    setCommentMode(!commentMode);
  }

  useEffect(() => {
    console.log("FETCH GOT HIT");
    dispatch(fetchEmotions());
    dispatch(fetchAllUsers());
  }, []);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  function onPressLogout() {
    console.log("logout");
    dispatch(logOut());
  }
  console.log("emotions", emotions);
  console.log("HomeAllUsers", allUsers);
  // function sendWhatsApp() {
  //   const number = emotions.map((emotion) => {
  //     Linking.openURL(`whatsapp://send?text=hello&phone=${emotion.user.phone}`);
  //   });

  //   console.log(number);
  // }

  const image = {
    uri:
      "https://image.freepik.com/free-photo/wooden-floor-sunny-day_1134-28.jpg",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            borderWidth: 2,
            borderColor: "#000",
            margin: 15,
            overflow: "hidden",
          }}
        >
          <ImageBackground source={image} style={{ resizeMode: "cover" }}>
            <View style={styles.container}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 40,
                  textAlign: "center",
                  color: "#000",
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
            <View
              style={styles.container}
              style={[
                {
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  margin: 15,
                },
              ]}
            >
              {token ? (
                <Button
                  title="My Profile"
                  onPress={() => navigation.navigate("My Profile")}
                />
              ) : (
                <Button
                  title="Sign up"
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
              {token ? (
                <Button
                  title="Feelings"
                  onPress={() => navigation.navigate("Feelings")}
                />
              ) : null}
            </View>
          </ImageBackground>
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
                    {/* &#128533; */}
                    &#129327;
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
                {emotion.description}
                </Text>
                {/* <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center",
                    margin: 20,
                  }}
                > */}
                  <View style={styles.commentsContainer}>
                    {emotion.comments.map((comment) => {
                      return (
                        <View key={comment.id} style={styles.comment}>
                          {allUsers?.map((user) =>
                            user.id === comment.userId ? (
                              <Text
                                key={user.id}
                                style={{ fontWeight: "bold" }}
                              >
                                {user.firstName}
                              </Text>
                            ) : null
                          )}
                          <Text>{comment.content}</Text>
                          <Text style={{ fontStyle: "italic" }}>
                            {comment.date.slice(0, 10)}
                          </Text>
                        </View>
                      );
                    })}

                    <Button title="Comment" onPress={commentHandler} />
                  </View>
                  {commentMode ? (
                    <CommentForm userEmotionId={emotion.id} />
                  ) : null}
                {/* </Text> */}
                {/* <Text>{emotion.user.phone}</Text>
                <Button title="Send a message" onPress={sendWhatsApp} /> */}
              </View>
            );
          })}
        </ScrollView>
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
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  text: {
    fontSize: 15,
    margin: 20,
  },
  feedElement: {
    backgroundColor: "#e0ece4",
    marginHorizontal: 5,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: "#000000",
  },
  comment: {
    backgroundColor: "#e0ece4",
    marginBottom: 2,
    marginHorizontal: 5,
    padding: 25,
    maxWidth: 250,
  },
  commentsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
