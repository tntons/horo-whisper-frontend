"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const [isSnapped, setIsSnapped] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    console.log("isSnapped", isSnapped);
    useEffect(() => {
        const handleScroll = () => {
            console.log("scrolling", window.scrollY);
            if (window.scrollY > 10) {
                setIsSnapped(true);
            } else {
                setIsSnapped(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleWhiteScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        console.log("white section scroll", {
            scrollTop: target.scrollTop,
            scrollHeight: target.scrollHeight,
            clientHeight: target.clientHeight
        });
    };

    return (
        <div ref={containerRef} className="min-h-screen w-full">
            {/* Fixed Black Background */}
            <div className="fixed inset-0 bg-black z-0">
                <h1 className="text-white text-center pt-20 text-2xl">Black Section</h1>
            </div>

            {/* Scrollable White Section */}
            <div
                className={`relative transition-all duration-300 ease-out ${isSnapped ? "top-0" : "top-48"
                    } min-h-screen bg-white rounded-t-[20px]`}
            >
                <div 
                    className="h-full overflow-y-auto"

                >
                    <div className="p-8 pb-16">
                        <h1 className="text-black text-2xl font-bold mb-6">White Section</h1>
                        <p className="mb-4">Scroll up to expand this section!</p>
                        {/* Sample content to enable scrolling */}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <h2 className="text-lg font-semibold mb-2">Section {i + 1}</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
