import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Switch,
  Text,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { useDispatch, useSelector } from "react-redux";
import { addUserEmotion } from "../store/user/actions";
import { selectUser } from "../store/user/selectors";
import { selectMessage } from "../store/appState/selectors";

export default function Feelings({ navigation }) {
  const [level, setLevel] = useState(1);
  const [description, setDescription] = useState("");
  const [needHelp, setNeedHelp] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user.id;
  const message = useSelector(selectMessage);

  function submitFeeling() {
    dispatch(addUserEmotion(level, description, needHelp, userId));
  }

  useEffect(() => {
    if (message === "feeling created") {
      navigation.navigate("Quotes", { level });
    }
  }, [message]);

  return (
    <View style={{ margin: 20 }}>
      <View style={styles.howAreYou}>
        <Text style={styles.text}>How are you feeling?</Text>
        <Picker
          style={styles.picker}
          selectedValue={level}
          onValueChange={(currentLevel) => setLevel(currentLevel)}
        >
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
          <Picker.Item label="Yes" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>
      </View>
      <View style={{ marginTop: 25 }}>
        <Button
          title="Share your feeling"
          text={"Share your feeling"}
          onPress={submitFeeling}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#e0ece4",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: -10,
  },
  picker: {
    margin: -30,
  },

  howAreYou: {
    marginLeft: 15,
    marginBottom: 25,
    marginTop: 15,
    marginRight: 15,
  },
});
