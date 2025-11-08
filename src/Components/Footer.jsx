import { Link } from "react-router";
import '../Utils/utility.css'
import Logo from '/logo.svg'

export default function Footer() {
    return (
        <section className="bg-gray-900 text-white pt-12 px-2">
            <footer className="grid grid-cols-5 place-content-between gap-5 w-11/12 mx-auto">
                <div>
                    <Link to='/' className="flex items-center text-xl font-bold"><img src={Logo} alt="logo" className="h-7 w-auto" /> Plate<span className="text-green-400">Share</span></Link>
                    <p className="text-gray-400 text-sm">Surplus food with the community to reduce waste.</p>
                </div>
                <div className="text-gray-400 flex flex-col gap-3 text-sm">
                    <h6 className="text-lg font-semibold text-white">Quick Links</h6>
                    <Link className="hover:text-gray-200 trnsition" to='/'>All Products</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/'>Dashboard</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/'>Login</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/'>Register</Link>
                </div>
                <div className="text-gray-400 flex flex-col gap-3 text-sm">
                    <h6 className="text-lg font-semibold text-white">Categories</h6>
                    <Link className="hover:text-gray-200 trnsition" to='/'>Electronics</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/'>Fashion</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/'>Home & Living</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/'>Groceries</Link>
                </div>
                <div className="text-gray-400 flex flex-col gap-3 text-sm">
                    <h6 className="text-lg font-semibold text-white">Contact & Support</h6>
                    <Link className="hover:text-gray-200 trnsition" to='/'>support@Smartdeals.com</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/'>+880 123 456 789</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/'>123 Commerce Street, Dhaka, Bangladesh</Link>
                </div>
                <div className="text-gray-400 space-x-3 space-y-2 text-sm">
                    <h6 className="text-lg font-semibold text-white">Social Links</h6>
                    <Link className="hover:text-gray-200 trnsition" to='/'>support@Smartdeals.com</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/'>+880 123 456 789</Link>
                    <Link className="hover:text-gray-200 trnsition" to='/'>123 Commerce Street, Dhaka, Bangladesh</Link>
                </div>
            </footer>
            <p className="text-center font-semibold text-xs text-gray-400 py-8">Copyright &copy; 2025 - All right reserved by Plate Share</p>
        </section>
    )
}