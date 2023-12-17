import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUp: (state, { payload }) => {
      localStorage.setItem('access_token', payload.access_token)
      state.isAuthenticated = true
    },
    signIn: (state, { payload }) => {
      localStorage.setItem('access_token', payload.access_token)
      state.isAuthenticated = true
    },
    logout: (state) => {
      localStorage.removeItem('access_token')
      state.isAuthenticated = false
    },
  },
})

export const { signUp, signIn, logout } = authSlice.actions

export default authSlice.reducer
