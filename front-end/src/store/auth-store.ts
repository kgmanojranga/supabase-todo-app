import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  isAuthenticated: boolean
  accessToken: string
}

type Action = {
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setAccessToken: (accessToken: string) => void
}

const useAuthStore = create<State & Action, [['zustand/persist', unknown]]>(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: '',
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({
          isAuthenticated: isAuthenticated,
        }),
      setAccessToken: (accessToken: string) =>
        set({
          accessToken: accessToken,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export { useAuthStore }
