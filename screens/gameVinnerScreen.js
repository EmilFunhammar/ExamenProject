import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GameWinner() {
  return (
    <View style={styles.container}>
      <Text>THis is Winner Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
