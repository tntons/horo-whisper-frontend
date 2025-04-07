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
  const hideNavbarPaths = ["/welcome"]; // Add any paths where you want to hide the navbar

  return (
    <div className="container">
      {!hideNavbarPaths.includes(pathname || "") && (
        <>
          <Header />
          <Navbar pathname={pathname || ""} />
        </>
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
