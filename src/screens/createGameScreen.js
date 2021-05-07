//REACT
import React, { useContext, useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

//FIREBASE
import { GetGameQuestions, CreateGameSetup } from '../firebase/Firebase'

//CONTEXT
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'

//NAVIGATION
import { useNavigation } from '@react-navigation/native'

export default function CreateGameComponent() {
  const navigation = useNavigation()
  const { user } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)

  const [key, setKey] = useState('')
  const [gameQuestions, setGameQuestions] = useState()

  useEffect(() => {
    GetGameQuestions(setGameQuestions)
  }, [])
  return (
    <LinearGradient
      colors={theme.linearBackgroundColor}
      style={{ ...styles.container, backgroundColor: theme.backgroundColor }}
    >
      <View
        style={{
          ...styles.textView,
        }}
      >
        <Text style={{ ...styles.text, color: theme.color }}>
          Ange spel nyckel
        </Text>

        <TextInput
          style={{ ...styles.textInput, color: theme.color }}
          placeholderTextColor={theme.placeholderTextColor}
          placeholder="Ange spel nyckel här:"
          onChangeText={(text) => setKey(text)}
        />
        <View
          style={{
            ...styles.underLineView,
            backgroundColor: theme.color,
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: theme.buttons,
          shadowColor: theme.shadowColor,
        }}
        onPress={() => {
          CreateGameSetup(gameQuestions, key, user)
          navigation.navigate('ParticipantScreen', { gameKey: key })
        }}
      >
        <Text style={{ ...styles.buttonText, color: theme.buttonsText }}>
          Gå till lobby
        </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '15%',
    marginBottom: 80,
    borderRadius: 15,
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
    marginTop: 40,
    fontSize: 20,
    fontWeight: '700',
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
    width: '100%',
  },
})
