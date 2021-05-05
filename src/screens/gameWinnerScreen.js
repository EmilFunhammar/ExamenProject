//REACT
import React, { useContext } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react/cjs/react.development'

//CONTEXT
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'

//FIREBASE
import { GetUsers, saveGameWinner } from '../firebase/Firebase'

//NAVIGATION
import { useNavigation } from '@react-navigation/native'

export default function GameWinner({ route }) {
  const navigation = useNavigation()
  const { gameKey } = route.params
  const { user } = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)
  const [userAry, setUserAry] = useState([''])
  const [winnerName, setWinnerName] = useState('')
  const [winnerScore, setWinnerScore] = useState(0)
  let highScore = 0
  let highScoreName = ''

  const SortOutWinner = () => {
    for (let index = 0; index < userAry.length; index++) {
      if (userAry[index].userScore > highScore) {
        highScore = userAry[index].userScore
        highScoreName = userAry[index].userDisplayName
      }
    }
    //setWinnerName(highScoreName)
    //setWinnerScore(highScore)
    //saveGameWinner(winnerScore, winnerName)
    return highScoreName
  }
  useEffect(() => {
    GetUsers(setUserAry, gameKey)
  }, [])
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.lightBackgroundColor,
      }}
    >
      <View
        style={{
          width: '100%',
          height: '10%',
          justifyContent: 'flex-start',
          marginTop: '10%',
        }}
      >
        {/*  <View style={styles.titleView}>
          <Text style={styles.titleText}>Score</Text>
        </View> */}
        <View style={styles.QuestionMaserView}>
          <Text style={styles.QuestionMaserText}>Vinnare!</Text>
          <Text style={styles.QuestionMaserUserNameText}>
            {SortOutWinner()}
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          height: '60%',
          marginTop: 50,
          justifyContent: 'flex-start',
        }}
      >
        <View
          style={{
            backgroundColor: 'black',
            height: 3,
            width: '90%',
            marginLeft: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{ fontSize: 32, marginLeft: '15%', fontWeight: 'bold' }}
            >
              Namn
            </Text>
            <Text
              style={{ fontSize: 32, marginRight: '17%', fontWeight: 'bold' }}
            >
              Poäng
            </Text>
          </View>

          {userAry.map((element, index) => (
            <ScoreComponent
              userScore={element.userScore}
              userName={element.userDisplayName}
              key={index}
            />
          ))}
          <ScoreComponent />
        </ScrollView>
        {/* <View
          style={{
            height: '30%',
          }}
        ></View> */}
      </View>
      <View
        style={{
          height: '15%',
          width: '80%',
          marginBottom: '5%',
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            //...styles.button,
            backgroundColor: theme.backgroundColor,
          }}
          onPress={() => {
            saveGameWinner(highScoreName, highScore)
            navigation.navigate('home')
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 32 }}>Quit Game</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const ScoreComponent = ({ userScore, userName }) => {
  return (
    <View style={styles.UserTableView}>
      <Text
        style={{
          ...styles.UserTableText,
          marginLeft: '15%',
          fontWeight: '500',
        }}
      >
        {userName}
      </Text>
      <Text
        style={{
          ...styles.UserTableText,
          marginRight: '25%',
          fontWeight: '500',
        }}
      >
        {userScore}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#146B66',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleView: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  QuestionMaserView: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  UserTableView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
  },
  QuestionMaserText: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  QuestionMaserUserNameText: {
    fontSize: 45,
    marginTop: 20,
    fontWeight: '500',
  },
  UserTableText: {
    fontSize: 26,
    marginTop: 15,
  },
  button: {
    backgroundColor: '#AFEFDF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 10,
    height: '80%',
    marginTop: 10,
  },
})
