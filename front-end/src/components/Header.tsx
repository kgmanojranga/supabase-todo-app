import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase-config'
import { useAuthStore } from '../store/auth-store.ts'

const logoUrl =
  'data:image/png;base64,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'

function Header() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/authentication')
  }

  return (
    <>
      <header className='border-b-[1px] border-gray-200 bg-[#f8f8f8] font-circular'>
        <div className='container mx-auto flex justify-between py-4 items-center'>
          <NavLink to={'/'}>
            <div className='text-xl font-semibold flex gap-4 justify-center items-center'>
              <img
                src={logoUrl}
                alt='logo-icon-img'
                className='max-w-8 block'
              />
              <p>Supabase-Learning</p>
            </div>
          </NavLink>
          <nav>
            <ul className='flex gap-4 text-xs'>
              <li className='bg-[#fcfcfc] border-[1px] flex justify-center items-center px-2 py-1 rounded-md hover:border-[#37996B] transition-all duration-200 hover:shadow-sm'>
                <NavLink to={'/todos'}>Todos</NavLink>
              </li>
              {!isAuthenticated ? (
                <li className='bg-[#37996B] text-[#fcfcfc] border-[1px] flex justify-center items-center px-2 py-1 rounded-md hover:border-gray-300 transition-all duration-200 hover:shadow-sm'>
                  <NavLink to={'/authentication'}>Sign up</NavLink>
                </li>
              ) : null}
              {isAuthenticated ? (
                <li className='bg-[#fcfcfc] border-[1px] flex justify-center items-center px-2 py-1 rounded-md hover:border-[#37996B] transition-all duration-200 hover:shadow-sm'>
                  <button type='button' onClick={handleSignOut}>
                    Log out
                  </button>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
