'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch } from '@/lib/api/fetch'

export default function SelectRolePage() {
    const router = useRouter()
    const [loading, setLoading] = useState<'teller' | 'customer' | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSelect = async (role: 'teller' | 'customer') => {
        setLoading(role)
        setError(null)

        try {
            // POST to your backend select-role endpoint
            const { success, profile } = await apiFetch('/auth/select-role', {
                method: 'POST',
                body: JSON.stringify({ role }),
            })

            if (!success) {
                throw new Error('Role selection failed')
            }

            console.log(`${role} profile`, profile)
            // redirect based on chosen role
            router.push(role === 'teller' ? '/teller/currentsession' : '/home')
        } catch (err: any) {
            console.error(err)
            setError(`Failed to load ${role} profile`)
        } finally {
            setLoading(null)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-semibold mb-6">
                Please select the role you want to login
            </h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
                onClick={() => handleSelect('teller')}
                disabled={!!loading}
                className="w-full max-w-xs py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading === 'teller' ? 'Loading Teller…' : 'Teller'}
            </button>
            <button
                onClick={() => handleSelect('customer')}
                disabled={!!loading}
                className="w-full max-w-xs py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
                {loading === 'customer' ? 'Loading Customer…' : 'Customer'}
            </button>
        </div>
    )
}