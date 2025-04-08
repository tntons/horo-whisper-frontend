import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { useRouter } from "next/navigation";

interface MenuItem {
  title: string;
  path: string;
}

interface SessionDropdownProps {
  currentTitle: string;
  menuItems: MenuItem[];
}

const SessionMenu: React.FC<SessionDropdownProps> = ({ currentTitle, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-2xl font-semibold"
      >
        {currentTitle}
        {isOpen ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
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