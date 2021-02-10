import React, { useState, createContext, useEffect } from 'react';
import { auth } from './firebase_context';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
  });

  const logInUser = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('sucssesful login');
    } catch (error) {
      var errorMessage = error.message;
      console.log('error', errorMessage);
    }
  };
  const createUser = async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      console.log('sucssesful sign up');
    } catch (error) {
      var errorMessage = error.message;
      console.log('error', errorMessage);
    }
  };

  const signOutUser = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      var errorMessage = error.message;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, logInUser, createUser, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
