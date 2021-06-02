//REACT
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import { ThemeContext } from '../context/ThemeContext'
import { EvilIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

//SCREENS
import HomePage from '../screens/home'
import CreatGameComponent from '../screens/createGameScreen'
import JoinGame from '../screens/joinGameScreen'
import Participants from '../screens/participantScreen'
import GameWinner from '../screens/gameWinnerScreen'
import GameBoard from '../screens/gameScreen'
import Settings from '../screens/settings'
import HighScore from '../screens/highscoreScreen'

const Stack = createStackNavigator()

export default function AuthenticatedStack() {
  const { theme } = useContext(ThemeContext)

  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={HomePage}
        options={{
          headerStyle: { backgroundColor: theme.buttons },
          headerTintColor: theme.buttonsText,
          headerTitle: () => <CustomHeader name={'Vem kan minst?'} />,
          headerLeft: () => <ThemeComponent />,
        }}
      />
      <Stack.Screen
        name="CreateGame"
        component={CreatGameComponent}
        options={{
          headerStyle: { backgroundColor: theme.buttons },
          headerTintColor: theme.buttonsText,
          title: '',
        }}
      />
      <Stack.Screen
        name="JoinGame"
        component={JoinGame}
        options={{
          headerStyle: { backgroundColor: theme.buttons },
          headerTintColor: theme.buttonsText,
          title: '',
        }}
      />
      <Stack.Screen
        name="WinnerScreen"
        component={GameWinner}
        options={{
          headerStyle: { backgroundColor: '#AFEFDF' },
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ParticipantScreen"
        component={Participants}
        options={{
          headerStyle: { backgroundColor: '#AFEFDF' },
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GameScreen"
        component={GameBoard}
        options={{ title: '', headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: () => <CustomHeader name={'Settings'} />,
          headerStyle: { backgroundColor: theme.buttons },
          headerTintColor: theme.buttonsText,
        }}
      />
      <Stack.Screen
        name="HighScore"
        component={HighScore}
        options={{
          headerLeft: () => '',
          title: '',
          headerShown: true,
          headerStyle: { backgroundColor: theme.buttons },
          headerTintColor: theme.buttonsText,
        }}
      />
    </Stack.Navigator>
  )
}

const CustomHeader = ({ name }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <View style={styles.header}>
      <View>
        <Text style={{ ...styles.headerText, color: theme.buttonsText }}>
          {name}
        </Text>
      </View>
    </View>
  )
}

const ThemeComponent = () => {
  const navigation = useNavigation()
  const { theme } = useContext(ThemeContext)
  let color = `${theme.buttonsText}`

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <View style={styles.Theme}>
        <EvilIcons name="gear" size={32} color={color} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 1,
  },
  Theme: {
    marginLeft: 10,
  },
})
