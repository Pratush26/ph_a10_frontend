import { Outlet } from 'react-router'
import './App.css'
import Navbar from './Components/Navbar'

function App() {

  return (
    <section>
      <Navbar />
      <Outlet />
    </section>
  )
}

export default App
