import React, {useEffect} from "react";
import { Text, View, Button, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser, selectUserReflections } from "../store/user/selectors";
import { getUserReflections } from "../store/user/actions";
import Constants from 'expo-constants';

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
  }, [dispatch, userId]);



  return (
    <SafeAreaView style={styles.container}>
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 35,
          textAlign: "center",
        }}
      >
        {user.firstName}
      </Text>
      <Text
        style={{
          // fontWeight: "bold",
          fontSize: 25,
          textAlign: "center",
          margin: 20
        }}
      >
        Reflection diary
      </Text>
      <ScrollView style={styles.scrollView}>
      {userReflections.map(r => {
        return <View key={r.id}>
          <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
            margin: 20}}
          >{r.date.slice(0, 10)}</Text>
          <Text style={{
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center",
          margin: 20
        }}
          >What I struggled with:</Text>
          <Text style={styles.text}>{r.problem}</Text>
          <Text style={{
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center",
          margin: 30
        }}
          >How I solved it:</Text>
          <Text style={styles.text}>{r.solution}</Text>
          <Text style={{
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center",
          margin: 20
        }}
          >How well I dealt with it:</Text>
          <Text style={styles.text}>{r.score}/10</Text>
   
      </View>
       
      })}
    <Button title="Add today's reflection" onPress={() => navigation.navigate("Reflection")} />
      </ScrollView>

     
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: '#f3f2da',
    marginHorizontal: 2,
  },
  text: {
    fontSize: 15,
    marginHorizontal: 10
  },
});