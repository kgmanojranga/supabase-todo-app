import { ImSpinner2 } from 'react-icons/im'
import Header from '../components/Header.tsx'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { supabase } from '../supabase-config'
import { Todo, useTodoStore } from '../store/todo-store.ts'
import { useAuthStore } from '../store/auth-store.ts'
function Todos() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [inputData, setInputData] = useState<string>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const [updateInputData, setUpdateInputData] = useState<string>('')
  const [todoToBeUpdated, setTodoToBeUpdated] = useState<Todo>({
    id: '',
    todo: '',
    user_id: '',
  })
  const [todos, setTodos, deleteTodo, updateTodo] = useTodoStore((state) => [
    state.todos,
    state.setTodos,
    state.deleteTodo,
    state.updateTodo,
  ])

  const accessToken = useAuthStore((state) => state.accessToken)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputData(e.target.value)
  }

  function handleUpdateInputChange(e: ChangeEvent<HTMLInputElement>) {
    setUpdateInputData(e.target.value)
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await supabase.from('todos').insert({ todo: inputData })
      setInputData('')
      const res = await supabase.from('todos').select()
      if (res.data) setTodos(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function handleDeleteTodo(id: string) {
    try {
      await supabase.from('todos').delete().eq('id', id)
      deleteTodo(id)
    } catch (error) {
      console.log(error)
    }
  }
  async function handleUpdateTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await supabase
        .from('todos')
        .update({ todo: updateInputData })
        .eq('id', todoToBeUpdated.id)
      updateTodo(todoToBeUpdated, updateInputData)
      setUpdateInputData('')
      setIsEditing(false)
    } catch (error) {
      console.log(error)
    }
  }

  function handleEdit(todo: Todo) {
    setIsEditing(!isEditing)
    setTodoToBeUpdated(todo)
    setUpdateInputData(todo.todo)
  }

  async function handleClearAll() {
    const session = await supabase.auth.getSession()

    console.log(session.data.session?.expires_at)
    const response = await fetch('http://127.0.0.1:8000/clear-all', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
        method: 'GET',
      },
    })

    if (response.ok) {
      const data = await response.json() // Parse response body as JSON
      console.log(data) // Now data should contain the JSON object returned by your edge function
    } else {
      console.error('Failed to fetch data')
    }
  }

  useEffect(() => {
    async function handleFetchData() {
      try {
        setIsLoading(true)
        const res = await supabase.from('todos').select()
        if (res.data) setTodos(res.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    handleFetchData()
      .then()
      .catch((error) => console.log(error))
  }, [setTodos])

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1 flex flex-col font-circular '>
        {isLoading ? (
          <div className='flex-1 flex justify-center items-start p-48'>
            <p className='bg-green-400 py-4 px-8 text-white font-medium rounded-xl text-center shadow-md flex justify-center items-center gap-4'>
              <ImSpinner2 className='text-2xl animate-spin font-medium' />
              <span className='text-xl tracking-widest font-semibold'>
                Loading...
              </span>
            </p>
          </div>
        ) : (
          <div className='relative container mx-auto p-24 flex-1'>
            <form
              className='w-1/2 m-auto flex flex-col gap-4 mb-24'
              onSubmit={handleSubmit}
            >
              <p className='font-medium'>Enter your todo:</p>
              <input
                placeholder='write a todo'
                className='w-full border-[1px] border-gray-200 rounded-md p-2 text-sm'
                value={inputData}
                onChange={handleChange}
                required
              />
              <button
                type='submit'
                className={`self-start block py-1 px-2 rounded-xl shadow-md font-semibold text-white bg-[#3FCF8F] hover:bg-green-300 hover:text-green-800`}
              >
                Submit
              </button>
            </form>

            <table className='w-1/2 mx-auto shadow-md border-[1px] border-gray-200'>
              <thead>
                <tr className=''>
                  <th className='font-medium p-[2px]'>No</th>
                  <th className='font-medium border-[1px] border-gray-200'>
                    Todos
                  </th>
                  <th className='font-medium'>Action</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, index) => (
                  <tr
                    className='text-sm border-[1px] border-gray-200'
                    key={todo.id}
                  >
                    <td className='flex justify-center items-center'>
                      {index + 1}
                    </td>
                    <td className='py-2 px-4 border-[1px] border-gray-200'>
                      {todo.todo}
                    </td>
                    <td className='flex justify-center gap-4 text-white p-2 items-center'>
                      <button
                        className={`text-sm bg-[#3FCF8F] block py-1 px-2 rounded-xl shadow-md font-semibold hover:bg-green-300 hover:text-green-800`}
                        onClick={() => handleEdit(todo)}
                      >
                        Edit
                      </button>
                      <div className='w-6 h-6 bg-red-500 flex justify-center items-center rounded-full shadow-md hover:text-red-800 hover:bg-red-300'>
                        <button
                          className='text-sm block px-2 font-semibold '
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          &times;
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {todos.length > 1 ? (
              <div className='p-8'>
                <button
                  type='button'
                  className='block mx-auto text-white bg-red-500 flex justify-center items-center px-2 py-1 font-semibold rounded-md shadow-md hover:text-red-800 hover:bg-red-300'
                  onClick={() => handleClearAll()}
                >
                  Clear All
                </button>
              </div>
            ) : null}
            {isEditing ? (
              <div>
                <div className='absolute inset-0 bg-gray-900 opacity-30 z-10'></div>
                <div className='absolute top-1/2 left-1/2 bg-blue-50 -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg rounded-md'>
                  <form
                    className='flex flex-col gap-4 p-8'
                    onSubmit={handleUpdateTodo}
                  >
                    <p className='font-medium'>Edit todo</p>
                    <input
                      placeholder='write a todo'
                      className='min-w-96 border-[1px] border-gray-300 rounded-md p-2 text-sm'
                      value={updateInputData}
                      onChange={handleUpdateInputChange}
                      required
                    />
                    <div className='flex gap-4'>
                      <button
                        type='submit'
                        className={`self-start bg-[#3FCF8F] py-1 px-2 rounded-xl shadow-md font-semibold text-white hover:bg-green-300 hover:text-green-800`}
                      >
                        Edit
                      </button>
                      <button
                        type='button'
                        className='self-start bg-red-500 py-1 px-2 rounded-xl shadow-md font-semibold text-white hover:bg-red-300 hover:text-red-800'
                        onClick={() => {
                          setIsEditing(false)
                          setUpdateInputData('')
                        }}
                      >
                        Discard
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </main>
    </div>
  )
}

export default Todos
