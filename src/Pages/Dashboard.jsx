import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    return (
        <main className="w-11/12 mx-auto my-8">
            <section className="flex gap-2 items-center justify-center">
                <h4 className="text-2xl font-semibold">Dashboard, {user?.displayName}</h4>
            </section>
        </main>
    )
}