import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 h-[76px] w-full bg-blue01 text-white flex items-center justify-center">
      <div className="font-playfair text-2xl">HoroWhisper</div>
    </nav>
  );
};

export default Navbar;
