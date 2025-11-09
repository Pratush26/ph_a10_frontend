import { useLoaderData } from "react-router";
import ImgManager from "../Components/ImgManager";
import "../Utils/utility.css"

export default function FoodDetails() {
    const { data } = useLoaderData()
    console.log(data)
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
                    <button className="btn trnsition">Request Food</button>
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
        </main>
    )
}