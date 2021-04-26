import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { GetUsers, SnapShotUsers, saveGameWinner } from '../firebase/Firebase'
import { ThemeContext } from '../context/ThemeContext'
import { schemes } from '../resources/colorSchemes'

export default function HomePage() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const navigation = useNavigation()

  return (
    <LinearGradient
      colors={theme.linearBackgroundColor}
      style={{ ...styles.container, backgroundColor: theme.backgroundColor }}
    >
      {/*  <View
        style={{
          ...styles.container,
          backgroundColor: theme.linearBackgroundColor,
        }}
      > */}
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: '55%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.touchableOpacity,
            backgroundColor: theme.buttons,
          }}
          onPress={() => navigation.navigate('HighScore')}
        >
          <View style={styles.buttons}>
            <Text style={{ ...styles.buttonsText, color: theme.buttonsText }}>
              Highscore
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.touchableOpacity,
            backgroundColor: theme.buttons,
          }}
          onPress={() => navigation.navigate('CreateGame')}
        >
          <View>
            <Text style={{ ...styles.buttonsText, color: theme.buttonsText }}>
              Create game
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.touchableOpacity,
            backgroundColor: theme.buttons,
          }}
          onPress={() => navigation.navigate('JoinGame')}
        >
          <View style={styles.buttons}>
            <Text style={{ ...styles.buttonsText, color: theme.buttonsText }}>
              Join game
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#146B66',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonsText: {
    fontSize: 35,
    fontWeight: '800',
  },
  touchableOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AFEFDF',
    width: '80%',
    height: '25%',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
})
