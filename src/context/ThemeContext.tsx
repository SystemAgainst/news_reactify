import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('context not found');
  }

  return context;
};

interface IThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}