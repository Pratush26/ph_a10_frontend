import { Link } from "react-router";
import '../Utils/utility.css'
import Logo from '/logo.svg'
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <section className="bg-gray-900 text-white pt-12 px-2 w-full">
            <footer className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 place-content-between gap-5 w-11/12 mx-auto">
                <div>
                    <Link to='/' className="flex items-center text-xl font-bold"><img src={Logo} alt="logo" className="h-7 w-auto" /> Plate<span className="text-green-400">Share</span></Link>
                    <p className="text-gray-400 text-sm">Surplus food with the community to reduce waste.</p>
                </div>
                <div className="text-gray-400 flex flex-col gap-3 text-sm">
                    <h6 className="text-lg font-semibold text-white">Quick Links</h6>
                    <Link className="hover:text-gray-200 trnsition" to='/all-foods'>All Foods</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/'>Home</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/login'>Login</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/register'>Register</Link>
                </div>
                <div className="text-gray-400 flex flex-col gap-3 text-sm">
                    <h6 className="text-lg font-semibold text-white">Features</h6>
                    <Link className="hover:text-gray-200 trnsition" to='/add-food'>Add Foods</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/my-foods'>My Foods</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/my-requests'>My Requests</Link>
                </div>
                <div className="text-gray-400 flex flex-col gap-3 text-sm">
                    <h6 className="text-lg font-semibold text-white">Contact & Support</h6>
                    <Link className="hover:text-gray-200 trnsition" to='/'>support@Plateshare.com</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/'>+880 123 456 789</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/'>123 Commerce Street, Dhaka, Bangladesh</Link>
                </div>
                <div className="text-gray-400 space-x-3 space-y-2 text-xl">
                    <h6 className="text-lg font-semibold text-white">Social Links</h6>
                    <div className="flex gap-3">
                    <a className="hover:text-gray-200 trnsition" href="" target="_blank"><FaFacebookSquare /></a>
                    <a className="hover:text-gray-200 trnsition" href="" target="_blank"><FaSquareXTwitter /></a>
                    <a className="hover:text-gray-200 trnsition" href="" target="_blank"><FaInstagramSquare /></a>
                    </div>
                </div>
            </footer>
            <p className="text-center font-semibold text-xs text-gray-400 py-8">Copyright &copy; 2025 - All right reserved by Plate Share</p>
        </section>
    )
}