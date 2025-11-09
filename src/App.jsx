import { Outlet, useNavigation } from 'react-router'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Loader from './Components/Loader'

function App() {
const {state} = useNavigation()
  return (
    <section className='flex flex-col items-center-safe justify-between min-h-screen'>
      <Navbar />
      {
        state === 'loading' ?
          <Loader />
          :
          <Outlet />
      }
      <Footer />
    </section>
  )
}

export default App
