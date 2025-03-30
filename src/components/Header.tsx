import React from "react";

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-[76px] bg-blue01 text-white flex items-center justify-center z-50">
      <div className="text-[24px] font-playfair font-[100] absolute bottom-2">
        HoroWhisper
      </div>
    </nav>
  );
};

export default Header;
