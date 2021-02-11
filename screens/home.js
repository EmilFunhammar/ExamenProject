import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomePage() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchableOpacity}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#146B66',
    justifyContent: 'space-evenly',
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
