import { axiosApiInstance } from './clientApi'

interface IRegisterData {
  name: string
  email: string
  password: string
}

interface ILoginData {
  email: string
  password: string
}

const signUp = (data: IRegisterData) => axiosApiInstance.post(`api/auth/signup`, data)
const signIn = (data: ILoginData) => axiosApiInstance.post(`api/auth/signin`, data)
const logout = () => axiosApiInstance.get(`api/auth/logout`)

export default {
  signUp,
  signIn,
  logout,
}
