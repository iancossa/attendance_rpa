import React from 'react'
import { Button } from './ui/Button'
import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useThemeStore()

  const handleToggle = () => {
    console.log('Theme toggle clicked, current isDark:', isDark)
    toggleTheme()
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className="fixed bottom-4 right-4 z-50 shadow-lg"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  )
}

export default ThemeToggle