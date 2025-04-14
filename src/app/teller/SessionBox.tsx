'use client'
import React, { useState, useEffect } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
interface SessionBoxProps {
    sessionId: number;
    name: string;
    detail: string;
    date: string;
    time: string;
    current?: boolean;
    past?: boolean;
    upcoming?: boolean;
    message?: number;
}

const SessionBox = ({ sessionId, name, detail, date, time, current, past, upcoming, message }: SessionBoxProps) => {
    const [isAccepted, setIsAccepted] = useState(false);
    const [isDeclined, setIsDeclined] = useState(false);
    const [isVisible, setIsVisible] = useState(true);


    const handleAcceptSession = async (sessionId: number) => {
        try {
            const response = await fetch(`/api/tellers/accept-session/${sessionId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to accept session');
            }
            if (response.ok) {
                setIsAccepted(true);
                setTimeout(() => {
                    setIsVisible(false);
                }, 1000); // Match this with your transition duration
            }
            console.log("completed");
            // Refresh session data after acceptance
            // You might want to refetch your sessions here
        } catch (error) {
            console.error('Error accepting session:', error);
        }
    };

    const handleDeclineSession = async (sessionId: number) => {
        try {
            const response = await fetch(`/api/tellers/decline-session/${sessionId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to decline session');
            }
            if (response.ok) {
                setIsDeclined(true);
                setTimeout(() => {
                    setIsVisible(false);
                }, 1000); // Match this with your transition duration
            }
            console.log("completed");
            // Refresh session data after acceptance
            // You might want to refetch your sessions here
        } catch (error) {
            console.error('Error accepting session:', error);
        }
    };

    if (!isVisible) {
        return null;
    }

    return (

        <div className={`flex w-full transition-all duration-1000 ease-out ${isAccepted
            ? 'opacity-0 transform translate-x-full scale-95'
            : isDeclined
                ? 'opacity-0 transform scale-95'
                : 'opacity-100 scale-100'
            }`}>
            <div className={`${upcoming ? 'w-10/12' : 'w-full'} h-full `}>
                <div className={`flex flex-row justify-between w-full h-24 bg-greybackground ${upcoming ? 'rounded-l-lg' : 'rounded-lg'} border border-greyborder px-6 py-4`}>
                    {/* left Column - Details */}
                    <div className="flex flex-col gap-1">
                        <h2>{name}</h2>
                        <p className="text-md ">{detail}</p>
                        <p className="text-md text-greydate">{date}</p>
                    </div>

                    {/* Right Column*/}
                    <div className="flex flex-col items-end gap-1">
                        <p className="mr-0.5">{time}</p>
                        {message !== undefined && message > 0 && current && (
                            <div className="flex items-center justify-center w-8 h-8 bg-purple04 rounded-full">
                                <span className="text-lg text-white">{message}</span>
                            </div>
                        )}
                        {upcoming && (
                            <button onClick={() => { handleDeclineSession(sessionId) }}>
                                <RiDeleteBinLine className="text-red-500 mt-6 mr-0.5" size={24} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {upcoming && (
                <button className="w-2/12 h-full rounded-r-lg bg-[#83E394] border border-[#2C821A] flex items-center justify-center"
                    onClick={() => {
                        handleAcceptSession(sessionId);
                    }}>
                    <span className="text-lg text-[#2C821A]">Accept</span>
                </button>
            )}

        </div>


    )
}

export default SessionBox;