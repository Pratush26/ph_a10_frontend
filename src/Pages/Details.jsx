import { useLoaderData } from "react-router";
import ImgManager from "../Components/ImgManager";
import "../Utils/utility.css"
import { useForm } from "react-hook-form";
import { useContext, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function FoodDetails() {
    const {user} = useContext(AuthContext)
    const { data } = useLoaderData()
    const modalRef = useRef(null);
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    const handleModal = () => modalRef.current.showModal()
    const onSubmit = (d) => {
        const newObj = {
            location: d.location,
            phone: d.phone,
            reason: d.reason,
            // quantity:,
            email: user.email,
            name: user.displayName,
            image: user.photoURL,
            status: "pending",
            food_id: data._id
        }
        console.log(newObj)
        modalRef.current.close()
        reset()
    }
    return (
        <main className="w-full">
            <section className="grid grid-cols-2 items-center-safe justify-items-center-safe gap-8 w-11/12 mx-auto my-10">
                <ImgManager imgUrl={data.image} altTxt="food image" styles="rounded-lg" />
                <article className="space-y-3">
                    <h1 className="text-4xl font-semibold">{data.name}</h1>
                    <div className="flex items-center-safe justify-between gap-2 text-sm text-gray-600">
                        <p>Expire Date : {new Date(data.expire_date).toLocaleDateString()}</p>
                        <p>Quantity : {data.quantity}</p>
                    </div>
                    <hr />
                    <div className="flex items-center-safe gap-4">
                        <ImgManager imgUrl={data.donator_image} altTxt="donator image" styles="rounded-full h-10 aspect-square object-center" />
                        <span>
                            <p className="font-semibold">{data.donator_name}</p>
                            <p className="text-sm text-gray-700">{data.donator_email}</p>
                        </span>
                    </div>
                    <hr />
                    <p className="font-medium">Location : {data.pickup_location}</p>
                    <hr />
                    <p>{data.additional_notes}</p>
                    <button onClick={handleModal} className="btn trnsition">Request Food</button>
                </article>
            </section>
            {
                <table className="table-auto text-center text-sm font-medium border-collapse border border-gray-400 w-11/12 mx-auto rounded-md overflow-hidden">
                    {/* <caption className='text-4xl font-bold my-8'>Foods Request : <span className="text-violet-600">{data?.bids?.length}</span></caption> */}
                    <thead>
                        <tr className="bg-gray-200">
                            <th>SL no.</th>
                            <th>Donator</th>
                            <th>Reason</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* <tbody className="text-gray-800">
                                {
                                    data.map((e, i) => {
                                        const p = data.products.find(f => f._id == e.product)
                                        return (
                                            <tr key={i} className="border border-gray-300 bg-white">
                                                <td>{i + 1}</td>
                                                <td>
                                                    <div className="flex flex-wrap justify-center items-center gap-2">
                                                        <ImgManager imgUrl={p.image} altTxt={"product Image"} styles={"h-16 w-auto rounded-sm object-center object-contain"} />
                                                        <span>
                                                            <p className="font-semibold text-sm">{p?.title}</p>
                                                            <p className="text-xs">$ {p?.price_max} - {p?.price_min}</p>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>ff</td>
                                                <td>fgd</td>
                                                <td><span className={`${e.status === 'donated' ? "bg-green-700" : "bg-gray-600"} rounded-full px-4 text-white py-1 h-10`}>{e.status}</span></td>
                                                <td>dfad</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody> */}
                </table>
            }
            {/* Modal section */}
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full px-8 py-12 my-6 rounded-lg flex flex-col items-center-safe justify-center-safe gap-3" >
                        <h1 className="text-2xl font-bold">Info Form</h1>
                        <div className="w-full">
                            {errors.phone ? <p className="text-sm text-rose-500">{errors.phone.message}</p> : <label htmlFor="phone">Phone :</label>}
                            <input type="tel" {...register("phone", { required: "Phone number is required" })} placeholder="Enter your contact number" id="phone" />
                        </div>
                        <div className="w-full">
                            {errors.location ? <p className="text-sm text-rose-500">{errors.location.message}</p> : <label htmlFor="location">Pickup location :</label>}
                            <input type="text" {...register("location", { required: "Location is required" })} placeholder="Enter location" id="location" />
                        </div>
                        <div className="w-full">
                            {errors.reason ? <p className="text-sm text-rose-500">{errors.reason.message}</p> : <label htmlFor="reason">Reason :</label>}
                            <textarea type="text" {...register("reason", { required: "Reason is required" })} placeholder="Write why you need this food" id="reason" />
                        </div>
                        <button disabled={isSubmitting} type="submit" className="btn trnsition mt-4">{isSubmitting ? "Requesting..." : "Request"}</button>
                    </form>
                </div>
            </dialog>
            {/* Modal section */}
        </main>
    )
}