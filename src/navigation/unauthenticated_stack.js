import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';

const Stack = createStackNavigator();

export default function UnathenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
