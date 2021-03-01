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

export default function CreateGameComponent() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [key, setKey] = useState('');
  const [gameQuestions, setGameQuestions] = useState();

  useEffect(() => {
    GetGameQuestions(setGameQuestions);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        <Text
          style={styles.text}
          /*  onPress={() => {
            //gameQuestions.sort(() => Math.random() - 0.5);

            console.log('q', gameQuestions);
          }} */
        >
          Enter game key
        </Text>

        <TextInput
          style={styles.textInput}
          placeholder="Enter key here:"
          onChangeText={(text) => setKey(text)}
        />
        <View style={styles.underLineView} />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            CreateGameSetup(gameQuestions, key, user);
            navigation.navigate('ParticipantScreen', { gameKey: key });
          }}
        >
          <Text style={styles.buttonText}>Go to lobby</Text>
        </TouchableOpacity>
      </View>
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
  },
  textView: {
    marginTop: 100,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  underLineView: {
    height: 2,
    backgroundColor: 'black',
    marginTop: 3,
    width: '100%',
  },
});
