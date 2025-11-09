import { Link, NavLink } from "react-router";
import Logo from '/logo.svg'
import '../Utils/utility.css'
import { useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";

export default function Navbar() {
    const [isHover, setIsHover] = useState(false)
    const {user, loading, signOutUser} = useContext(AuthContext);
    useEffect(() => {
        setIsHover(false);
    }, [user]);
    const handleSignOut = () => {
        signOutUser().then(() => console.log("s")).catch(err => console.error(err))
    }
    return (
        <header className="w-full bg-white py-4 text-sm font-medium">
            <nav className="w-11/12 mx-auto flex items-center justify-between gap-2">
                <Link to='/' className="flex items-center text-xl font-bold"><img src={Logo} alt="logo" className="h-7 w-auto" /> Plate<span className="text-green-400">Share</span></Link>
                <div className="space-x-3">
                    <NavLink className="hover:text-gray-500 trnsition" to='/'>Home</NavLink>
                    <NavLink className="hover:text-gray-500 trnsition" to='/all-foods'>Available Foods</NavLink>
                    <NavLink className="hover:text-gray-500 trnsition" to='/my-foods'>My Foods</NavLink>
                </div>
                {
                    loading?
                    <Loader />
                    :
                    user ?
                        <section className="relative flex gap-2"
                            onMouseLeave={() => setIsHover(false)}
                            onMouseEnter={() => setIsHover(true)}>
                            <img src={user?.photoURL} className="rounded-full object-center object-cover h-9 aspect-square" alt="user" />
                            <div className="flex gap-2 items-center">
                                <p>{user?.displayName}</p>
                                <IoIosArrowDown />
                            </div>
                            <div className={`${isHover ? "bg-stone-50" : "hidden"} absolute w-full text-start bottom-0 translate-y-full z-100`}>
                                <button onClick={handleSignOut} className="w-full text-start cursor-pointer hover:bg-green-50 trnsition px-4 py-2">Log out</button>
                            </div>
                        </section>
                        :
                        <div className="space-x-3">
                            <NavLink className="hover:text-gray-500 trnsition" to='/register'>Register</NavLink>
                            <NavLink className="hover:text-gray-500 trnsition" to='/login'>Login</NavLink>
                        </div>
                }
            </nav>
        </header>
    )
}