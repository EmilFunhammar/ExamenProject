import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function JoinGame() {
  return (
    <View style={styles.container}>
      <Text>emil</Text>
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
  underLineView: {
    height: 2,
    backgroundColor: 'black',
    marginTop: 3,
    width: '100%',
  },
});
