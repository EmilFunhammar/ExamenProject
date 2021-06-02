//REACT
import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Touchable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Cache } from 'react-native-cache'
import { AsyncStorage } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import { useNavigation } from '@react-navigation/native'

//FIREBASE
import { GetHighScoreList } from '../firebase/Firebase'

//CONTEXT
import { ThemeContext } from '../context/ThemeContext'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function HighScore() {
  const navigation = useNavigation()
  const { theme } = useContext(ThemeContext)
  const [highScorePlayers, setHighScorePlayers] = useState([])

  useEffect(() => {
    NetInfo.fetch().then((networkState) => {
      // CHECKS FOR NETWORK AND USE CACHE IF NO NETWORK
      if (networkState.isConnected == true) {
        GetHighScoreList(setHighScorePlayers)
      } else if (networkState.isConnected == false) {
        ReadCaching()
      }
    })
  }, [])

  const cache = new Cache({
    namespace: 'FrågeSpelet',
    policy: {
      maxEntries: 50000,
    },
    backend: AsyncStorage,
  })
  //CACHING THE HIGHSCORE LIST
  const Caching = async () => {
    await cache.set('HighScoreList', highScorePlayers)
  }
  //GET THE CACH BY ID AND SETS THE STATEE TO RETURND CACH VALUE
  const ReadCaching = async () => {
    const value = await cache.get('HighScoreList')
    setHighScorePlayers(value)
  }
  return (
    <LinearGradient
      colors={theme.linearBackgroundColor}
      style={{ ...styles.container, backgroundColor: theme.backgroundColor }}
    >
      <View>
        <Text style={{ ...styles.title, color: theme.color }}>HighScore</Text>
        {/*    <Button
          title="cach"
          onPress={() => {
            Caching()
          }}
        ></Button>
        <Button
          title="read cach"
          onPress={() => {
            ReadCaching()
          }}
        ></Button> */}
        {/*   <Button
          title="delete"
          onPress={async () => {
            await cache.clearAll()
          }}
        ></Button> */}
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
      <View
        style={{
          position: 'relative',
          top: 400,
          width: '80%',
          height: '8%',
          borderRadius: 20,
          shadowColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.linearButton,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            //UPDATES CACHE
            Caching()
            navigation.navigate('home')
          }}
        >
          <Text style={{ color: theme.linearButtonText, fontSize: 22 }}>
            Home Page
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const HighScoreView = ({ element }) => {
  const { theme } = useContext(ThemeContext)
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
    width: '100%',
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
