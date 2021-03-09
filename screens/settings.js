import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { schemes } from '../resources/colorSchemes';

export default function Settings() {

  return <View style={StyleSheet.container}>
      <Text>Dark mode</Text>
      <Text>Dark mode</Text>
  </View>;
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#146B66',
      justifyContent: 'center',
      alignItems: 'center',
    }}