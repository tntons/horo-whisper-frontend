'use client';

import Image from 'next/image';
import { signIn, getSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api/fetch';

export default function Welcome() {
    const [busy, setBusy] = useState(false)
    const router = useRouter()

    const handleLogin = () => {
        setBusy(true)
        signIn('google')          
    }

    useEffect(() => {
        async function exchange() {
            const sess = await getSession()
            if (!sess?.idToken) return

            try {
                const { token } = await apiFetch('/auth/google', {
                    method: 'POST',
                    body: JSON.stringify({ idToken: sess.idToken }),
                },
                { skipAuth: true })
                localStorage.setItem('APP_TOKEN', token)
                router.replace('/login/select-role')
            } catch (err: any) {
                console.error('Exchange failed:', err.message)
                setBusy(false)
            }
        }
        exchange()
    }, [router])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Image
                src="/logo.png"
                alt="HoroWhisper Logo"
                width={130}
                height={130}
                className="rounded-lg mb-4"
            />
            <h1 className="text-[35px] font-playfair text-black mb-8">
                HoroWhisper
            </h1>
            <button
                className="bg-purple04 text-white font-normal px-8 py-2 rounded-lg"
                onClick={handleLogin}
            >
                <span className="text-[18px]">Login with Google</span>
            </button>
        </div>
    );
}