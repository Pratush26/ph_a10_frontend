import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { Navigate, useLocation } from "react-router"
import Loader from "../Components/Loader"

export default function PrivateRoute({children}) {
    const { user, loading } = useContext(AuthContext)
    const { pathname } = useLocation()
    if (loading) return <Loader />;
    if (!user) return <Navigate state={pathname} to="/login" />
    return children;
}