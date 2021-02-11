import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default function JoinGame() {
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
      <View style={styles.button}>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Join lobby</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '10%',
    backgroundColor: '#AFEFDF',
    marginBottom: 100,
  },
  buttonText: {
    fontSize: 20,
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
