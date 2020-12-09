import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { Picker } from "@react-native-community/picker";
import { useDispatch } from "react-redux";
import { addUserEmotion } from "../store/user/actions";

export default function Feelings() {
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [needHelp, setNeedHelp] = useState("");
  const dispatch = useDispatch();

  console.log("This is data", needHelp, date, description, level);

  function submitForm(event) {
    event.preventDefault();

    dispatch(addUserEmotion(level, description, date, needHelp));

    setLevel("");
    setDescription("");
    setDate(new Date());
    setNeedHelp("");
  }

  return (
    <View>
      <View style={{ margin: 15 }}>
        <Picker
          selectedValue={level}
          onValueChange={(currentLevel) => setLevel(currentLevel)}
        >
          <Picker.Item label="How stressed are you ?" value={null} />
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
        </Picker>
      </View>
      <View style={{ margin: 15 }}>
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="a description"
          required
        />
      </View>
      <View style={{ margin: 15 }}>
        <Picker
          selectedValue={needHelp}
          onValueChange={(currentNeed) => setNeedHelp(currentNeed)}
        >
          <Picker.Item label="Do you need help ?" value={null} />
          <Picker.Item label="I need help" value="true" />
          <Picker.Item label="I can do this on my own" value="false" />
        </Picker>
      </View>
      <Button
        title="Share your feeling"
        text={"Feelings"}
        onPress={submitForm}
      />
    </View>
  );
}
