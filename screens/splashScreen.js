//REACT
import React from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
} from 'react-native'

export default function SplashPage() {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/splashScreen.png')}
    >
      <Text style={styles.text}>Välkomen till</Text>
      <Text style={styles.text}>Vem kan minst!!!</Text>
      <ActivityIndicator animating={true} />
    </ImageBackground>
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
    //transform: [{ rotate: '300deg' }],
    fontSize: 60,
    fontWeight: 'bold',
  },
})
