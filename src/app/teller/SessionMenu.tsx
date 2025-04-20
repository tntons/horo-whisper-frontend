import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { useRouter } from "next/navigation";
import { IoRefresh } from "react-icons/io5";
interface MenuItem {
  title: string;
  path: string;
}

interface SessionDropdownProps {
  currentTitle: string;
  menuItems: MenuItem[];
  refresh: () => void;
}

const SessionMenu: React.FC<SessionDropdownProps> = ({ currentTitle, menuItems, refresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full flex justify-center">
      {/* Container for both menu and refresh button */}
      <div className="flex items-center w-full justify-between">
        {/* Menu centered in page */}
        <div className="flex-1" /> {/* Left spacer */}
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-2xl font-semibold"
          >
            {currentTitle}
            {isOpen ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
          </button>
        </div>
        <div className="flex-1 flex justify-end"> {/* Right spacer with refresh button */}
          <button className="flex items-center text-gray-600 hover:text-gray-800" onClick={() => refresh()}>
            <IoRefresh size={25} />
          </button>
        </div>
      </div>
  

      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionMenu;