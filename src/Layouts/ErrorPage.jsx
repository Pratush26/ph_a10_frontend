import { Link, useRouteError } from "react-router";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Error from "../Components/Error";

export default function ErrorPage() {
    const {message} = useRouteError()
    return (
        <section className='flex flex-col items-center-safe justify-between min-h-screen'>
            <Navbar />
            <Error msg={message}/>
            <Footer />
        </section>
    )
}