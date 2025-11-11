import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"
import { AuthContext } from "../Context/AuthContext"
import { Link, useLocation, useNavigate } from "react-router"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { toast } from "react-toastify"


export default function LoginPage() {
    const { user, sigInUser, googleSignIn } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const {state} = useLocation()
    const {register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm()
    if(user) navigate(state || "/");

    const onSubmit = (data) => {
        sigInUser(data.email, data.password).then(() => {
            toast.success("Login Successful")
            reset()
        }).catch(err => toast.error(err))
    }
    
    const handleGoogleLogin = () => {
        googleSignIn().then(() => {
            toast.success("Login Successful")
            navigate(state || "/")
        }).catch(err => toast.error(err))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-1/2 shadow-lg/50 shadow-gray-800 px-8 py-12 my-6 mx-2 rounded-lg flex flex-col items-center-safe justify-center-safe gap-3" >
            <h1 className="text-2xl font-semibold">Login Form</h1>
            <div className="w-full">
                {errors.email ? <p className="text-sm text-rose-500">{errors.email.message}</p> : <label htmlFor="email" >Email :</label>}
                <input type="email" {...register("email", { required: "Email is required" })} placeholder="Enter your email" id="email" />
            </div>
            <div className="w-full relative">
                {errors.password ? <p className="text-sm text-rose-500">{errors.password.message}</p> : <label htmlFor="password" >Password :</label>}
                <input type={`${showPassword ? 'text' : 'password'}`} placeholder="Enter password" id="password"
                    {...register("password", { required: "Password is required", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, message: "Password must contain at least 6 characters including upper and lowercase letters" } })} />
                    <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute p-1 right-2 bottom-0 -translate-y-1/2 cursor-pointer'>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
            <p className=" text-sm my-4">Don't have an account? <Link state={state || '/'} to='/register' className="text-sky-500 font-medium hover:text-blue-600 trnsition">Register</Link></p>
            <button disabled={isSubmitting} type="submit" className="btn trnsition">{isSubmitting ? "Logging in..." : "Login"}</button>
            <button disabled={isSubmitting} type="button" onClick={handleGoogleLogin} className="btn-out hover:text-gray-500 trnsition my-1 flex items-center-safe gap-2"><FcGoogle />Login with Google</button>
        </form>
    )
}