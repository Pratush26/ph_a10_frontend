import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { Navigate, useLocation, useNavigation } from "react-router"
import Loader from "../Components/Loader"

export default function PrivateRoute({children}) {
    const { user, loading } = useContext(AuthContext)
    if(loading) <Loader />
    const {state} = useLocation()
    const pathname = useNavigation()
    console.log(pathname)
    if(!user) return <Navigate to='/login' />
    return children;
}