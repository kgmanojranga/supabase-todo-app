import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage.tsx'
import Authentication from './pages/Authentication.tsx'
import { useEffect } from 'react'
import { supabase } from './supabase-config'
import Todos from './pages/Todos.tsx'

import AuthGuard from './components/AuthGuard.tsx'
import { useAuthStore } from './store/auth-store.ts'
import { useTodoStore } from './store/todo-store.ts'

function App() {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
  const [isLoading, setIsLoading] = useTodoStore((state) => [
    state.isLoading,
    state.setIsLoading,
  ])

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, _) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true)
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false)
      }
    })

    setIsLoading(false)

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [setIsAuthenticated, setIsLoading])

  if (isLoading) {
    return <div>Loading....</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/authentication' element={<Authentication />} />
        <Route
          path='/todos'
          element={
            <AuthGuard>
              <Todos />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
