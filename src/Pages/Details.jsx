import { useLocation } from "react-router";
import ImgManager from "../Components/ImgManager";
import "../Utils/utility.css"
import { useForm } from "react-hook-form";
import { useContext, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import useFetchData from "../Hooks/useFetch";
import { RxCross2 } from "react-icons/rx";
import { motion } from "motion/react";

export default function FoodDetails() {
    const { pathname } = useLocation()
    const { data, loading: foodLoading, errMsg: foodError } = useFetchData(`foods/${pathname.split("/").pop()}`);
    const { data: reqData, loading: requestsLoading, errMsg: requestsError, setRefresh } = useFetchData(`food-requestsById/${pathname.split("/").pop()}`);

    const { user } = useContext(AuthContext)
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
            food_id: data._id,
            donator_email: data.donator_email
        }
        axios.post(`${import.meta.env.VITE_SERVER}/request-food`, newObj, {
            headers: { Authorization: `Bearer ${user?.accessToken}` },
        }).then(res => {
            if (res.data.insertedId) {
                toast.success(`Successfully requested for ${data.name}`)
                setRefresh(prev => !prev)
            }
            else toast.error(res.data)
        }).catch(err => toast.error(err))
        modalRef.current.close()
        reset()
    }

    const handleDonate = (info) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to donated the ${data.name} to ${info.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, donate it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`${import.meta.env.VITE_SERVER}/donate-foods/${info._id}`, { foodId: data._id }, {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                }).then(() => {
                    Swal.fire({
                        title: "Donated!",
                        text: `Successfully donated the ${data.name} to ${info.name}`,
                        icon: "success"
                    });
                    setRefresh(prev => !prev)
                }).catch(err => toast.error(err))
            }
        });
    }

    const handleReject = (info) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to delete ${info.name}'s food request?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_SERVER}/delete-request/${info._id}`, {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                }).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: `Successfully deleted ${info.name}'s food request`,
                        icon: "success"
                    });
                    setRefresh(prev => !prev)
                }).catch(err => toast.error(err))
            }
        });
    }

    return (
        <main className="w-full">
            {
                foodLoading ?
                    <div className="w-fit mx-auto">
                        <Loader />
                    </div>
                    :
                    foodError ?
                        <Error msg={foodError} />
                        :
                        <section className="grid grid-cols-1 md:grid-cols-2 items-center-safe justify-items-center-safe gap-8 w-11/12 mx-auto my-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7, x: -100 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ duration: 0.5 }}>
                                <ImgManager imgUrl={data.image} altTxt="food image" styles="rounded-lg" />
                            </motion.div>
                            <motion.article 
                            initial={{ opacity: 0, scale: 0.7, x: 100 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            className="space-y-5">
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
                            </motion.article>
                        </section>
            }
            {
                user?.email === data.donator_email
                &&
                (requestsLoading ?
                    <div className="w-fit mx-auto">
                        <Loader />
                    </div>
                    :
                    requestsError ?
                        <Error msg={requestsError} />
                        :
                        <table className="table-auto text-center text-sm my-8 font-medium border-collapse border border-gray-400 w-11/12 mx-auto rounded-md overflow-hidden">
                            <caption className='text-4xl font-bold mb-8'>Foods Request : <span className="text-green-600">{reqData?.length}</span></caption>
                            <thead>
                                <tr className="bg-gray-200">
                                    <th>SL no.</th>
                                    <th>Donator</th>
                                    <th>Reason</th>
                                    {/* <th>Quantity</th> */}
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800">
                                {
                                    reqData?.map((e, i) => (
                                        <tr key={i} className="border border-gray-300 bg-white">
                                            <td>{i + 1}</td>
                                            <td>
                                                <div className="flex flex-wrap justify-center text-start items-center gap-2">
                                                    <ImgManager imgUrl={e.image} altTxt={"product Image"} styles={"h-10 aspect-square rounded-full object-center object-contain"} />
                                                    <span>
                                                        <p className="font-semibold text-sm">{e.name}</p>
                                                        <p className="text-gray-500 text-xs">{e.email}</p>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="font-semibold text-gray-700">{e.reason}</td>
                                            <td><span className={`${e.status === 'pending' ? "bg-yellow-600" : "bg-gray-600"} rounded-full px-4 text-white py-1 text-xs font-semibold`}>{e.status}</span></td>
                                            <td className="flex justify-center gap-2 flex-wrap">
                                                <button onClick={() => handleDonate(e)} className="btn trnsition">Accept</button>
                                                <button onClick={() => handleReject(e)} className="btn-out trnsition hover:text-gray-500">Reject</button>
                                            </td>
                                        </tr>
                                    )
                                    )
                                }
                            </tbody>
                        </table>)
            }
            {/* Modal section */}
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <button onClick={() => modalRef.current.close()} type="button" className="cursor-pointer"><RxCross2 /></button>
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full sm:px-8 py-12 my-6 rounded-lg flex flex-col items-center-safe justify-center-safe gap-3" >
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