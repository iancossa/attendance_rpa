import { create } from 'zustand'

interface ThemeState {
  isDark: boolean
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => {
    const newTheme = !state.isDark
    
    // Apply theme to document
    if (newTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    
    return { isDark: newTheme }
  }),
}))