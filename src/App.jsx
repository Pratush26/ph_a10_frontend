import { Outlet } from 'react-router'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

function App() {

  return (
    <section className='flex flex-col items-center-safe justify-between min-h-screen'>
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  )
}

export default App
