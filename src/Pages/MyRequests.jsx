import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import ImgManager from "../Components/ImgManager";
import Loader from "../Components/Loader";
import "../Utils/utility.css"
import Error from "../Components/Error";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router";

export default function MyRequestsPage() {
    const [loading, setLoading] = useState(true)
    const [errMsg, setErrMsg] = useState(null)
    const { user } = useContext(AuthContext)
    const [data, setData] = useState([])
    const [foodReq, setFoodReq] = useState([])
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        axios(`${import.meta.env.VITE_SERVER}/food-requestsByEmail/${user?.email}`).then(res => {
            setFoodReq(res.data.requests)
            setData(res.data.foods)
            setErrMsg(null)
            setLoading(false)
        }).catch(err => {
            setErrMsg(err.message)
            setLoading(false)
        })
    }, [user, refresh])
    const handleDelete = (info) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to delete this request?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_SERVER}/delete-request/${info._id}`, {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                }).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: `Successfully deleted !`,
                        icon: "success"
                    });
                    setRefresh(!refresh)
                }).catch(err => toast.error(err))
            }
        });
    }
    return (
        <main className="w-full my-10">
            {
                loading ?
                    <div className="w-fit mx-auto">
                        <Loader />
                    </div>
                    :
                    errMsg ?
                        <Error msg={errMsg} />
                        :
                        <table className="table-auto text-center text-sm font-medium border-collapse border border-gray-400 w-full sm:w-11/12 mx-auto rounded-md overflow-hidden">
                            <caption className='text-4xl font-bold mb-8'>My <span className='text-green-700'>Requests</span> : {data?.length}</caption>
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="hidden sm:block">SL no.</th>
                                    <th>Product</th>
                                    <th>Expire Date</th>
                                    <th className="hidden sm:block">Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800">
                                {
                                    data?.map((e, i) => (
                                        <tr key={i} className="border border-gray-300 bg-white">
                                            <td className="hidden sm:table-cell">{i + 1}</td>
                                            <td>
                                                <div className="flex flex-wrap justify-center items-center gap-2">
                                                    <ImgManager imgUrl={e.image} altTxt={"food Image"} styles={"h-10 w-auto rounded-sm object-center object-contain"} />
                                                    <span className="text-center sm:text-start">
                                                        <Link to={`/food/details/${e._id}`} className="font-semibold text-sm">{e.name}</Link>
                                                        <p className="text-xs text-gray-600">{e.quantity}</p>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>{new Date(e.expire_date).toLocaleDateString()}</td>
                                            <td className="hidden sm:table-cell"><span className={`${e.status === 'accepted' ? "bg-green-600" : "bg-yellow-600"} rounded-full px-4 text-white py-1 text-xs font-semibold`}>{foodReq.find(c => c.food_id === e._id).status}</span></td>
                                            <td>
                                                <div className="flex justify-center gap-2 flex-wrap">
                                                <button onClick={() => handleDelete(foodReq.find(c => c.food_id === e._id))} className="btn-out trnsition hover:text-gray-500">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    )
                                }
                            </tbody>
                        </table>
            }
        </main>
    )
}