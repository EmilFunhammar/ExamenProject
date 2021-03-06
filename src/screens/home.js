//REACT
import React, { useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

//NAVIGATION
import { useNavigation } from '@react-navigation/native'

//CONTEXTS
import { ThemeContext } from '../context/ThemeContext'

export default function HomePage() {
  const { theme } = useContext(ThemeContext)
  const navigation = useNavigation()

  return (
    <LinearGradient
      colors={theme.linearBackgroundColor}
      style={{ ...styles.container, backgroundColor: theme.backgroundColor }}
    >
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
          onPress={() => {
            navigation.navigate('HighScore')
          }}
        >
          <View style={styles.buttons}>
            <Text style={{ ...styles.buttonsText, color: theme.buttonsText }}>
              Toppresultat
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
              Skapa spel
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
              Gå med spel
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
