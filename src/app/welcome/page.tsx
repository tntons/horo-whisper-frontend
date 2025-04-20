'use client';

import Image from 'next/image';
import { signIn } from "next-auth/react";

export default function Welcome() {
    return (
        <div className="flex flex-col items-center p-4">
            <div className="mt-40">
                <Image
                    src="/logo.svg"
                    alt="Teller"
                    width={130}
                    height={130}
                    className="rounded-lg"
                />
            </div>
            <div className="mt-2">
                <h1 className="text-[35px] font-normal font-playfair text-black">HoroWhisper</h1>
            </div>
            <div>
                <button
                    className="bg-purple04 mt-24 text-white font-normal px-8 py-2 rounded-lg"
                    onClick={() =>
                        signIn('google', { callbackUrl: '/' })
                    }
                >
                    <h1 className="text-[18px]">Login with Google</h1>
                </button>
            </div>
        </div>
    );
}