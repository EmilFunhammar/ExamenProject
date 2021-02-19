import React, { createContext, useState } from 'react';
import schemes from '../resources/Schemes';

export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(schemes.MYLI1);

  const toggleTheme = (value) => {
    setTheme(value);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
