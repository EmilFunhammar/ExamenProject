import React from 'react';
import AuthNavigation from './navigation/auth_navigation';
import AuthContextProvider from './context/AuthContext';
import { AuthContext } from './context/AuthContext';
import ThemeContextProvider from './context/ThemeContext';

export default function App() {
  return (
    <AuthContextProvider>
      <AuthNavigation />
    </AuthContextProvider>
  );
}
