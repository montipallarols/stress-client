import React, { useState } from "react";
import { View, TextInput, Button, Switch, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";
import { useDispatch, useSelector } from "react-redux";
import { addUserEmotion } from "../store/user/actions";
import { selectUser } from "../store/user/selectors";

export default function Feelings() {
  const [level, setLevel] = useState(1);
  const [description, setDescription] = useState("");
  const [needHelp, setNeedHelp] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user.id;


  function submitFeeling() {
    // event.preventDefault();

    dispatch(addUserEmotion(level, description, needHelp, userId));
    console.log("This is data", level, description, needHelp, userId);
  }
  console.log("Need help?", needHelp)
  return (
    <View>
      <View style={{ margin: 15 }}>
      <Text style={styles.text}>How stressed are you?</Text>
        <Picker
          style={styles.picker}
          selectedValue={level}
          onValueChange={(currentLevel) => setLevel(currentLevel)}
        > 
          {/* <Picker.Item label="How stressed are you?" value={null} /> */}
          <Picker.Item label="&#129327;" value={1} />
          <Picker.Item label="&#128528;" value={2} />
          <Picker.Item label="&#128513;" value={3} />
        </Picker>
      </View>
      
      <View style={{ margin: 15 }}>
        <TextInput
          style={styles.textInput}
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Describe your feeling..."
          placeholderTextColor="#404040"
          required
        />
      </View>
      <View style={{ margin: 15 }}>
      <Text style={styles.text}>Do you need help?</Text>
      <Picker
          style={styles.picker}
          selectedValue={needHelp}
          onValueChange={(itemValue, itemIndex) => setNeedHelp(itemValue)}
        >
          {/* <Picker.Item label="Do you need help?" value={false} /> */}
          <Picker.Item label="Yes" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>
      
      </View>
      <Button
        title="Share your feeling"
        text={"Share your feeling"}
        onPress={submitFeeling}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  textInput: {
      height: 60, 
      borderWidth: 1,
      padding: 10,
      marginBottom: 10
  },
  text: {
      fontSize: 30,
      textAlign: "center",
      marginBottom: -20
  },
  picker : {
    margin: -30
  }
});