import React, { useState, useContext } from 'react'
import { useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { GetHighScoreList } from '../firebase/Firebase'
import { LinearGradient } from 'expo-linear-gradient'
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
        <Text style={styles.title}>HighScore</Text>
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
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Namn</Text>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Score</Text>
      </View>

      {highScorePlayers.map((element, index) => (
        <HighScoreView key={index} element={element} />
      ))}
    </LinearGradient>
  )
}

const HighScoreView = ({ element }) => {
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
        <Text style={styles.userName}>{element.name} </Text>
      </View>
      <View style={{ marginRight: 30 }}>
        <Text style={styles.userScore}>{element.score}</Text>
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
