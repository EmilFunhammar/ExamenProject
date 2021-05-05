import React, { createContext, useState } from 'react';
import { schemes } from '../resources/colorSchemes';

export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(schemes.Def);

  const toggleTheme = (value) => {
    setTheme(value);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
