import { inject } from 'vue'
import type { Ref } from 'vue'

export type Theme = 'light' | 'dark'

export interface ThemeContext {
  isDarkMode: Ref<boolean>
  toggleTheme: () => void
}

export function useTheme(): ThemeContext {
  const theme = inject<ThemeContext>('theme')

  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider.')
  }

  return theme
}
