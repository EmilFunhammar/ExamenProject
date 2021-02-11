import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function GameBoard() {
  return (
    <View>
      <View>
        <Text style={styles.participants}>email</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.button}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
