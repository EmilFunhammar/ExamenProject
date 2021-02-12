import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function JoinGame() {
  const navigation = useNavigation();
  const [userArray, setUserArray] = useState([
    'emil',
    'ida',
    'victor',
    'erika',
  ]);

  return (
    <LinearGradient
      colors={['#93F5EF', '#146B66', 'black']}
      style={styles.container}
    >
      <View style={styles.participantView}>
        <Text style={styles.participantTextHeader}>Participants</Text>

        {userArray.map((element, index) => (
          <ParticipantView key={index} element={element} />
        ))}
      </View>

      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigation.navigate('GameScreen')}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const ParticipantView = ({ element }) => {
  return (
    <>
      <Text style={styles.participantText}>{element}</Text>
      <View style={styles.underLineView} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#146B66',
  },
  button1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '10%',
    backgroundColor: '#AFEFDF',
    marginBottom: 100,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '600',
  },
  underLineView: {
    height: 3,
    backgroundColor: 'black',
    marginTop: 3,
    width: '60%',
  },
  participantText: {
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    letterSpacing: 4,
    fontSize: 22,
  },
  participantTextHeader: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },
  participantView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AFEFDF',
    width: '80%',
    height: '10%',
    marginBottom: 100,
    borderRadius: 20,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
});
