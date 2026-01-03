import Error from "../Components/Error";
import FoodCard from "../Components/FoodCard";
import Loader from "../Components/Loader";
import useFetchData from "../Hooks/useFetch";

export default function AllFoodsPage() {
    const { data, loading, errMsg } = useFetchData("foods");
    return (
        <main>
            {
                loading ?
                    <div className="w-fit mx-auto">
                        <Loader />
                    </div>
                    :
                    errMsg ?
                        <Error msg={errMsg} />
                        :
                        <>
                            <h2 className='text-4xl text-center font-bold m-8'>All <span className='text-green-700'>Foods</span> ({data.length})</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 place-content-center gap-3 w-11/12 mx-auto my-10'>
                                {data.map(e => <FoodCard e={e} key={e._id} />)}
                            </div>
                        </>
            }
        </main>
    )
}