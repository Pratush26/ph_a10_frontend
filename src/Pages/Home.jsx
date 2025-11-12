import { Link, useLoaderData } from 'react-router'
import '../Utils/utility.css'
import FoodCard from '../Components/FoodCard'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { motion } from 'motion/react'

export default function HomePage() {
    const { data } = useLoaderData()
    const { user } = useContext(AuthContext)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1, staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
                duration: 2
            }
        }
    };

    return (
        <main className="w-full">
            <section id="hero" className="w-full relative min-h-[50vh] lg:min-h-[80vh] 2xl:min-h-screen z-10 grid grid-cols-1 md:grid-cols-2 p-6 items-center-safe text-white">
                <div className="w-full min-h-full absolute z-3 mix-blend-darken bg-linear-to-r from-transparent from-10% via-gray-600 via-30% to-black"></div>
                <motion.img src="https://images.unsplash.com/photo-1562709902-31c9a3b1ad5c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1031"
                    alt="banner image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className='absolute h-full min-w-3/4 object-cover' />
                <div></div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="relative z-10 w-11/12 space-y-3" >
                    <motion.h1 variants={itemVariants} className="text-3xl font-bold" >Turn Surplus Food into Hope for Those in Need</motion.h1>
                    <motion.p variants={itemVariants} className="text-sm text-gray-400" >
                        Join our mission to rescue perfectly good food from going to waste and deliver it to families facing hunger. Every donation feeds a soul and saves our planet.
                    </motion.p>
                    <motion.ul variants={itemVariants} className="list-disc list-inside text-gray-300" >
                        <li>1.3 Billion Tons of Food Wasted Yearly</li>
                        <li>820 Million People Go Hungry Daily</li>
                    </motion.ul>
                    <motion.div variants={itemVariants} className="flex gap-4" >
                        <Link to='/all-foods' className="btn border-none trnsition shadow-none">View All Foods</Link>
                        {!user && <Link to='/register' className='btn-out hover:text-gray-300 trnsition'>Become a Volunteer</Link>}
                    </motion.div>
                </motion.div>
            </section>
            <section className='my-18 w-11/12 mx-auto'>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    className='text-center'>
                    <motion.h2 variants={itemVariants} className='text-5xl font-bold'>Featured <span className='text-green-700'>Foods</span></motion.h2>
                    <motion.p variants={itemVariants} className='text-sm font-medium text-gray-800 my-10'>Discover our selection of the freshest food donations with the longest remaining shelf life. These items have been carefully chosen for their extended expiration dates, ensuring maximum freshness and quality. Perfect for immediate distribution to those in need or for planned community meal programs.</motion.p>
                </motion.div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center gap-3 w-11/12 mx-auto my-10'>
                    {data.map(e => <FoodCard e={e} key={e._id} />)}
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                    }}
                    className='w-fit mx-auto mb-6'>
                    <Link to='/all-foods' className='btn'>Show all</Link>
                </motion.div>
            </section>
            <section className='my-5 w-11/12 mx-auto'>
                <h3 className='text-4xl font-bold my-5'>How does It Work?</h3>
                <p className='font-medium text-gray-800 my-3'>Join our mission to reduce food waste and fight hunger with three simple steps.
                    Our platform connects food donors with those in need, creating a sustainable
                    solution for your surplus food.</p>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    className='grid grid-cols-1 md:grid-cols-2 items-center-safe justify-items-center-safe gap-8 w-11/12 mx-auto my-10'>
                    <article className='order-2 md:order-1'>
                        <motion.div variants={itemVariants}>
                            <h4 className='font-semibold mt-4 mb-1'>1. Post Your Food</h4>
                            <p className='text-sm font-medium pl-5 text-gray-500'>
                                Share details about your surplus food - include photos, quantity,
                                expiration date, and pickup location. It takes just 2 minutes to list.
                            </p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <h4 className='font-semibold mt-4 mb-1'>2. Find & Request</h4>
                            <p className='text-sm font-medium pl-5 text-gray-500'>
                                Browse available food donations in your area. Filter by location,
                                food type, or expiration date. Request items that meet your needs.
                            </p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <h4 className='font-semibold mt-4 mb-1'>3. Collect & Share</h4>
                            <p className='text-sm font-medium pl-5 text-gray-500'>
                                Coordinate pickup directly with the donor. Collect your food and
                                distribute it to those in need or use it for your community.
                            </p>
                        </motion.div>
                    </article>
                    <motion.img variants={itemVariants} src="https://images.unsplash.com/photo-1423483641154-5411ec9c0ddf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870" alt="donation image" className='rounded-lg w-full h-auto order-1 md:order-2' />
                </motion.div>
            </section>
            <section className='w-11/12 mx-auto text-center my-24'>
                <h4 className='text-3xl font-bold my-5'>Our Mission & Impact</h4>
                <p className='font-medium text-gray-800 my-3'>We believe no edible food should go to waste while people in our community face hunger.
                    Our platform bridges the gap between surplus and scarcity, creating a sustainable
                    solution that nourishes people while protecting our planet.
                </p>
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center gap-3 w-11/12 mx-auto my-10'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className='bg-white rounded-md px-8 py-10 text-sm'>
                        <p className='text-xl font-medium'>🌱 Reduce Waste</p>
                        <p>Rescue perfectly good food from landfills</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className='bg-white rounded-md px-8 py-10 text-sm'>
                        <p className='text-xl font-medium'>❤️ Fight Hunger</p>
                        <p>Provide nutritious meals to those in need</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className='bg-white rounded-md px-8 py-10 text-sm'>
                        <p className='text-xl font-medium'>🤝 Build Community</p>
                        <p>Connect neighbors through food sharing</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className='bg-white rounded-md px-8 py-10 text-sm'>
                        <p className='text-xl font-medium'>15,000+</p>
                        <p>Meals Rescued</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className='bg-white rounded-md px-8 py-10 text-sm'>
                        <p className='text-xl font-medium'>8.5T</p>
                        <p>CO₂ Reduced</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className='bg-white rounded-md px-8 py-10 text-sm'>
                        <p className='text-xl font-medium'>600+</p>
                        <p>Active Donors</p>
                    </motion.div>
                </section>
                <h4 className='text-3xl font-bold my-5'>About Our Work</h4>
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center gap-3 w-11/12 mx-auto my-10'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className='bg-white rounded-md px-8 py-10 text-sm'>
                        <p className='text-xl font-medium'>Mission</p>
                        <p>To create a world where surplus food becomes a solution to hunger, not waste.
                            We're building a community-driven platform that makes food sharing simple,
                            accessible, and impactful for everyone..</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className='bg-white rounded-md px-8 py-10 text-sm'>
                        <p className='text-xl font-medium'>Vision</p>
                        <p>A future where every community has access to surplus food resources,
                            eliminating both food waste and hunger through technology and compassion.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className='bg-white rounded-md px-8 py-10 text-sm'>
                        <p className='text-xl font-medium'>Promise</p>
                        <p>To maintain a safe, transparent platform where every food donation
                            reaches those who need it most, with dignity and respect.</p>
                    </motion.div>
                </section>
            </section>
        </main>
    )
}