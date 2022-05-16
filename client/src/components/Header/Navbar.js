import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../features/Auth/userSlice";

function Navbar() {
    const user = useSelector((state) => state.user.current);
    const dispatch = useDispatch();
    const handleLogout = () => {
        const action = logOut();
        dispatch(action);
    };

    return (
        <div className="h-full w-full flex gap-4 items-center justify-between px-4">
            <div className="flex items-center ">
                <Link
                    className="mx-4 md:mx-[3.6rem] text-indigo-600 font-bold text-4xl cursor-pointer"
                    to="/"
                >
                    Vstack
                </Link>
            </div>

            <div className="flex gap-x-4 items-center">
                <h2>{user.username}</h2>
                <Link
                    title="Your Profile"
                    to={`/profile/${user.id}`}
                    className="w-16 h-16 rounded-full flex justify-center items-center bg-[#e4e6eb] dark:bg-indigo-850 hover:bg-[#d9dbdd] cursor-pointer"
                >
                    <i className="fa-solid fa-user-astronaut"></i>
                </Link>
                {/* <Link
                    title="Change password"
                    to={`/profile/${user.id}`}
                    className="w-16 h-16 rounded-full flex justify-center items-center bg-[#e4e6eb] dark:bg-indigo-850 hover:bg-[#d9dbdd] cursor-pointer"
                >
                    <i className="fa-solid fa-key"></i>
                </Link> */}
                <div
                    title="Logout"
                    onClick={handleLogout}
                    className="w-16 h-16 rounded-full flex justify-center items-center bg-[#e4e6eb] dark:bg-indigo-850 hover:bg-[#d9dbdd] cursor-pointer"
                >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
