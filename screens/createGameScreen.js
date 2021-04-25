import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { GetGameQuestions, CreateGameSetup } from '../firebase/Firebase';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';

export default function CreateGameComponent() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [key, setKey] = useState('');
  const [gameQuestions, setGameQuestions] = useState();

  const [key1, setKey1] = useState('');
 const [key2, setKey2] = useState('');
 
 
 
 const test = ()=>{
   setKey2(key1)
 }


  useEffect(() => {
    GetGameQuestions(setGameQuestions);
  }, []);
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.backgroundColor }}
    >
      <View
        style={{
          ...styles.textView,
          backgroundColor: theme.viewBackgroundColor,
        }}
      >
        {/* <Text style={{ ...styles.text, color: theme.buttonsText }}>
          Enter game key
        </Text> */}

        <TextInput
          style={{ ...styles.textInput, color: theme.color }}
          placeholderTextColor={theme.placeholderTextColor}
          placeholder="Enter game key here:"
          onChangeText={(text) => setKey(text)}
        />
         
<Button title="testbutton" onPress={()=> test()}></Button>
       <Text>{key2}</Text>
       <TextInput
         placeholder="emil"
         onChangeText={(text) => setKey1(text)}
       />
        <View
          style={{
            ...styles.underLineView,
            backgroundColor: theme.placeholderTextColor,
          }}
        />
      </View>

      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: theme.buttons }}
        onPress={() => {
          CreateGameSetup(gameQuestions, key, user);
          navigation.navigate('ParticipantScreen', { gameKey: key });
        }}
      >
        <Text style={{ ...styles.buttonText, color: theme.buttonsText }}>
          Go to lobby
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#146B66',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '10%',
    backgroundColor: '#AFEFDF',
    marginBottom: 100,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 22,
  },
  textInput: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: '400',
  },
  textView: {
    marginTop: 100,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  underLineView: {
    height: 2,
    backgroundColor: 'black',
    marginTop: 3,
    marginBottom: 15,
    width: '80%',
  },
});
