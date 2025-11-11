import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"
import { AuthContext } from "../Context/AuthContext"
import { Link, Navigate, useLocation, useNavigate } from "react-router"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import axios from "axios"
import { toast } from "react-toastify"


export default function RegistrationPage() {
    const { user, createUser, updateUser, googleSignIn } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { state } = useLocation()
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    if (user) navigate(state || "/");

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_KEY}`, formData).then((res) => {
            createUser(data.email, data.password).then(() => {
                updateUser(data.name, res.data.data.display_url).then(() => {
                    toast.success("Registration Successful")
                    reset()
                }).catch(err => toast.error(err))
            }).catch(e => toast.error(e))
        }).catch((er) => toast.error(er));
    }

    const handleGoogleLogin = () => {
        googleSignIn().then(() => {
            toast.success("Login Successful")
            navigate(state || "/")
        }).catch(err => toast.error(err))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-1/2 shadow-lg/50 shadow-gray-800 px-8 py-12 my-6 mx-2 rounded-lg flex flex-col items-center-safe justify-center-safe gap-3" >
            <h1 className="text-2xl font-semibold">Registration Form</h1>
            <div className="w-full">
                {errors.name ? <p className="text-sm text-rose-500">{errors.name.message}</p> : <label htmlFor="name">Name :</label>}
                <input type="text" {...register("name", { required: "Name is required" })} placeholder="Enter your name" id="name" />
            </div>
            <div className="w-full">
                {errors.email ? <p className="text-sm text-rose-500">{errors.email.message}</p> : <label htmlFor="email">Email :</label>}
                <input type="email" {...register("email", { required: "Email is required" })} placeholder="Enter your email" id="email" />
            </div>
            <div className="w-full relative">
                {errors.password ? <p className="text-sm text-rose-500">{errors.password.message}</p> : <label htmlFor="password">Password :</label>}
                <input type={`${showPassword ? 'text' : 'password'}`} placeholder="Enter password" id="password"
                    {...register("password", { required: "Password is required", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, message: "Password must contain at least 6 characters including upper and lowercase letters" } })} />
                <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute p-1 right-2 bottom-0 -translate-y-1/2 cursor-pointer'>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
            <div className="w-full">
                {errors.image ? <p className="text-sm text-rose-500">{errors.image.message}</p> : <label htmlFor="image">Image :</label>}
                <input type="file" {...register("image", { required: "image is required" })} placeholder="Enter image url" id="image" />
            </div>
            <p className=" text-sm my-4">Already have an account? <Link state={state || '/'} to='/login' className="text-sky-500 font-medium hover:text-blue-600 trnsition">Login</Link></p>
            <button disabled={isSubmitting} type="submit" className="btn trnsition">{isSubmitting ? "Registering..." : "Register"}</button>
            <button disabled={isSubmitting} type="button" onClick={handleGoogleLogin} className="btn-out hover:text-gray-500 trnsition my-1 flex items-center-safe gap-2"><FcGoogle />Sign in with Google</button>
        </form>
    )
}