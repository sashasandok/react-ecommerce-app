import { get } from './clientApi'

const getUsersList = () => get(`users`)

export default {
  getUsersList,
}
