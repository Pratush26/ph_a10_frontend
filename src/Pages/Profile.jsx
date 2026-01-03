import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Profile() {
    const { user, signOutUser } = useContext(AuthContext);
    return (
        <main className="w-11/12 mx-auto my-8">
            <section className="flex gap-2 items-center justify-center">
                <img src={user?.photoURL} alt="user image" className="aspect-square h-16 object-cover rounded-full" />
                <div className="text-xl font-semibold">
                    <p>{user?.displayName}</p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
            </section>
            <div className="flex items-center justify-center">
                <button onClick={signOutUser} className="btn trns btn-primary rounded-md">Sign Out</button>
            </div>
        </main>
    )
}