import { post, get } from './clientApi'

interface IRegisterData {
  name: string
  email: string
  password: string
}

interface ILoginData {
  email: string
  password: string
}

const signUp = (data: IRegisterData) => post(`auth/signup`, data)
const signIn = (data: ILoginData) => post(`auth/signin`, data)
const logout = () => get(`auth/logout`)
const getMe = () => get(`auth/getme`)

export default {
  signUp,
  signIn,
  logout,
  getMe,
}
