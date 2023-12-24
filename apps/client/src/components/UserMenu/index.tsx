import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FcExpand } from 'react-icons/fc'
// chakra ui components
import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react'
// api
import authApi from '../../api/auth'
// store
import { useAuthStore } from '../../stores/auth/store'

export const UserMenu = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)

  const onUserLogout = async () => {
    try {
      const res = await authApi.logout()
      if (res.status === 200) {
        navigate('/signin')
        logout()
        toast.success('Successfuly logged out, by')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.success(error?.message)
      setIsAuthenticated(true)
    }
  }

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FcExpand />}>
        Oleksandr Prokopenko
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem onClick={onUserLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}
