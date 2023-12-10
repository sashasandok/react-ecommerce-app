import { FC, ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface IProtectedRouteProps {
  isAllowed: boolean
  redirectPath?: string
  children?: ReactNode
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  isAllowed,
  redirectPath = '/login',
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}
