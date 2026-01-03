import { Link } from "react-router";
import ImgManager from "./ImgManager";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { motion } from "motion/react";

export default function FoodCard({ e }) {
    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg flex flex-col justify-between gap-2 px-4 py-6 shadow-lg/50 border border-gray-300 shadow-gray-600">
            <p className="font-semibold text-xl text-gray-900">{e.name}</p>
            <ImgManager imgUrl={e.image} altTxt='Food image' styles='w-full aspect-square object-center rounded-lg my-2' />
            <article className="font-medium space-y-1">
                <p className="text-xs text-gray-600">Expire Date : {new Date(e.expire_date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-700">Location : {e.pickup_location}</p>
            </article>
            <Link to={`/food/details/${e._id}`} className="italic hover:underline flex items-center w-fit">view details <MdKeyboardDoubleArrowRight className="text-lg" /></Link>
        </motion.section>
    )
}