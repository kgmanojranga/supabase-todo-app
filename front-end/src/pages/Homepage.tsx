import Header from '../components/Header.tsx'

function Homepage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1 flex flex-col bg-[#f8f8f8]'></main>
    </div>
  )
}

export default Homepage
