import { useEffect } from 'react'
import authApi from '../api/auth'
import { useAuthStore } from '../stores/auth/store'

export const useAuthAccess = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    const getMeData = async () => {
      const res = await authApi.getMe()
      setIsAuthenticated(res.authenticated)
    }

    getMeData()
  })

  return isAuthenticated
}
