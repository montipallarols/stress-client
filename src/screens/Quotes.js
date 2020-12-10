import React, {useEffect} from 'react'
import { View, TextInput, Button, Switch, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuotes } from '../store/emotions/actions';
import { selectQuotes } from '../store/emotions/selectors';



export default function Quotes({route, navigation}) {
    const dispatch = useDispatch();
    const { level } = route.params;

    useEffect(() => {
        dispatch(fetchQuotes(level))
       }, [dispatch, level]);

    const quotes = useSelector(selectQuotes);
    console.log("QUOTES", quotes)
    
    const randomQuote = quotes ? quotes[Math.floor(Math.random() * quotes.length)] : null
    console.log("Random quote", randomQuote)

    return (
        <View>
            <Text style={styles.emoji}> 
            {level === 1 ? <Text>&#129327;</Text> : level === 2 ? <Text>&#128528;</Text> : <Text>&#128513;</Text>}
            </Text>
            {level === 3 ? <Text style={styles.text}>Awesome!</Text> : null}
            <Text style={styles.text}>
           {randomQuote?.quote}
            </Text>

            <Button
                title="Go back to Home"
                onPress={() => navigation.navigate("Home")}
              />
        </View>
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
        fontSize: 20,
        margin: 30,
        textAlign: "center",
        fontStyle: "italic"
    },
    emoji: {
        fontSize: 80,
        margin: 50,
        textAlign: "center"
    }
  });


