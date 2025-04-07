import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoCompass } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Navbar = ({ pathname }: { pathname: string }) => {
  const activePath = pathname || "";
  const router = useRouter();

  return (
    <nav className="absolute bottom-0 left-0 w-full h-[76px] bg-blue01 text-white flex items-center justify-center z-50">
      <div className="flex flex-row items-center justify-center gap-24">
        <MdHomeFilled
          className="fill-current"
          size={34}
          style={{ color: activePath === "/home" ? "#FFFFFF" : "#787BC3" }}
          onClick={() => router.push("/home")}
        />
        <IoCompass
          className="fill-current"
          size={34}
          style={{
            color:
              activePath === "/browseTeller" ||
              activePath === "/tellerinfo" ||
              activePath === "/choosepackage"
                ? "#FFFFFF"
                : "#787BC3",
          }}
          onClick={() => router.push("/browseTeller")}
        />
        <FaUser
          className="fill-current"
          size={26}
          style={{
            color: activePath === "/editProfile" ? "#FFFFFF" : "#787BC3",
          }}
          onClick={() => router.push("/editProfile")}
        />
      </div>
    </nav>
  );
};

export default Navbar;
