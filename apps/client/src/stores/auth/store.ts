import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type AuthStore = {
  isAuthenticated: boolean
  signIn: ({ isAuthenticated }: { isAuthenticated: boolean }) => void
  logout: () => void
  setIsAuthenticated: (payload: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      isAuthenticated: false,
      signIn: ({ isAuthenticated }: { isAuthenticated: boolean }) => {
        set(() => ({ isAuthenticated }))
      },
      logout: () => {
        set(() => ({ isAuthenticated: false }))
      },
      setIsAuthenticated: (payload: boolean) => {
        set(() => ({ isAuthenticated: payload }))
      },
    }),
    { name: 'authStore' },
  ),
)
