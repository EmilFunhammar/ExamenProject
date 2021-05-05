//REACT
import React from 'react'
import { useState, useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

//CONTEXT
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const { logInUser, createUser } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')

  const logIn = () => {
    logInUser(email, password)
  }
  const registrerUser = () => {
    createUser(email, password, userName)
  }

  return (
    <LinearGradient
      colors={['#93F5EF', '#146B66', 'black']}
      style={styles.container}
    >
      <View style={styles.contentView}>
        <Text style={styles.logIntoText}>Log into to youre account!</Text>
        <View style={styles.textFeildView}>
          {/* <Text style={{ fontWeight: 'bold' }}>Email</Text> */}
          <TextInput
            style={styles.textinputs}
            placeholder="Enter Username:"
            placeholderTextColor="black"
            value={userName}
            onChangeText={setUserName}
          />
          <View style={styles.underLineView} />
          <TextInput
            style={styles.textinputs}
            placeholder="Enter email:"
            placeholderTextColor="black"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.underLineView} />
          <TextInput
            style={styles.textinputs}
            placeholder="Enter password:"
            placeholderTextColor="black"
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.underLineView} />
        </View>
        <View style={styles.width}>
          <TouchableOpacity onPress={() => logIn()}>
            <View style={styles.button}>
              <Text style={styles.buttonsText}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => registrerUser()}>
            <View style={{ ...styles.button, ...styles.signUpButton }}>
              <Text style={styles.buttonsText}>Sign up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textinputs: {
    padding: 8,
    fontSize: 30,
  },
  contentView: {
    width: '80%',
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textFeildView: { width: '100%', marginBottom: 40 },
  underLineView: {
    height: 3,
    backgroundColor: 'black',
    width: '100%',
    marginBottom: 20,
  },
  buttonsView: {
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AFEFDF',
    borderRadius: 10,
    width: '100%',
    marginBottom: 30,
    height: 55,
  },
  signUpButton: {
    opacity: 0.5,
    marginBottom: 100,
  },
  buttonsText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  logIntoText: {
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 10,
  },
  width: {
    width: '100%',
  },
})
