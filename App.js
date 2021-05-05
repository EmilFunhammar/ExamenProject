import React from 'react'
import AuthNavigation from './src/navigation/auth_navigation'

import AuthContextProvider from './src/context/AuthContext'
//import { AuthContext } from './context/AuthContext';
import ThemeContextProvider from './src/context/ThemeContext'

export default function App() {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <AuthNavigation />
      </ThemeContextProvider>
    </AuthContextProvider>
  )
}
