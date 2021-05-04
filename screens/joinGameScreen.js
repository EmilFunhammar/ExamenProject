//REACT
import React, { useContext, useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useRef } from 'react'

//FIREBASE
import { AddUserToGame } from '../firebase/Firebase'

//CONTEXT
import { ThemeContext } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'

//NAVIGATION
import { useNavigation } from '@react-navigation/native'

export default function JoinGame() {
  const navigation = useNavigation()
  const [key, setKey] = useState('')
  const { theme } = useContext(ThemeContext)
  const { user } = useContext(AuthContext)
  const [ifDocExsists, setIfDocExsists] = useState()
  let num = useRef(0)

  const navigate = () => {
    navigation.navigate('ParticipantScreen', { gameKey: key })
  }

  useEffect(() => {
    if (num.current !== 0) {
      if (ifDocExsists === true) {
        navigate()
      } else {
        Alert.alert('Fel nyckel')
      }
    }
    num.current += 1
  }, [ifDocExsists])

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
          Ange spel nyckel
        </Text>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={theme.placeholderTextColor}
          placeholder="Ange nyckel här:"
          onChangeText={(text) => setKey(text)}
        />
        <View style={styles.underLineView} />
      </View>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: theme.linearButton,
          shadowColor: theme.shadowColor,
        }}
        onPress={() => {
          AddUserToGame(user.displayName, user.email, key, setIfDocExsists)
        }}
      >
        <Text style={styles.buttonText}>Gå med lobby</Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#146B66',
  },
  button: {
    width: '80%',
    height: '15%',
    marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 26,
    fontWeight: '600',
  },
  textInput: {
    fontWeight: '700',
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
})
