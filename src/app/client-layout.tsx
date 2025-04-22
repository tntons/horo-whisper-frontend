"use client";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbarPaths = [
    "/welcome",
    pathname?.startsWith("/teller/") ? pathname : "",
    pathname?.startsWith("/chat") ? pathname : "",
  ]; // Add any paths where you want to hide the navbar
  const hideHeaderPaths = ["/welcome"]; // Add any paths where you want to hide the header

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      );
    };
    window.addEventListener('resize', setVh);
    setVh();
    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <SessionProvider>
      <div className="container">
        {!hideHeaderPaths.includes(pathname || "") && <Header />}

        {!hideNavbarPaths.includes(pathname || "") && (
          <Navbar pathname={pathname || ""} />
        )}
        <div
          className={`main-content no-scrollbar`}
        >
            {children}
        </div>
      </div>
    </SessionProvider>
  );
}
