import { Link } from "react-router";
import Img from '../assets/error.png'

export default function Error({ msg }) {
    return (
        <div className="flex flex-col items-center gap-4 my-10 w-full">
            <img src={Img} alt="error page" className="w-5/6 mx-auto max-w-3xs" />
            <h1 className="text-3xl font-semibold text-green-800 text-center">Something went wrong!</h1>
            <p className="font-semibold animate-bounce text-amber-600">{msg}</p>
            <Link to='/' className='trnsition btn'>Back to Home</Link>
        </div>
    )
}