import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function JoinGame() {
  const navigation = useNavigation();
  const [key, setKey] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.text}>Enter game key</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter key here:"
          onChangeText={(text) => setKey(text)}
        />
        <View style={styles.underLineView} />
      </View>

      {/* <View
        style={{
          width: '100%',
          height: '50%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'grey',
        }}
      > */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ParticipantScreen')}
      >
        <Text style={styles.buttonText}>Join game</Text>
      </TouchableOpacity>
    </View>
    //</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#146B66',
  },
  button: {
    backgroundColor: '#AFEFDF',
    width: '80%',
    height: '15%',
    marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },

  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 22,
  },
  textInput: {
    marginTop: 40,
    fontSize: 20,
  },
  textView: {
    marginTop: 100,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  underLineView: {
    height: 2,
    backgroundColor: 'black',
    marginTop: 3,
    width: '100%',
  },
});
