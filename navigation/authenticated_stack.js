import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../screens/home';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CreatGameComponent from '../screens/createGameScreen';
import JoinGame from '../screens/joinGameScreen';
import Participants from '../screens/participantScreen';
import GameWinner from '../screens/gameWinnerScreen';
import GameBoard from '../screens/gameScreen';
import { useState } from 'react/cjs/react.development';
import { ThemeContext } from '../context/ThemeContext';
import { schemes } from '../resources/colorSchemes';

const Stack = createStackNavigator();

export default function AuthenticatedStack() {
  const { theme } = useContext(ThemeContext);

  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={HomePage}
        options={{
          headerStyle: { backgroundColor: theme.buttons },
          headerTintColor: theme.buttonsText,
          headerTitle: () => <CustomHeader />,
          headerRight: () => <SignOutComponent />,
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
          headerStyle: { backgroundColor: '#AFEFDF' },
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
    </Stack.Navigator>
  );
}

const SignOutComponent = () => {
  const { signOutUser } = useContext(AuthContext);
  return (
    <Text style={styles.signOut} onPress={() => signOutUser()}>
      Sign out
    </Text>
  );
};

const CustomHeader = () => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>Närmast vinner</Text>
      </View>
    </View>
  );
};

const ThemeComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [value, setValue] = useState('Dark mode');

  const changeTheme = () => {
    if (value === 'Dark mode') {
      toggleTheme(schemes.Dark);
      setValue('Default mode');
    } else if (value === 'Default mode') {
      toggleTheme(schemes.Def);
      setValue('Dark mode');
    }
  };

  return (
    <View>
      <Text
        style={styles.Theme}
        onPress={() => {
          changeTheme();
        }}
      >
        {value}
      </Text>
    </View>
  );
};

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
  signOut: {
    marginEnd: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  Theme: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
