import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

interface HeaderProps {
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showBackButton = false }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Pages that should show back button
  const pagesWithBackButton = ['/chat', '/tellerinfo', '/choosepackage', '/payment']
  const shouldShowBackButton = showBackButton || pagesWithBackButton.includes(pathname);

  return (
    <nav className="absolute top-0 left-0 w-full h-[76px] bg-blue01 text-white flex items-center justify-center z-50">
      {shouldShowBackButton && (
        <button 
          onClick={() => router.back()}
          className="absolute left-4 bottom-2.5"
        >
          <IoChevronBack size={28} />
        </button>
      )}
      <div className="text-[24px] font-playfair font-[100] absolute bottom-2">
        HoroWhisper
      </div>
    </nav>
  );
};

export default Header;