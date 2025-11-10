import { useContext } from "react"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"
import { AuthContext } from "../Context/AuthContext"
import axios from "axios"


export default function AddFoodForm() {
    const { user } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_KEY}`, formData).then((res) => {
            const dataObj = {
                name: data.foodName,
                image: res.data.data.display_url,
                quantity: data.quantity,
                pickup_location: data.pickup_location,
                expire_date: new Date(data.expire_date).toISOString(),
                additional_notes: data.additional_notes,
                donator_name: user.displayName,
                donator_email: user.email,
                status: "available",
                donator_image: user.photoURL
            }
            axios.post(`${import.meta.env.VITE_SERVER}/create-food`, dataObj).then(r => {
                if (r.data.insertedId) console.log("sdu")
                else console.log("some wrong")
                reset()
            }).catch(err => console.error(err))
        }).catch((er) => console.error(er));
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-1/2 shadow-lg/50 shadow-gray-800 px-8 py-12 my-6 mx-2 rounded-lg flex flex-col items-center-safe justify-center-safe gap-3" >
            <h1 className="text-2xl font-semibold">Add Food</h1>
            <div className="w-full">
                {errors.foodName ? <p className="text-sm text-rose-500">{errors.foodName.message}</p> : <label htmlFor="foodName">Name :</label>}
                <input type="text" {...register("foodName", { required: "Food name is required" })} placeholder="Enter food name" id="nafoodNameme" />
            </div>
            <div className="w-full">
                {errors.quantity ? <p className="text-sm text-rose-500">{errors.quantity.message}</p> : <label htmlFor="quantity">Quantity :</label>}
                <input type="text" {...register("quantity", { required: "Quantity is required" })} placeholder="Enter quantity (e.g. 5 kg)" id="quantity" />
            </div>
            <div className="w-full">
                {errors.location ? <p className="text-sm text-rose-500">{errors.location.message}</p> : <label htmlFor="pickup_location">Pickup location :</label>}
                <input type="text" {...register("pickup_location", { required: "Pickup location is required" })} placeholder="Enter location" id="pickup_location" />
            </div>
            <div className="w-full">
                {errors.expire_date ? <p className="text-sm text-rose-500">{errors.expire_date.message}</p> : <label htmlFor="expire_date">Expire Date :</label>}
                <input type="date" {...register("expire_date", { required: "Expire date is required" })} placeholder="choose expire date" id="expire_date" />
            </div>
            <div className="w-full">
                {errors.additional_notes ? <p className="text-sm text-rose-500">{errors.additional_notes.message}</p> : <label htmlFor="additional_notes">Additional Note :</label>}
                <textarea type="text" {...register("additional_notes", { required: "additional note is required" })} placeholder="Write additional notes" id="additional_notes" />
            </div>
            <div className="w-full">
                {errors.image ? <p className="text-sm text-rose-500">{errors.image.message}</p> : <label htmlFor="image">Image :</label>}
                <input type="file" {...register("image", { required: "image is required" })} placeholder="Enter image url" id="image" />
            </div>
            <button disabled={isSubmitting} type="submit" className="btn trnsition mt-4">{isSubmitting ? "Adding..." : "Add"}</button>
        </form>
    )
}