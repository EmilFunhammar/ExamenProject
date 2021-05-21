//REACT
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

//NAVIGATION
import { useNavigation } from '@react-navigation/native'

//FIREBASE
import {
  GetQuestionInfo,
  SnapShotUsers,
  SnapShotStartGame,
  StartGame,
  addUserAnswer,
} from '../firebase/Firebase'

// CONTEXTS
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'

export default function JoinGame({ route }) {
  const { user } = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)
  const navigation = useNavigation()
  const { gameKey } = route.params
  const [userArray, setUserArray] = useState([''])
  const [questionArray, setQuestionArray] = useState([''])
  const [shouldShow, setShouldShow] = useState(false)
  const [startGame, setStartGame] = useState(false)

  useEffect(() => {
    SnapShotUsers(setUserArray, gameKey)
    SnapShotStartGame(setStartGame, gameKey)
    GetQuestionInfo(setQuestionArray, gameKey)
  }, [])

  // checks if user is host and shows start game
  useEffect(() => {
    userArray.forEach((element) => {
      if (user.email === element.userEmail) {
        if (element.host) {
          return setShouldShow(true)
        } else {
          return setShouldShow(false)
        }
      }
    })
  }, [userArray])

  useEffect(() => {
    if (startGame) {
      navigation.navigate('GameScreen', {
        questionArray: questionArray,
        gameKey: gameKey,
      })
    }
  }, [startGame])

  return (
    <LinearGradient
      colors={theme.linearBackgroundColor}
      style={{ ...styles.container, backgroundColor: theme.backgroundColor }}
    >
      <View style={styles.participantView}>
        <Text style={{ ...styles.participantTextHeader, color: theme.color }}>
          Deltagare
        </Text>
        <Text style={{ color: theme.color }}>Spel nyckel:</Text>
        <Text style={{ ...styles.gameKey, color: theme.color }}>{gameKey}</Text>

        {userArray.map((element, index) => (
          <ParticipantView key={index} element={element.userDisplayName} />
        ))}
      </View>
      {/* hide the start button for the other players */}
      {shouldShow ? (
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: theme.linearButton,
            shadowColor: theme.shadowColor,
          }}
          onPress={() => {
            StartGame(gameKey)
          }}
        >
          <Text style={{ ...styles.buttonText, color: theme.buttonText }}>
            Starta Spel
          </Text>
        </TouchableOpacity>
      ) : null}
    </LinearGradient>
  )
}

const ParticipantView = ({ element }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      <Text style={{ ...styles.participantText, color: theme.color }}>
        {element}
      </Text>
      <View style={{ ...styles.underLineView, backgroundColor: theme.color }} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#146B66',
  },
  button1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '10%',
    backgroundColor: '#AFEFDF',
    marginBottom: 100,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '600',
  },
  underLineView: {
    height: 3,
    backgroundColor: 'black',
    marginTop: 3,
    width: '60%',
  },
  participantText: {
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    letterSpacing: 4,
    fontSize: 22,
  },
  participantTextHeader: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },
  participantView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AFEFDF',
    width: '80%',
    height: '10%',
    marginBottom: 100,
    borderRadius: 15,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  gameKey: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
})
