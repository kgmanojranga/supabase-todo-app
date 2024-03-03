import { create } from 'zustand'

export type Todo = {
  id: string
  todo: string
  user_id: string
}

const initialState: Todo[] = []

type State = {
  todos: Todo[]

  isLoading: boolean
}

type Action = {
  setTodos: (todo: Todo[]) => void

  setIsLoading: (isLoading: boolean) => void
  deleteTodo: (id: string) => void
  updateTodo: (todoToBeUpdated: Todo, updatedText: string) => void
}

const useTodoStore = create<State & Action>((set) => ({
  todos: initialState,

  isLoading: true,
  setTodos: (todo: Todo[]) => {
    set(() => ({
      todos: [...todo],
    }))
  },
  setIsLoading: (isLoading: boolean) => {
    set(() => ({
      isLoading: isLoading,
    }))
  },
  deleteTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }))
  },
  updateTodo: (todoToBeUpdated: Todo, updatedText: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoToBeUpdated.id ? { ...todo, todo: updatedText } : todo
      ),
    }))
  },
}))

export { useTodoStore }
