import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import ImgManager from "../Components/ImgManager";
import Loader from "../Components/Loader";
import "../Utils/utility.css"

export default function MyFoodsPage() {
    const [loading, setLoading] = useState(true)
    const { user } = useContext(AuthContext)
    const [data, setData] = useState([])
    useEffect(() => {
        axios(`${import.meta.env.VITE_SERVER}/my-foods/${user?.email}`, {
            headers: { Authorization: `Bearer ${user?.accessToken}` }
        }).then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(err => {
            console.error(err)
            setLoading(false)
        })
    }, [user])
    return (
        <main className="w-full my-10">
            {
                loading ?
                <div className="w-fit mx-auto">
                    <Loader />
                </div>
                    :
                    <table className="table-auto text-center text-sm font-medium border-collapse border border-gray-400 w-11/12 mx-auto rounded-md overflow-hidden">
                        <caption className='text-4xl font-bold mb-8'>My <span className='text-green-700'>Foods</span> : {data?.length}</caption>
                        <thead>
                            <tr className="bg-gray-200">
                                <th>SL no.</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Expire Date</th>
                                <th>Requests</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {
                                data.map((e, i) => (
                                    <tr key={i} className="border border-gray-300 bg-white">
                                        <td>{i + 1}</td>
                                        <td>
                                            <div className="flex flex-wrap justify-center items-center gap-2">
                                                <ImgManager imgUrl={e.image} altTxt={"food Image"} styles={"h-10 w-auto rounded-sm object-center object-contain"} />
                                                <span>
                                                    <p className="font-semibold text-sm">{e.name}</p>
                                                </span>
                                            </div>
                                        </td>
                                        <td>{e.quantity}</td>
                                        <td>{new Date(e.expire_date).toLocaleDateString()}</td>
                                        <td>dsafsd</td>
                                        <td className="flex justify-center gap-2 flex-wrap">
                                            <button className="btn trnsition">Update</button>
                                            <button className="btn-out trnsition">Delete</button>
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