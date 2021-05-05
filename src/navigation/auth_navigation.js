import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthenticatedStack from './authenticated_stack'
import UnathenticatedStack from './unauthenticated_stack'

import { AuthContext } from '../context/AuthContext'
import SplashPage from '../screens/splashScreen'
export default function AuthNavigation() {
  const { user, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <SplashPage />
  }
  return (
    <NavigationContainer>
      {user ? <AuthenticatedStack /> : <UnathenticatedStack />}
    </NavigationContainer>
  )
}
