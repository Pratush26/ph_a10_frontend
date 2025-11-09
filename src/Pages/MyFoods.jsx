import { useLoaderData } from "react-router";
import FoodCard from "../Components/FoodCard";

export default function MyFoodsPage() {
    const { data } = useLoaderData()
    return (
        <main>
            <h2 className='text-4xl text-center font-bold m-8'>My <span className='text-green-700'>Foods</span> ({data.length})</h2>
            <div className='grid grid-cols-3 place-content-center gap-3 w-11/12 mx-auto my-10'>
                {data.map(e => <FoodCard e={e} key={e._id} />)}
            </div>
        </main>
    )
}