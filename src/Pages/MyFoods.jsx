import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import ImgManager from "../Components/ImgManager";
import Loader from "../Components/Loader";
import "../Utils/utility.css"
import Error from "../Components/Error";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router";
import useFetchData from "../Hooks/useFetch";

export default function MyFoodsPage() {
    const { user } = useContext(AuthContext)
    const { data, loading: dataLoad, errMsg: dataErr, setRefresh } = useFetchData(`my-foods/${user?.email}`);
    const { data: foodReq, loading: reqLoad, errMsg: reqErr, setRefresh: setReqRefresh } = useFetchData(`food-reqs-donatorEmail/${user?.email}`);
    const loading = dataLoad && reqLoad
    const errorMsg = dataErr && reqErr
    
    const handleDelete = (info) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to delete ${info.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_SERVER}/delete-food/${info._id}`, {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                }).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: `Successfully deleted ${info.name}`,
                        icon: "success"
                    });
                    setRefresh(prev => !prev)
                    setReqRefresh(prev => !prev)
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
                    errorMsg ?
                        <Error msg={errorMsg} />
                        :
                        <table className="table-auto text-center text-sm font-medium border-collapse border border-gray-400 w-full sm:w-11/12 mx-auto rounded-md overflow-hidden">
                            <caption className='text-4xl font-bold mb-8'>My <span className='text-green-700'>Foods</span> : {data?.length}</caption>
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="hidden sm:block">SL no.</th>
                                    <th>Product</th>
                                    <th>Expire Date</th>
                                    <th className="hidden sm:block">Requests</th>
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
                                                    <span className="text-start">
                                                        <Link to={`/food/details/${e._id}`} className="font-semibold text-sm">{e.name}</Link>
                                                        <p className="text-xs text-gray-600">{e.quantity}</p>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>{new Date(e.expire_date).toLocaleDateString()}</td>
                                            <td className="hidden sm:table-cell">{foodReq.filter(c => c.food_id === e._id).length}</td>
                                            <td>
                                                <div className="flex justify-center gap-2 flex-wrap">
                                                <Link to="/update-food" state={e} className="btn trnsition">Update</Link>
                                                <button onClick={() => handleDelete(e)} className="btn-out trnsition hover:text-gray-500">Delete</button>
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