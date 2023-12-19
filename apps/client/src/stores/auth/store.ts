import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IUser {
  accessToken: string
  refreshToken?: string
}

type AuthStore = {
  isAuthenticated: boolean
  signIn: (payload: IUser) => void
  logout: () => void
  setIsAuthenticated: (payload: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      isAuthenticated: false,
      signIn: (payload: { accessToken: string }) => {
        localStorage.setItem('accessToken', payload.accessToken)
        set(() => ({ isAuthenticated: true }))
      },
      logout: () => {
        localStorage.removeItem('accessToken')
        set(() => ({ isAuthenticated: false }))
      },
      setIsAuthenticated: (payload: boolean) => {
        set(() => ({ isAuthenticated: payload }))
      },
    }),
    { name: 'authStore' },
  ),
)
