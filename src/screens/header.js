//REACT
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function CustomHeader() {
  return (
    <View style={{ width: '100%', backgroundColor: 'green' }}>
      <Ionicons name="menu" size={28}></Ionicons>
      <View style={styles.header}>
        <Text style={styles.headerText}>GameZone</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'blue',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: 'bold',
    backgroundColor: 'yellow',
    fontSize: 22,
    letterSpacing: 1,
  },
})
