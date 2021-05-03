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
  const [useEffectSub, setUseEffectSub] = useState(true)

  /*   const SnapShots = () => {
    SnapShotUsers(setUserArray, gameKey);
    SnapShotStartGame(setStartGame, gameKey);
  }; */
  useEffect(() => {
    SnapShotUsers(setUserArray, gameKey)
    SnapShotStartGame(setStartGame, gameKey)
    GetQuestionInfo(setQuestionArray, gameKey)
    //isHost();
  }, [])

  useEffect(() => {
    //let juseEffectSub = true;
    if (useEffectSub) {
      userArray.forEach((element) => {
        if (user.email === element.userEmail) {
          if (element.host) {
            console.log('true i isHost')
            return setShouldShow(true)
          } else {
            console.log('false i isHost')
            return setShouldShow(false)
          }
        }
      })
    }
  }, [userArray])

  useEffect(() => {
    if (startGame) {
      setUseEffectSub(false)
      navigation.navigate('GameScreen', {
        questionArray: questionArray,
        gameKey: gameKey,
      })
    } else {
      console.log(startGame)
    }
  }, [startGame])

  return (
    <LinearGradient
      colors={theme.linearBackgroundColor}
      style={{ ...styles.container, backgroundColor: theme.backgroundColor }}
    >
      <View style={styles.participantView}>
        <Text
          style={styles.participantTextHeader}
          onPress={() => {
            /*   for (let index = 0; index < questionAnswersArray.length; index++) {
              questionAnswersArray[index].Answers.sort(
                () => Math.random() - 0.5
              );
            } */
            //GetQuestionInfo(setQuestionArray, gameKey);
            //isHost();
          }}
        >
          Deltagare
        </Text>
        <Text>Spel nyckel:</Text>
        <Text style={styles.gameKey}>{gameKey}</Text>

        {userArray.map((element, index) => (
          <ParticipantView key={index} element={element.userDisplayName} />
        ))}
      </View>
      {shouldShow ? (
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: theme.linearButton,
            shadowColor: theme.shadowColor,
          }}
          onPress={() => {
            StartGame(gameKey)
            addUserAnswer(gameKey, userArray, user)
            /* navigation.navigate('GameScreen', {
              questionArray: questionArray,
              gameKey: gameKey,
            }); */
          }}
        >
          <Text style={{ ...styles.buttonText, color: theme.linearButtonText }}>
            Starta Spel
          </Text>
        </TouchableOpacity>
      ) : null}

      {/*  <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('GameScreen', {
            questionArray: questionArray,
            gameKey: gameKey,
          });
        }}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity> */}
    </LinearGradient>
  )
}

const ParticipantView = ({ element }) => {
  return (
    <>
      <Text style={styles.participantText}>{element}</Text>
      <View style={styles.underLineView} />
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
