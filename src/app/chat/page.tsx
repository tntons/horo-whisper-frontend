'use client'
import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { io, Socket } from 'socket.io-client'
import { IoSend } from 'react-icons/io5'
import { AiFillPicture } from 'react-icons/ai'
import Image from 'next/image'
import { apiFetch } from '@/lib/api/fetch'

interface Message { id: number; content: string; timestamp: string; isUser: boolean }
let socket: Socket

export default function Chat() {
    const params = useSearchParams()
    const sessionId = Number(params.get('sessionId'))
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const socketRef = useRef<Socket | null>(null)
    const currentUserId = useRef<number | null>(null)


    useEffect(() => {
        if (!sessionId) return
        // connect once
        socketRef.current = io('http://localhost:8000', {
            auth: { token: localStorage.getItem('APP_TOKEN') }
        })
        socketRef.current.emit('join', sessionId)

        socketRef.current.on('newMessage', (chat: any) => {
            console.log('New message user:', currentUserId.current)
            console.log('New message sender:', chat.senderId)
            const isUser = chat.senderId == currentUserId.current
            setMessages(msgs => [
                ...msgs,
                {
                    id: chat.id,
                    content: chat.content,
                    timestamp: chat.createdAt,
                    isUser: isUser
                }
            ])
        })

        // initial load via REST (optional)
        fetch(`http://localhost:8000/chats/${sessionId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('APP_TOKEN')}` }
        })
            .then(r => r.json())
            .then(d => setMessages(d.data))


        return () => {
            if (!socketRef.current) {
                console.error('Socket not connected yet')
                return
            } 
            socketRef.current.disconnect()
        }
    }, [sessionId])

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
        if (textareaRef.current) {
            textareaRef.current.style.height = 'inherit'
            const sh = textareaRef.current.scrollHeight
            textareaRef.current.style.height = `${Math.min(sh, 120)}px`
        }
    }

    const handleSendMessage = () => {
        if (!inputValue.trim() || !sessionId) return
        const payload = { sessionId, content: inputValue }
        if (!socketRef.current) {
            console.error('Socket not connected yet')
            return
        }
        socketRef.current.emit('sendMessage', payload)
        setInputValue('')
    }

    useEffect(() => {
        async function loadCurrentUser() {
            try {
                const res = await apiFetch('/me', { method: 'GET' }, { skipAuth: false })
                console.log('Current user:', res.id)
                currentUserId.current = res.id
            } catch (error) {
                console.error(error)
            }
        }
        loadCurrentUser()
    }, [])

    return (
        <div className="flex flex-col h-full relative">
            {/* header section */}
            <section className="bg-[#565896] w-full h-28">
                <div className="flex flex-row h-full items-center justify-between p-3 gap-2">
                    {/* Left Island */}
                    <div className="bg-greybackground w-9/12 h-full rounded-lg border border-greyborder">
                        <div className='flex flex-row items-center h-full p-3 gap-3'>
                            <div className="relative w-[50px] h-full bg-gray-300 rounded-lg flex-shrink-0 overflow-hidden">
                                <Image src="/teller00.png" fill alt="Teller profile" className="object-cover" />
                            </div>
                            <div className="flex flex-col flex-grow justify-center mx-3">
                                <h2>Golf the teller</h2>
                                <h1 className='text-md'>Start: 23 Mar 2025 : 10:00 </h1>
                                <span className='text-md text-[#727272] underline mt-2 '>Report</span>
                            </div>
                        </div>
                    </div>
                    {/* Right Island */}
                    <div className="flex flex-col gap-2 w-3/12 h-full">
                        <div className="flex flex-col bg-greybackground w-full h-1/2 rounded-lg border border-greyborder items-center justify-center">
                            <span className='text-base'>Time Left</span>
                            <span className='text-md font-bold'>13hr 14min</span>
                        </div>
                        <div className="flex flex-col bg-greybackground w-full h-1/2 rounded-lg border border-greyborder items-center justify-center">
                            <button className='flex flex-col items-center justify-center'>
                                <span className='text-base font-bold text-purple02'>Share Prediction </span>
                                <span className='text-base font-bold text-purple02'>Attributes </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* chat section */}
            <section className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                            <div className="flex items-end gap-2 max-w-[80%]">
                                {!message.isUser && (
                                    <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src="/teller00.png"
                                            width={32}
                                            height={32}
                                            alt="Teller profile"
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col gap-1">
                                    <div className={`p-3 rounded-2xl ${message.isUser
                                        ? 'bg-[#D2D4FF] text-black rounded-br-none'
                                        : 'bg-white text-black rounded-bl-none'
                                        }`}>
                                        <p className="text-md">{message.content}</p>
                                    </div>
                                    <span className={`text-sm text-gray-500 ${message.isUser ? 'text-right' : 'text-left'}`}>
                                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* typing bar */}
            <div className="w-full bg-[#565896] border-t border-gray-200 px-4 py-3">
                <div className="flex flex-row items-start gap-6">
                    <button className="mt-2">
                        <AiFillPicture className="fill-white" size={20} />
                    </button>
                    <textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={handleTextareaChange}
                        placeholder="Type your message..."
                        rows={1}
                        className="flex-1 bg-[#F5F5F5] px-3 py-2 text-md focus:outline-none resize-none overflow-auto min-h-[16px]"
                        style={{ lineHeight: '20px', maxHeight: '120px' }}
                    />
                    <button className="mt-2" onClick={handleSendMessage}>
                        <IoSend className="fill-white" size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}