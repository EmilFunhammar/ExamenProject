//REACT
import React, { useContext } from 'react'
import { ActivityIndicator, StyleSheet, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemeContext } from '../context/ThemeContext'

export default function SplashPage() {
  const { theme } = useContext(ThemeContext)

  return (
    <LinearGradient
      colors={theme.linearBackgroundColor}
      style={styles.container}
    >
      <Text style={styles.text}>Fråge Spelet</Text>
      <ActivityIndicator animating={true} size="large" color="black" />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#146B66',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    position: 'absolute',
    top: '30%',

    fontSize: 42,
    fontWeight: 'bold',
  },
})
