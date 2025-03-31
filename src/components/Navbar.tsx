import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoCompass } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";


const Navbar = () => {
    return (
        <nav className="fixed bottom-0 left-0 w-full h-[76px] bg-blue01 text-white flex items-center justify-center z-50">
            <div className="flex flex-row items-center justify-center gap-24">
                <MdHomeFilled className="fill-white" size={34} />
                <IoCompass className="fill-white" size={34} />
                <FaUser className="fill-white" size={26} />
            </div>

        </nav>
    )
}


export default Navbar;