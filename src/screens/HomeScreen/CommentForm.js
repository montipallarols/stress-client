import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { addComment } from "../../store/emotions/actions";
import { selectToken } from "../../store/user/selectors";

export default function CommentForm(props) {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const userEmotionId = props.userEmotionId;
 

  function submitComment() {
    console.log("Comment:", content);
    dispatch(addComment(content, userEmotionId));
    setContent("");
  }

  return (
    <View>
     
      <Text style={styles.text}>Comment</Text>
      <TextInput
        style={styles.textInput}
        value={content}
        onChangeText={(text) => setContent(text)}
        placeholder="Write your comment here"
        placeholderTextColor="#404040"
        required
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={submitComment}>
        <Text style={styles.btntxt}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    borderWidth: 1,
    margin: 20,
    padding: 10,
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    margin: 20,
  },
  button: {
    width: "80%",
    height: 60,
    borderWidth: 1,
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
    fontSize: 20,
  },
});
