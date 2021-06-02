//REACT
import React, { useContext } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react/cjs/react.development'
import { LinearGradient } from 'expo-linear-gradient'

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
  let winnerAry = []

  const SortOutWinner = () => {
    let ary = []

    let highScoreName = userAry[0].userDisplayName
    userAry.sort((a, b) => b.userScore - a.userScore)
    let obj = {
      userName: highScoreName,
      userScore: userAry[0].userScore,
    }

    ary.push(obj)
    if (userAry.length != 1) {
      console.log(userAry.length)
      for (let i = 0; i < userAry.length - 1; i++) {
        let y = i + 1
        if (userAry[i].userScore === userAry[y].userScore) {
          let obj = {
            userName: userAry[y].userDisplayName,
            userScore: userAry[y].userScore,
          }
          ary.push(obj)
        }
      }
    }

    winnerAry = [...ary]
    return ary.map((element, index) => (
      <WinnerComponent userDisplayName={element.userName} key={index} />
    ))
  }

  useEffect(() => {
    GetUsers(setUserAry, gameKey)
  }, [])
  return (
    <LinearGradient
      colors={theme.linearBackgroundColor}
      style={{
        ...styles.container,
        backgroundColor: theme.backgroundColor,
      }}
    >
      <View
        style={{
          width: '100%',
          height: '30%',
          justifyContent: 'flex-start',
        }}
      >
        <View style={styles.QuestionMaserView}>
          <Text style={{ ...styles.QuestionMaserText, color: theme.color }}>
            Vinnare!
          </Text>
          {SortOutWinner()}
        </View>
      </View>

      <View
        style={{
          width: '100%',
          height: '40%',
          marginTop: 50,
          justifyContent: 'flex-start',
        }}
      >
        <View
          style={{
            backgroundColor: theme.color,
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
              style={{
                fontSize: 32,
                marginLeft: '15%',
                fontWeight: 'bold',
                color: theme.color,
              }}
            >
              Namn
            </Text>
            <Text
              style={{
                fontSize: 32,
                marginRight: '17%',
                fontWeight: 'bold',
                color: theme.color,
              }}
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
      </View>
      <View
        style={{
          height: '15%',
          width: '80%',
          marginBottom: '10%',
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            backgroundColor: theme.buttons,
          }}
          onPress={() => {
            // Checks if user are host and upload the winner to highscore
            for (let i = 0; i < userAry.length; i++) {
              if (
                userAry[i].host != null &&
                userAry[i].userEmail === user.email
              ) {
                saveGameWinner(winnerAry)
              }
            }
            navigation.navigate('home')
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 32,
              color: theme.buttonsText,
            }}
          >
            Quit Game
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const WinnerComponent = ({ userDisplayName }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <View
      style={{
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: '500',
          color: theme.color,
        }}
      >
        {userDisplayName}
      </Text>
    </View>
  )
}

const ScoreComponent = ({ userScore, userName }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <View style={styles.UserTableView}>
      <Text
        style={{
          ...styles.UserTableText,
          marginLeft: '15%',
          fontWeight: '500',
          color: theme.color,
        }}
      >
        {userName}
      </Text>
      <Text
        style={{
          ...styles.UserTableText,
          marginRight: '25%',
          fontWeight: '500',
          color: theme.color,
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
    height: '100%',
    marginTop: 30,
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
  },
})
