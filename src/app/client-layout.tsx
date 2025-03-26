'use client'
import Navbar from "../components/Navbar";
import { usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbarPaths = ['/welcome']; // Add any paths where you want to hide the navbar

  return (
    <div className="container">
      {!hideNavbarPaths.includes(pathname) && <Navbar />}
      <div className="main-content">{children}</div>
    </div>
  );
} 