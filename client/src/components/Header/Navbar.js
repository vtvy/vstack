import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../features/Auth/userSlice";
import Search from "../../features/Search";
import useClickOutside from "../../Hooks/useClickOutside";
import NavbarMenu from "./NavbarMenu";

function Navbar({ setToggleMenu, toggleMenu }) {
    const user = useSelector((state) => state.user.current);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [refInside, isInside, setIsInside] = useClickOutside(false);
    const handleLogout = () => {
        const action = logOut();
        dispatch(action);
    };
    const reLoadPage = () => {
        navigate("/");
        window.location.reload();
    };
    return (
        <div className="h-full w-full flex gap-4 items-center justify-between px-4">
            <div className="flex items-center ">
                <span
                    onClick={() => {
                        setToggleMenu(!toggleMenu);
                    }}
                    className="cursor-pointer text-4xl"
                >
                    <i className="fas fa-bars dark:text-textColorDark"></i>
                </span>
                <div
                    className="mx-4 md:mx-[3.6rem] text-indigo-600 font-bold text-4xl cursor-pointer"
                    onClick={reLoadPage}
                >
                    Veta
                </div>
            </div>
            <Search />
            <div className="flex gap-x-4 items-center">
                <Link
                    to="/chat"
                    className="w-16 h-16 rounded-full flex justify-center items-center bg-[#e4e6eb] dark:bg-indigo-850 hover:bg-[#d9dbdd] cursor-pointer"
                >
                    <i className="fas fa-comment-dots dark:text-white"></i>
                </Link>
                <div className="w-16 h-16 rounded-full flex justify-center items-center bg-[#e4e6eb] hover:bg-[#d9dbdd] cursor-pointer">
                    <i className="fas fa-bell text-3xl"></i>
                </div>
                <div ref={refInside} className="cursor-pointer relative">
                    {" "}
                    <div onClick={() => setIsInside(!isInside)}> </div>
                    <div>
                        {isInside && (
                            <NavbarMenu user={user} onLogOut={handleLogout} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
