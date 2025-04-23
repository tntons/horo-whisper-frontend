'use client'

import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { io, Socket } from 'socket.io-client'
import { IoSend } from 'react-icons/io5'
import { AiFillPicture } from 'react-icons/ai'
import Image from 'next/image'
import { apiFetch } from '@/lib/api/fetch'
import { formatDate, formatDuration, formatTime } from '@/app/utils/date'
import { useMemo } from 'react'
import { Customer, Teller } from '@/app/utils/type'

interface Message { id: number; content: string; timestamp: string; isUser: boolean }
let socket: Socket

interface SessionInfo {
    customer: Customer
    teller: Teller
    senderRole: string
    session: {
        id: number
        timeStart: string
        timeEnd: string
        status: string
    }
}


export default function Chat() {
    const router = useRouter()
    const params = useSearchParams()
    const sessionId = Number(params.get('sessionId'))
    const userType = params.get('usertype')
    const isCustomer = userType == 'customer' ? true : false
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const socketRef = useRef<Socket | null>(null)
    const currentUserId = useRef<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null)
    const [sender, setSender] = useState<Customer | Teller | null>(null)
    const [receiver, setReceiver] = useState<Customer | Teller | null>(null)
    const [autoScroll, setAutoScroll] = useState(true)
    const [isEnded, setIsEnded] = useState(false)

    const handleScroll = () => {
        if (!containerRef.current) return
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current
        setAutoScroll(scrollHeight - scrollTop - clientHeight < 50)
    }

    const fetchSessionStatus = async () => {
        try {
            const res = await apiFetch(`/tellers/sessiondata/${sessionId}`, { method: 'GET' }, { skipAuth: false })
            console.log('Fetch Session Data', res)
            if (res.data.sessionStatus == 'Ended') {
                setIsEnded(true)
            } else {
                setIsEnded(false)
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchSessionStatus()
    }, [])

    useEffect(() => {
        if (autoScroll && containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [messages, autoScroll])

    useEffect(() => {
        if (!sessionId) return
        // connect once
        socketRef.current = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
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

        socketRef.current.on('sessionEnded', () => {
            console.log('listening session ended')
            setIsEnded(true);
        });

        // initial load via REST
        async function loadInitialData() {
            try {
                const [historyRes, infoRes] = await Promise.all([
                    apiFetch(`/chats/history/${sessionId}`),
                    apiFetch(`/chats/info/${sessionId}`)
                ])
                console.log('Session Info:', infoRes.data)
                console.log('Chat History:', historyRes.data)
                const customer = infoRes.data.customer
                const teller = infoRes.data.teller
                if(infoRes.data.senderRole == 'customer') {
                    currentUserId.current = customer.userId
                    setSender(customer)
                    setReceiver(teller)
                } else {
                    currentUserId.current = teller.userId
                    setSender(teller)
                    setReceiver(customer)
                }
                setMessages(historyRes.data)
                setSessionInfo(infoRes.data)
            } catch (err) {
                console.error('Error loading initial data:', err)
            }
        }
        loadInitialData()

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

    const handleEndSession = async () => {
        try {
            const res = await apiFetch(`/tellers/end-session/${sessionId}`, { method: 'PATCH' }, { skipAuth: false })
            console.log('Session ended:', res)

            if (!socketRef.current) {
                console.error('Socket not connected yet')
                return
            }
            socketRef.current.emit('endSession', { sessionId });
            console.log('session end is clicked')

            setIsEnded(true)
        } catch (error) {
            console.error(error)
        }
    }


    const handleSharePrediction = () => {
        const pa = sessionInfo?.customer.prediction
        if (!pa || !socketRef.current) return
        console.log('Sharing prediction:', pa)
        const lines: string[] = []
        if (pa.birthPlace) lines.push(`birth place: ${pa.birthPlace}`)
        if (pa.birthTime) lines.push(`birth time: ${pa.birthTime}`)
        if (pa.zodiacSign) lines.push(`zodiac sign: ${pa.zodiacSign}`)
        if (pa.career) lines.push(`career: ${pa.career}`)
        if (pa.relationship) lines.push(`relationship: ${pa.relationship}`)

        const text = lines.join('\n')
        socketRef.current.emit('sendMessage', { sessionId, content: text })
    }

    const timeLeft = useMemo(() => {
        if (!sessionInfo) {
            console.debug('timeLeft: sessionInfo is null')
            return 'sessionInfo is null1'
        }
        const { timeStart, timeEnd } = sessionInfo.session
        if (!timeStart) {
            console.debug('timeLeft: timeStart is null')
            return 'timeStart is null'
        }
        if (!timeEnd) {
            console.debug('timeLeft: timeEnd is null')
            return 'timeEnd is null'
        }
        const result = formatDuration(timeStart, timeEnd)
        if (!result) {
            console.debug('timeLeft: formatDuration returned falsy')
            return 'cannot calculate duration'
        }
        return result
    }, [sessionInfo])

    return (
        <div className="flex flex-col h-full font-inter relative">
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
                                <h2>{sender?.user.username}</h2>
                                <h1 className='text-md'>Start: {formatDate(sessionInfo?.session.timeStart)} :{' '}
                                    {formatTime(sessionInfo?.session.timeStart)}</h1>
                                <span className='text-md text-[#727272] underline mt-2 '>Report</span>
                            </div>
                        </div>
                    </div>
                    {/* Right Island */}
                    <div className="flex flex-col gap-2 w-3/12 h-full">
                        <div className="flex flex-col bg-greybackground w-full h-1/2 rounded-lg border border-greyborder items-center justify-center">
                            <span className='text-base'>Time Left</span>
                            <span className='text-md font-bold'>{timeLeft}</span>
                        </div>
                        <div className="flex flex-col bg-greybackground w-full h-1/2 rounded-lg border border-greyborder items-center justify-center">
                            {sessionInfo?.senderRole === 'customer' ? (
                                <button
                                    onClick={handleSharePrediction}
                                    className='flex flex-col items-center justify-center'
                                >
                                    <span className='text-base font-bold text-purple02'>
                                        Share Prediction
                                    </span>
                                    <span className='text-base font-bold text-purple02'>
                                        Attributes
                                    </span>
                                </button>
                            ) : (
                                <button
                                    onClick={handleEndSession}
                                    className='text-base font-bold text-purple02'
                                >
                                    End Session
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* chat section */}
            <section
                ref={containerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4"
            >
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
                                        <p
                                            className="text-md"
                                            style={{ whiteSpace: 'pre-wrap' }}
                                        >
                                            {message.content}
                                        </p>
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

            {!isEnded ? (
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
            ) : (
                <div className="w-full bg-[#565896] border-t border-gray-200 px-4 py-2">
                    <div className="flex flex-col items-center justify-between gap-2">
                        <span className="text-white text-lg">Session is Ended</span>
                        {isCustomer && (
                        <button
                            onClick={() => router.push(`/review/${sessionId}`)}
                            className="bg-white text-lg text-[#565896] px-4 py-1 rounded-lg hover:bg-opacity-90 transition-colors font-medium"
                        >
                            Write me a Review!
                        </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}