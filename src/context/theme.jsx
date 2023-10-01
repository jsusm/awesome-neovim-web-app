import { createContext, useState, useEffect, useContext } from 'react'

export const themeContext = createContext('light')

function getInitialTheme() {
  const theme = window.localStorage.getItem('theme')
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    return 'dark'
  }
  return 'light'
}

export const useTheme = () => useContext(themeContext)

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(getInitialTheme())
  useEffect(() => {
    if(theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    window.localStorage.setItem('theme', theme)
    console.log('theme setted')
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  return (
    <themeContext.Provider value={{theme, setTheme, toggleTheme}}>
      {props.children}
    </themeContext.Provider>
  )
}
