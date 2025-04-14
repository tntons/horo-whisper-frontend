'use client'
import React, { useState, useEffect } from 'react';
import SessionMenu from '../SessionMenu';
import SessionBox from '../SessionBox';
import SearchBar from '../../browseTeller/SearchBar';
import SearchFilter from '../../browseTeller/SearchFilter';
import SearchSort from '../../browseTeller/SearchSort';

interface Session {
    sessionId: number;
    customerId: number;
    username: string;
    sessionStatus: string;
    packageId: number;
    questionNumber: number;
    price: number;
    paymentId: number;
    createdDate: string;
    createdTime: string;
    endedDate: string | null;
    endedTime: string | null;
}

interface SessionInfo {
    success: boolean;
    data: {
        tellerId: number;
        sessions: Session[];
    };
}

export default function UpcomingSession() {

    const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const tellerId = 1; // Replace with actual paymentId
                const response = await fetch(`/api/tellers/upcoming-session/${tellerId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch session information');
                }
                const data = await response.json();
                console.log(data);
                setSessionInfo(data);
            } catch (error) {
                console.error('Error fetching payment info:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchSessionData();
        console.log(sessionInfo);
    }, []);

    const menuItems = [
        { title: 'Current Sessions', path: '/teller/currentsession' },
        { title: 'Past Sessions', path: '/teller/pastsession' }
    ];
    const [searchQuery, setSearchQuery] = React.useState("");

    return (
        <div className="flex flex-col items-center h-screen pt-[76px]">
            <div className='flex flex-col items-center w-full h-full p-4 gap-5 '>

                <SessionMenu
                    currentTitle="Upcoming Sessions"
                    menuItems={menuItems}
                />
                <div className="flex flex-row items-center justify-between w-full">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <SearchFilter />
                    <SearchSort />
                </div>
                {isLoading ? (
                    <h1>Loading Session ...</h1>
                ) : (
                    <>
                <div className='flex flex-col items-center w-full h-full gap-3'>
                    {sessionInfo?.data.sessions?.map((session, index) => (
                        <SessionBox
                            key={index}
                            sessionId={session.sessionId}
                            name={session.username}
                            detail={`Package: ${session.questionNumber} questions, ${session.price} baht`}
                            date={session.createdDate}
                            time={session.createdTime}
                            upcoming={true}
                        />
                    ))}
                </div>
                </>
                )}
            </div>
        </div>
    );
}