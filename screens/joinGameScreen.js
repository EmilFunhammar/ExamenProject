import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AddUserToGame } from '../firebase/Firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../context/ThemeContext';

import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
//import { useEffect } from 'react/cjs/react.development';
import { useRef } from 'react';

export default function JoinGame() {
  const navigation = useNavigation();
  const [key, setKey] = useState('');
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [ifDocExsists, setIfDocExsists] = useState();
  let num = useRef(0);

  const navigate = () => {
    navigation.navigate('ParticipantScreen', { gameKey: key });
  };

  useEffect(() => {
    if (num.current !== 0) {
      if (ifDocExsists === true) {
        navigate();
      } else {
        Alert.alert('wrong key');
      }
    }
    num.current += 1;
  }, [ifDocExsists]);

  return (
    <LinearGradient
      colors={theme.linearBackgroundColor}
      style={styles.container}
    >
      <View style={styles.textView}>
        <Text
          style={styles.text}
          onPress={() => console.log('emil', ifDocExsists)}
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          AddUserToGame(user.displayName, user.email, key, setIfDocExsists);
        }}
      >
        <Text style={styles.buttonText}>Join game</Text>
      </TouchableOpacity>
    </LinearGradient>
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
    backgroundColor: '#AFEFDF',
    width: '80%',
    height: '15%',
    marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },

  buttonText: {
    fontSize: 30,
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
