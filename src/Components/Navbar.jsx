import { Link } from "react-router";
import Logo from '/logo.svg'

export default function Navbar() {
    return (
        <header className="w-full bg-white py-4">
            <nav className="w-11/12 mx-auto flex items-center justify-between gap-2">
                <Link to='/' className="flex items-center text-xl font-bold"><img src={Logo} alt="logo" className="h-7 w-auto" /> Plate<span className="text-green-400">Share</span></Link>
            </nav>
        </header>
    )
}