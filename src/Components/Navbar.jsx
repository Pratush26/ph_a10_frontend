import { Link, NavLink } from "react-router";
import Logo from '/logo.svg'
import '../Utils/utility.css'
import { useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
    const [isHover, setIsHover] = useState(false)
    const [isOpened, setIsOpened] = useState(false)
    const { user, loading, signOutUser } = useContext(AuthContext);
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
                <div className="hidden sm:block space-x-3">
                    <NavLink className="hover:text-gray-500 trnsition" to='/'>Home</NavLink>
                    <NavLink className="hover:text-gray-500 trnsition" to='/all-foods'>Available Foods</NavLink>
                </div>
                {
                    loading ?
                        <Loader />
                        :
                        user ?
                            <section className="hidden sm:flex relative gap-2"
                                onMouseLeave={() => setIsHover(false)}
                                onMouseEnter={() => setIsHover(true)}>
                                <img src={user?.photoURL} className="rounded-full object-center object-cover h-9 aspect-square" alt="user" />
                                <div className="flex gap-2 items-center">
                                    <p>{user?.displayName}</p>
                                    <IoIosArrowDown />
                                </div>
                                <div className={`${isHover ? "bg-stone-50" : "hidden"} absolute w-full text-start bottom-0 translate-y-full z-100 flex flex-col`}>
                                    <Link className="w-full text-start cursor-pointer hover:bg-green-50 trnsition px-4 py-2" to='/my-foods'>My Foods</Link>
                                    <Link className="w-full text-start cursor-pointer hover:bg-green-50 trnsition px-4 py-2" to='/my-requests'>My Requests</Link>
                                    <Link className="w-full text-start cursor-pointer hover:bg-green-50 trnsition px-4 py-2" to='/add-food'>Add Food</Link>
                                    <button onClick={handleSignOut} className="w-full text-start cursor-pointer hover:bg-green-50 trnsition px-4 py-2">Log out</button>
                                </div>
                            </section>
                            :
                            <div className="hidden sm:block space-x-3">
                                <NavLink className="hover:text-gray-500 trnsition" to='/register'>Register</NavLink>
                                <NavLink className="hover:text-gray-500 trnsition" to='/login'>Login</NavLink>
                            </div>
                }
                <button onClick={() => setIsOpened(!isOpened)} className="sm:hidden" >{isOpened ? <RxCross2 /> : <RxHamburgerMenu />}</button>
            </nav>
            <div className="sm:hidden">
                {
                    isOpened
                    &&
                    (
                        user ?
                            <section className="flex text-sm relative gap-2">
                                <div className={`bg-white absolute w-full text-start bottom-0 translate-y-full z-100 flex flex-col gap-3 px-5 py-3`}>
                                    <div className="flex w-fit items-center gap-2">
                                        <img src={user?.photoURL} className="rounded-full object-center object-cover h-7 aspect-square" alt="user" />
                                        <p>{user?.displayName}</p>
                                    </div>
                                    <Link className="text-start cursor-pointer hover:bg-green-50 trnsition" to='/my-foods'>My Foods</Link>
                                    <Link className="text-start cursor-pointer hover:bg-green-50 trnsition" to='/my-requests'>My Requests</Link>
                                    <Link className="text-start cursor-pointer hover:bg-green-50 trnsition" to='/add-food'>Add Food</Link>
                                    <button onClick={handleSignOut} className="text-start cursor-pointer hover:bg-green-50 trnsition">Log out</button>
                                </div>
                            </section>
                            :
                            <div className="flex w-fit flex-col gap-3 px-5 py-3">
                                <NavLink className="hover:text-gray-500 trnsition" to='/register'>Register</NavLink>
                                <NavLink className="hover:text-gray-500 trnsition" to='/login'>Login</NavLink>
                            </div>
                    )}
            </div>
        </header>
    )
}