import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Text, View, KeyboardAvoidingView, Button, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { addReflection } from "../store/user/actions";
import { selectUser } from '../store/user/selectors';
import { selectMessage } from "../store/appState/selectors";

export default function Reflection() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userId = user.id
    const message = useSelector(selectMessage);

    const currentDate = new Date().toLocaleDateString("en-GB")
    console.log("Current date", currentDate)
    let today = currentDate.split("/").reverse().join("-");
    console.log(today)

    const [ problem, setProblem ] = useState("");
    const [ solution, setSolution ] = useState("");
    const [ score, setScore ] = useState(null);

    function submitReflection(){
        console.log("submit")
        dispatch(addReflection(today, userId, problem, solution, score))
        setProblem("")
        setSolution("")
        setScore("")
    }
   
    return (
        <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.inner}>
      <Text style={styles.text}>Today's Reflection</Text>

      <TextInput
        style={styles.textInput}
        value={problem}
        onChangeText={(text) => setProblem(text)}
        placeholder="What did I struggle with?"
        placeholderTextColor="#404040"
        required
      />
      <TextInput
        style={styles.textInput}
        value={solution}
        onChangeText={(text) => setSolution(text)}
        placeholder="How did I deal with it?"
        placeholderTextColor="#404040"
        required
      />
      <TextInput
        style={styles.textInput}
        value={score}
        keyboardType = 'numeric'
        onChangeText={(text) => setScore(text)}
        placeholder="How well did I deal with it? (0/10)"
        placeholderTextColor="#404040"
        required
      />
      <Button title="Add reflection" text={"Add reflection"} onPress={submitReflection} />
      { message === "reflection" ? 
      <Text style={styles.text}>Your reflection for today has been added!</Text> 
      : null}
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
      },
    textInput: {
        height: 60, 
        borderWidth: 1,
        margin: 20,
        padding: 10
    },
    text: {
        fontSize: 30,
        margin: 20,
        textAlign: "center"
    }
  });