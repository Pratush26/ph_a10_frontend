import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"


export default function RegistrationPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()
    const onSubmit = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-1/2 shadow-lg/50 shadow-gray-800 px-8 py-12 my-6 mx-2 rounded-lg flex flex-col items-center-safe justify-center-safe gap-3" >
            <h1 className="text-2xl font-semibold">Registration Form</h1>
            <div className="w-full">
                {errors.name ? <p className="text-sm text-rose-500">{errors.name.message}</p> : <label>Name :</label>}
                <input type="text" {...register("name", { required: "Name is required" })} placeholder="Enter your name" id="name" />
            </div>
            <div className="w-full">
                {errors.email ? <p className="text-sm text-rose-500">{errors.email.message}</p> : <label>Email :</label>}
                <input type="email" {...register("email", { required: "Email is required" })} placeholder="Enter your email" id="email" />
            </div>
            <div className="w-full">
                {errors.password ? <p className="text-sm text-rose-500">{errors.password.message}</p> : <label>Password :</label>}
                <input type="password" placeholder="Enter password" id="password"
                    {...register("password", { required: "Password is required", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, message: "Password must contain at least 6 characters including upper and lowercase letters" } })} />
            </div>
            <div className="w-full">
                {errors.image ? <p className="text-sm text-rose-500">{errors.image.message}</p> : <label>Image :</label>}
                <input type="url" {...register("image", { required: "image is required" })} placeholder="Enter image url" id="image" />
            </div>
            <button disabled={isSubmitting} type="submit" className="btn trnsition mt-4">{isSubmitting ? "Registering..." : "Register"}</button>
            <button disabled={isSubmitting} type="button" className="btn-out hover:text-gray-500 trnsition my-1 flex items-center-safe gap-2"><FcGoogle />Sign in with Google</button>
        </form>
    )
}