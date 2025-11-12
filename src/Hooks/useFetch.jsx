import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

export default function useFetchData(url) {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState(null);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        if (!user) return;
        setLoading(true);
        setErrMsg(null);
        axios(`${import.meta.env.VITE_SERVER}/${url}`, {
            headers: { Authorization: `Bearer ${user?.accessToken}` },
        }).then((res) => {
            setData(res.data);
            setErrMsg(null);
        }).catch((err) => {
            setErrMsg(err.message)
        }).finally(() => setLoading(false))
    }, [url, user, refresh])
    return { data, loading, errMsg, setRefresh };
}