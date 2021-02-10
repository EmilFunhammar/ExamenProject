import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react/cjs/react.development';
import { AuthContext } from '../context/AuthContext';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const { signOutUser } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Open up homes!</Text>
      <Button title="sign ut" onPress={() => signOutUser()} />
      <StatusBar style="auto" />
      <TextInput
        style={styles.textinputs}
        placeholder="Enter email:"
        placeholderTextColor="black"
        //value={email}
        //onChangeText={setEmail}
        onChangeText={(text) => setEmail(text)}
      />
      <Text>e{email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
