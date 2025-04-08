"use client";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbarPaths = ["/welcome","/teller/currentsession","/teller/pastsession","/tellerupcomingsession"]; // Add any paths where you want to hide the navbar
  const hideHeaderPaths = ["/welcome"]; // Add any paths where you want to hide the header

  return (
    <div className="container">

      {!hideHeaderPaths.includes(pathname || "") && (
        <Header/>
      )}

      {!hideNavbarPaths.includes(pathname || "") && (
          <Navbar pathname={pathname || ""} />
      )}
      <div
        className={`main-content ${
          !hideNavbarPaths.includes(pathname || "") ? "pt-[76px] pb-[76px]" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
