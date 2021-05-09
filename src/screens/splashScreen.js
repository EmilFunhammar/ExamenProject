//REACT
import React, { useContext } from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemeContext } from '../context/ThemeContext'

export default function SplashPage() {
  const { theme } = useContext(ThemeContext)

  return (
    /*   <ImageBackground
      style={styles.container}
      source={require('../../assets/Splash1.png')}
    > */

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
    //transform: [{ rotate: '300deg' }],
    fontSize: 42,
    fontWeight: 'bold',
  },
})
