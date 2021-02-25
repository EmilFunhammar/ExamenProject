import React from 'react';
import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { GetUsers, SnapShotUsers } from '../firebase/Firebase';
import { ThemeContext } from '../context/ThemeContext';

export default function HomePage() {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.backgroundColor,
      }}
    >
      <View
        style={{
          height: '55%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => SnapShotUsers()}
        >
          <View style={styles.buttons}>
            <Text style={styles.buttonsText}>Highscore</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => navigation.navigate('CreateGame')}
        >
          <View style={styles.buttons}>
            <Text style={styles.buttonsText}>Create game</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => navigation.navigate('JoinGame')}
        >
          <View style={styles.buttons}>
            <Text style={styles.buttonsText}>Join game</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
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
});
