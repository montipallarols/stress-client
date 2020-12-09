import React, { useState } from "react";
import { View, TextInput, Button, Switch } from "react-native";
import { Picker } from "@react-native-community/picker";
import { useDispatch, useSelector } from "react-redux";
import { addUserEmotion } from "../store/user/actions";
import { selectUser } from "../store/user/selectors";

export default function Feelings() {
  const [level, setLevel] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(true);
  const [needHelp, setNeedHelp] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user.id;

  console.log("This is data", needHelp, date, description, level, userId);

  function submitFeeling(event) {
    event.preventDefault();

    dispatch(addUserEmotion(level, description, date, needHelp, userId));

    setDate(true);
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
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor="#f5dd4b"
          onValueChange={setNeedHelp}
          value={needHelp}
        />
      </View>
      <Button
        title="Share your feeling"
        text={"Share your feeling"}
        onPress={submitFeeling}
      />
    </View>
  );
}
