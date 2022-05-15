import React from "react";
import Navbar from "./Navbar";

function Header() {
    return (
        <div className="w-full h-[7rem] z-50 shadow-lg bg-white dark:bg-indigo-950 fixed">
            <Navbar />
        </div>
    );
}

export default Header;
