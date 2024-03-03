import { ReactNode, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useTodoStore } from '../store/todo-store.ts'
import { useAuthStore } from '../store/auth-store.ts'

type AuthGuardProps = {
  children: ReactNode
}

function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate()

  const isLoading = useTodoStore((state) => state.isLoading)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/authentication')
    }
  }, [isAuthenticated, navigate, isLoading])

  return <div>{children}</div>
}

export default AuthGuard
