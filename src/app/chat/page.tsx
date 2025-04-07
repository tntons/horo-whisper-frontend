'use client';
import Image from 'next/image';
import { IoSend } from "react-icons/io5";
import { AiFillPicture } from "react-icons/ai";
import { useState, useRef, ChangeEvent } from 'react';

interface Message {
    id: number;
    content: string;
    timestamp: string;
    isUser: boolean;
}

export default function Chat() {
    // Mock messages data
    const messages: Message[] = [
        {
            id: 1,
            content: "Hello! I'm Golf, your fortune teller for today. How can I help you?",
            timestamp: "10:01",
            isUser: true
        },
        {
            id: 2,
            content: "Hi! I'd like to know about my career prospects for the next 3 months",
            timestamp: "10:02",
            isUser: true
        },
        {
            id: 3,
            content: "I'll be happy to help you with that. First, I'll need to know your zodiac sign and birth date to provide accurate insights.",
            timestamp: "10:03",
            isUser: false
        },
        {
            id: 4,
            content: "I'll be happy to help you with that. First, I'll need to know your zodiac sign and birth date to provide accurate insights.",
            timestamp: "10:03",
            isUser: false
        },
        {
            id: 5,
            content: "I'll be happy to help you with that. First, I'll need to know your zodiac sign and birth date to provide accurate insights.",
            timestamp: "10:03",
            isUser: true
        },
        {
            id: 6,
            content: "I'll be happy to help you with that. First, I'll need to know your zodiac sign and birth date to provide accurate insights.",
            timestamp: "10:03",
            isUser: true
        },
        {
            id: 7,
            content: "I'll be happy to help you with that. First, I'll need to know your zodiac sign and birth date to provide accurate insights.",
            timestamp: "10:03",
            isUser: false
        },
        {
            id: 8,
            content: "I'll be happy to help you with that. First, I'll need to know your zodiac sign and birth date to provide accurate insights.",
            timestamp: "10:03",
            isUser: true
        }
    ];

    const [inputValue, setInputValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'inherit';
            const scrollHeight = textareaRef.current.scrollHeight;
            // Set max height to approximately 5 lines (assuming 20px per line + padding)
            textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
        }
    };

    return (
        <div className="flex flex-col h-full relative">
            {/* header section */}
            <section className="bg-[#565896] w-full h-28">
                <div className="flex flex-row h-full items-center justify-between p-3 gap-2">

                    {/* Left Island */}
                    <div className="bg-greybackground w-9/12 h-full rounded-lg border border-greyborder">
                        <div className='flex flex-row items-center h-full p-3 gap-3'>

                            {/* Left Column - Image */}
                            <div className="relative w-[50px] h-full bg-gray-300 rounded-lg flex-shrink-0 overflow-hidden">
                                <Image src="/teller00.png" fill alt="Teller profile" className="object-cover" />
                            </div>

                            {/* Right Column - Details */}
                            <div className="flex flex-col flex-grow justify-center mx-3">
                                <h2>Golf the teller</h2>
                                <h1 className='text-md'>Start: 23 Mar 2025 : 10:00 </h1>
                                <span className='text-md text-[#727272] underline mt-2 '>Report</span>
                            </div>

                        </div>
                    </div>

                    {/* Right Island */}
                    <div className="flex flex-col gap-2 w-3/12 h-full">

                        {/* TopIsland */}
                        <div className="flex flex-col bg-greybackground w-full h-1/2 rounded-lg border border-greyborder items-center justify-center">
                            <span className='text-base'>Time Left</span>
                            <span className='text-md font-bold'>13hr 14min</span>
                        </div>

                        {/* Bottom Island */}
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
                                {/* Profile picture - only show for non-user messages */}
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
                                
                                {/* Message bubble */}
                                <div className="flex flex-col gap-1">
                                    <div className={`p-3 rounded-2xl ${
                                        message.isUser 
                                            ? 'bg-[#D2D4FF] text-black rounded-br-none' 
                                            : 'bg-white text-black rounded-bl-none'
                                    }`}>
                                        <p className="text-md">{message.content}</p>
                                    </div>
                                    <span className={`text-sm text-gray-500 ${
                                        message.isUser ? 'text-right' : 'text-left'
                                    }`}>
                                        {message.timestamp}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* typing bar - fixed at bottom */}
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
                        style={{
                            lineHeight: '20px',
                            maxHeight: '120px'  // Explicitly set max height for 5 lines
                        }}
                    />
                    <button className="mt-2">
                        <IoSend className="fill-white" size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}