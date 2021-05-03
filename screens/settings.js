//REACT
import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

// RESOURSES
import { schemes } from '../resources/colorSchemes'

// CONTEXT:S
import { ThemeContext } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'

//NAVIGATION
import { useNavigation } from '@react-navigation/native'

export default function Settings() {
  const { signOutUser } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigation = useNavigation()

  const changeTheme = (value) => {
    if (value === 'dark mode') {
      toggleTheme(schemes.Dark)
    } else if (value === 'defualt mode') {
      toggleTheme(schemes.Def)
    } else if (value === 'Easy read mode') {
      toggleTheme(schemes.EasyReadColor)
    }
  }

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.backgroundColor }}
    >
      <View
        style={{
          height: '80%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '80%',
          }}
        >
          <TouchableOpacity
            style={{ ...styles.thmesbuttons, backgroundColor: theme.buttons }}
            onPress={() => {
              changeTheme('dark mode')
              navigation.navigate('home')
            }}
          >
            <View>
              <Text style={{ ...styles.themeText, color: theme.buttonsText }}>
                Dark mode
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              changeTheme('defualt mode')
              navigation.navigate('home')
            }}
            style={{ ...styles.thmesbuttons, backgroundColor: theme.buttons }}
          >
            <View>
              <Text style={{ ...styles.themeText, color: theme.buttonsText }}>
                Defualt mode
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              changeTheme('Easy read mode')
              navigation.navigate('home')
            }}
            style={{ ...styles.thmesbuttons, backgroundColor: theme.buttons }}
          >
            <View>
              <Text style={{ ...styles.themeText, color: theme.buttonsText }}>
                Easy read mode
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '80%',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              signOutUser()
            }}
            style={{ ...styles.signOut, backgroundColor: theme.buttons }}
          >
            <View>
              <Text style={{ ...styles.themeText, color: theme.buttonsText }}>
                Sign out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#146B66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thmesbuttons: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AFEFDF',
    height: 60,
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
  },
  themeText: {
    fontSize: 22,
    fontWeight: '600',
  },
  signOut: {
    marginBottom: 50,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
})
