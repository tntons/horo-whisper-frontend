import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { Info, UserRound } from "lucide-react";
import ContactSupport from "./ContactSupport";

interface HeaderProps {
  showBackButton?: boolean;
  showInfoIcon?: boolean;
  showUserButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  showInfoIcon = false,
  showUserButton = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Pages that should show back button
  const pagesWithBackButton = ["/chat", "/payment", "/editProfile"];
  const shouldShowBackButton =
    showBackButton ||
    pagesWithBackButton.includes(pathname) ||
    pathname.startsWith("/tellerinfo/") ||
    pathname.startsWith("/choosepackage/") ||
    pathname.startsWith("/teller/profile");

  // Pages that should show the Info icon
  const pagesWithInfoIcon = ["/editProfile"];
  const shouldShowInfoIcon =
    showInfoIcon || pagesWithInfoIcon.includes(pathname);

  const pagesWithUserButton = pathname.startsWith("/teller/");
  const shouldShowUserButton = pagesWithUserButton || showUserButton;

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
        {shouldShowUserButton && (
          <button
            className="absolute right-4 bottom-2.5"
            onClick={() => router.push("/teller/profile")}
          >
            <UserRound size={24} />
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
