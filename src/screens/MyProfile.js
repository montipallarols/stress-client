import React, {useEffect} from "react";
import { Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser, selectUserReflections } from "../store/user/selectors";
import { getUserReflections } from "../store/user/actions";

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const userReflections = useSelector(selectUserReflections);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const userId = user.id

  useEffect(() => {
    if (token === null) {
      navigation.navigate("Home");
    }
  }, [token]);

  useEffect(() => {
      dispatch(getUserReflections(userId))
      console.log("Use effect")
  }, [dispatch, userId]);

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 40,
          textAlign: "center",
        }}
      >
        My Profile
      </Text>
    
      <Button title="Home" onPress={() => navigation.push("Home")}/>
    </View>
  );
}