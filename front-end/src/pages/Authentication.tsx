import { ChangeEvent, FormEvent, useState } from 'react'
import { supabase } from '../supabase-config'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.tsx'
import { useAuthStore } from '../store/auth-store.ts'
import { AuthTokenResponsePassword } from '@supabase/supabase-js'

type FormData = {
  email: string
  password: string
}

const initialData = {
  email: '',
  password: '',
}

function Authentication() {
  const [formData, setFormData] = useState<FormData>(initialData)
  const [authentication, setAuthentication] = useState<string>('login')
  const [setIsAuthenticated, setAccessToken] = useAuthStore((state) => [
    state.setIsAuthenticated,
    state.setAccessToken,
  ])
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      if (authentication === 'signup') {
        if (formData.email && formData.password) {
          const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
          })
          setFormData(initialData)
          if (!error) setIsAuthenticated(true)
          navigate('/todos')
          console.log(data, error)
        }
      }

      if (authentication === 'login') {
        const response: AuthTokenResponsePassword =
          await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })

        const accessToken = response.data.session?.access_token

        if (accessToken) {
          setAccessToken(accessToken)
        }

        console.log(accessToken)
        setFormData(initialData)
        setIsAuthenticated(true)
        navigate('/todos')
        console.log('User logged in successfully!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleAuthentication() {
    if (authentication === 'login') {
      setAuthentication('signup')
      setFormData(initialData)
    }

    if (authentication === 'signup') {
      setAuthentication('login')
      setFormData(initialData)
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <Header />
      <section className='py-24'>
        <div className='container mx-auto flex justify-center min-h-screen mt-14'>
          <form
            className='min-w-96 flex flex-col gap-4'
            onSubmit={handleSubmit}
          >
            <p className='text-center font-semibold'>
              {authentication === 'signup' ? 'Sign Up' : 'Login'}
            </p>
            <div>
              <input
                required
                placeholder='email'
                className='w-full border-[1px] border-gray-200 rounded-md p-2 text-sm'
                name='email'
                value={formData.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <input
                required
                placeholder='password'
                className='w-full border-[1px] border-gray-200 rounded-md p-2 text-sm'
                name='password'
                value={formData.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button
              className='w-full p-1 bg-blue-600 text-white rounded-md shadow-lg text-sm font-semibold'
              type='submit'
            >
              {authentication === 'signup' ? 'Sign Up' : 'Sign In'}
            </button>

            <div className='flex justify-center gap-4'>
              {authentication === 'login' ? (
                <>
                  <p className='font-light'>{`Don't have an account?`}</p>
                  <button
                    type='button'
                    onClick={handleAuthentication}
                    className='font-bold text-blue-600 hover:text-blue-700'
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <p className='font-light'>{`Already have an account?`}</p>
                  <button
                    type='button'
                    onClick={handleAuthentication}
                    className='font-bold text-blue-600 hover:text-blue-700'
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Authentication
