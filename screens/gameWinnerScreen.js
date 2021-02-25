import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function GameWinner() {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text onPress={() => console.log(user)}>THis is Winner Screen</Text>
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
