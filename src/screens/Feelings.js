import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Picker } from "@react-native-community/picker";
import { useDispatch } from "react-redux";
import { addUserEmotion } from "../store/user/actions";
import DatePicker from "react-native-datepicker";

export default function SignUp() {
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [needHelp, setNeedHelp] = useState(true || false);
  const dispatch = useDispatch();

  console.log(needHelp, date, description, level);

  function submitForm(event) {
    event.preventDefault();

    dispatch(addUserEmotion(level, description, date, needHelp));

    setLevel("");
    setDescription("");
    setDate(new Date());
    setNeedHelp(true || false);
  }

  return (
    <View>
      <View style={{ margin: 15 }}>
        <Picker
          value={level}
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
          type="description"
          required
        />
      </View>
      <View style={{ margin: 15 }}>
        <Picker
          value={needHelp}
          selectedValue={needHelp}
          onValueChange={(value) => {
            setNeedHelp(value);
          }}
        >
          <Picker.Item label="Do you need help with something" value={null} />
          <Picker.Item label="I need Help" value={true} />
          <Picker.Item label="I can do this on my own" value={false} />
        </Picker>
      </View>
      <View style={{ margin: 15 }}>
        <DatePicker
          date={date}
          mode="date"
          onDateChange={(date) => setDate(date)}
          required
        />
      </View>
      <Button
        title="Share your feeling"
        text={"Share your feeling"}
        onPress={submitForm}
      />
    </View>
  );
}
