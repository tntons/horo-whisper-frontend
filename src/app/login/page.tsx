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
                    onClick={handleLogin}
                >
                    <h1 className="text-[18px]">Login with Google</h1>
                </button>
            </div>
        </div>
    );
}