import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import UpdateUserName from "../Components/UpdateUserName";
import UpdateProfilePic from "../Components/UpdateProfilePic";
import { toast } from "react-toastify";

export default function Profile() {
    const { user, signOutUser, resetPassword } = useContext(AuthContext);
    const handleReset = () => {
        resetPassword(user?.email)
        .then(() => toast.success("Check your email"))
        .catch(() => toast.error("Something went wrong!"))
    }
    return (
        <main className="w-11/12 mx-auto my-8">
            <section className="flex gap-2 items-center justify-center">
                <div className="flex items-baseline">
                    <img src={user?.photoURL} alt="user image" className="aspect-square h-16 object-cover rounded-full" />
                    <UpdateProfilePic />
                </div>
                <div className="text-xl font-semibold">
                    <p>{user?.displayName}</p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
            </section>
            <div className="flex items-center justify-center m-2">
                <button onClick={signOutUser} className="btn trnsition rounded-md">Sign Out</button>
            </div>
            <div className="flex gap-2 items-center justify-center">
                <UpdateUserName />
                <button onClick={handleReset} className="btn trnsition rounded-md">Change Password</button>
            </div>
        </main>
    )
}