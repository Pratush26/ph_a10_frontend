import { useContext, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { AuthContext } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

export default function UpdateUserName() {
    const { user, updateUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: user?.displayName
        }
    })
    const [isModalOpened, setIsModalOpened] = useState(false)
    const handleUpdate = (data) => {
        updateUser(data.name, user?.photoURL)
            .then(() => toast.success("Successfully updated your name"))
            .catch(err => {
                toast.error("Failed to update your name")
                console.error(err)
            })
    }
    return (
        <div className="relative">
            <button onClick={() => setIsModalOpened(!isModalOpened)} className="btn trnsition flex items-center gap-2 rounded-md"><FiEdit3 /> Edit Profile Info</button>
            {
                isModalOpened
                &&
                <form onSubmit={handleSubmit(handleUpdate)} className="absolute bg-white z-90 right-1/2 top-0 translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 p-10 shadow-md/40 rounded-2xl min-w-xs">
                    <div className="w-full flex items-center justify-between gap-2">
                        <h4 className="text-lg font-semibold">Update Profile Name</h4>
                        <button onClick={() => setIsModalOpened(false)} type="button" className="cursor-pointer">
                            <RxCross2 />
                        </button>
                    </div>
                    <div className="w-full">
                        {errors.name ? <p className="text-sm text-rose-600">{errors.name.message}</p> : <label htmlFor="name">Name :</label>}
                        <input type="text" {...register("name", { required: "name is required" })} placeholder="Enter name" id="name" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn trnsition rounded-sm">{isSubmitting ? "Updating..." : "Update"}</button>
                </form>
            }
        </div>
    )
}