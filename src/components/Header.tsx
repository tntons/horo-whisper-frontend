import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { Info } from "lucide-react";
import ContactSupport from "./ContactSupport";

interface HeaderProps {
  showBackButton?: boolean;
  showInfoIcon?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  showInfoIcon = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Pages that should show back button
  const pagesWithBackButton = [
    "/chat",
    "/tellerinfo",
    "/choosepackage",
    "/payment",
    "/editProfile",
  ];
  const shouldShowBackButton =
    showBackButton || pagesWithBackButton.includes(pathname);

  // Pages that should show the Info icon
  const pagesWithInfoIcon = ["/editProfile"];
  const shouldShowInfoIcon =
    showInfoIcon || pagesWithInfoIcon.includes(pathname);

  return (
    <>
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
        {shouldShowInfoIcon && (
          <button
            onClick={() => setIsInfoOpen(true)}
            className="absolute right-4 bottom-2.5"
          >
            <Info size={28} />
          </button>
        )}
      </nav>

      <ContactSupport
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </>
  );
};

export default Header;
