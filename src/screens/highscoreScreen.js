//REACT
import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

//FIREBASE
import { GetHighScoreList } from '../firebase/Firebase'

//CONTEXT
import { ThemeContext } from '../context/ThemeContext'

export default function HighScore() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [highScorePlayers, setHighScorePlayers] = useState([])

  useEffect(() => {
    GetHighScoreList(setHighScorePlayers)
  }, [])

  return (
    <LinearGradient
      colors={theme.linearBackgroundColor}
      style={{ ...styles.container, backgroundColor: theme.backgroundColor }}
    >
      <View>
        <Text style={{ ...styles.title, color: theme.color }}>HighScore</Text>
      </View>
      <View
        style={{
          position: 'relative',
          top: '20%',
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: theme.color }}>
          Namn
        </Text>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: theme.color }}>
          Score
        </Text>
      </View>

      {highScorePlayers.map((element, index) => (
        <HighScoreView key={index} element={element} />
      ))}
    </LinearGradient>
  )
}

const HighScoreView = ({ element }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '80%',
        position: 'relative',
        top: '25%',
        justifyContent: 'space-between',
      }}
    >
      <View style={{}}>
        <Text style={{ ...styles.userName, color: theme.color }}>
          {element.name}
        </Text>
      </View>
      <View style={{ marginRight: 30 }}>
        <Text style={{ ...styles.userScore, color: theme.color }}>
          {element.score}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#146B66',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
  },
  userScore: {
    fontSize: 22,
    fontWeight: '600',
  },
})
