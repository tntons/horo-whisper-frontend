"use client";
import React, { useState, useEffect } from "react";
import SessionMenu from "../SessionMenu";
import SessionBox from "../SessionBox";
import SearchBar from "../../browseTeller/SearchBar";
import SearchFilter from "../../browseTeller/SearchFilter";
import SearchSort from "../../browseTeller/SearchSort";
import { apiFetch } from "@/lib/api/fetch";
import { getTellerId } from "@/app/utils/getTellerId";
import { io } from "socket.io-client";

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
  lastChat: {
    content: string,
    timestamp: string
  },
  unreadCount: number
}

interface SessionInfo {
  success: boolean;
  data: {
    tellerId: number;
    sessions: Session[];
  };
}

interface ErrorResponse {
  success: false;
  code: string;
  message: string;
}

export default function CurrentSession() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sessionInfo, setSessionInfo] = useState<
    SessionInfo | ErrorResponse | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("Latest: newest first");
  const [sessions, setSessions] = useState<Session[]>([]);

  const menuItems = [
    { title: "Past Sessions", path: "/teller/pastsession" },
    { title: "Upcoming Sessions", path: "/teller/upcomingsession" },
  ];

  let socket: ReturnType<typeof io>;

  async function fetchSessionData() {
    const tellerId = await getTellerId();
    const res = await apiFetch(`/tellers/${tellerId}/current-session`);
    console.log("session info:", res);
    setSessionInfo(res);
    setSessions(res.data.sessions);

    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      auth: { token: localStorage.getItem("APP_TOKEN") },
    });
    res.data.sessions.forEach((sess: Session) => {
      socket.emit("subscribeSession", sess.sessionId);
    });
    socket.on(
      "sessionUpdate",
      ({ sessionId, lastMessage, unreadCount, lastMessageTime }) => {
        console.log("sessionUpdate", sessionId, lastMessage, unreadCount);
        setSessions(s =>
          s.map(sess =>
            sess.sessionId == sessionId
              ? {
                ...sess,
                lastChat: {
                  content: lastMessage,
                  timestamp: lastMessageTime
                },
                unreadCount
              }
              : sess
          )
        )
      }
    );
  }

  useEffect(() => {
    fetchSessionData()
      .catch(console.error)
      .finally(() => setIsLoading(false));
    return () => {
      socket?.disconnect();
    };
  }, []);

  const filteredSession = sessions
    .filter((session) =>
      session.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateTimeA = new Date(`${a.createdDate} ${a.createdTime}`).getTime();
      const dateTimeB = new Date(`${b.createdDate} ${b.createdTime}`).getTime();
      return sortOption === "Earliest: oldest first"
        ? dateTimeA - dateTimeB
        : dateTimeB - dateTimeA;
    });

  return (
    <div className="flex flex-col items-center h-screen font-inter">
      <div className="flex flex-col items-center w-full h-full p-4 gap-5 ">
        <SessionMenu currentTitle="Current Sessions" menuItems={menuItems}refresh={fetchSessionData}/>
        <div className="flex flex-row items-center justify-between w-full gap-3">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            forCustomer={false}
          />
          <SearchSort selectedSort={sortOption} setSortOption={setSortOption} forCustomer={false} />
        </div>

        {isLoading ? (
          <h1>Loading Session ...</h1>
        ) : !sessionInfo?.success ? (
          <div className="flex flex-col items-center justify-center mb-20 flex-1 gap-2">
            <h2 className="text-xl font-medium text-gray-600">
              No Current Session Available
            </h2>
            <p className="text-gray-500">You have no active session.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center w-full h-full gap-3">
              {filteredSession.map((session, index) => (
                <SessionBox
                  key={index}
                  sessionId={session.sessionId}
                  name={session.username}
                  detail={"This is the latest message in session"}
                  date={session.createdDate} // must change to latest message date
                  time={session.createdTime}
                  current={true}
                  lastMessage={session.lastChat.content}
                  timeSendLastMessage={session.lastChat.timestamp}
                  unreadCount={session.unreadCount}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
