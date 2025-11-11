import { Link } from 'react-router'
import Img from '../assets/notFound.png'

export default function NotFoundPage() {
    return (
        <main className='w-full flex flex-col items-center my-8'>
            <img src={Img} alt="not found image" className='w-5/6 mx-auto max-w-sm' />
            <Link to='/' className='trnsition btn'>Back to Home</Link>
        </main>
    )
}