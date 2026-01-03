import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

export default function UpdateProfilePic() {
    const { user, updateUser } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    const [isModalOpened, setIsModalOpened] = useState(false)
    const handleUpdate = async (data) => {
        try {
            const formData = new FormData();
            formData.append("image", data.image[0]);
            axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_KEY}`, formData)
                .then((res) => {
                    updateUser(user?.displayName, res.data.data.display_url)
                        .then(() => {
                            toast.success("Successfully updated your name")
                            reset()
                        })
                        .catch(err => {
                            toast.error("Failed to update your photo")
                            console.error(err)
                        })
                })
                .catch(err => {
                    toast.error("Failed to upload your photo")
                    console.error(err)
                })
        } catch (error) {
            toast.error(error.data.response.data.message || "Something went wrong!");
            console.error(error)
        }
    }
    return (
        <div className="relative">
            <button onClick={() => setIsModalOpened(!isModalOpened)} title="update profile picture" className="trnsition hover:scale-110 cursor-pointer"><MdEdit className="text-xl -ml-2" /></button>
            {
                isModalOpened
                &&
                <form onSubmit={handleSubmit(handleUpdate)} className="absolute bg-white z-90 right-1/2 top-0 translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 p-10 shadow-md/40 rounded-2xl min-w-xs">
                    <div className="w-full flex items-center justify-between gap-2">
                        <h4 className="text-lg font-bold">Update Profile Picture</h4>
                        <button onClick={() => setIsModalOpened(false)} type="button" className="cursor-pointer">
                            <RxCross2 />
                        </button>
                    </div>
                    <div className="w-full">
                        {errors.image ? <p className="text-sm text-rose-600">{errors.image.message}</p> : <label htmlFor="image">Image :</label>}
                        <input type="file" {...register("image", { required: "image is required" })} id="image" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn trnsition rounded-sm">{isSubmitting ? "Updating..." : "Update"}</button>
                </form>
            }
        </div>
    )
}