"use client";
import React, { useState, useEffect } from "react";
import SessionMenu from "../SessionMenu";
import SessionBox from "../SessionBox";
import SearchBar from "../../browseTeller/SearchBar";
import SearchFilter from "../../browseTeller/SearchFilter";
import SearchSort from "../../browseTeller/SearchSort";

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
interface ErrorResponse {
  success: false;
  code: string;
  message: string;
}

export default function UpcomingSession() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sessionInfo, setSessionInfo] = useState<
    SessionInfo | ErrorResponse | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSessionData = async () => {
    try {
      const tellerId = 1;
      const response = await fetch(`/api/tellers/${tellerId}/upcoming-session`);
      const data = await response.json();
      setSessionInfo(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching session info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, []);

  const menuItems = [
    { title: "Current Sessions", path: "/teller/currentsession" },
    { title: "Past Sessions", path: "/teller/pastsession" },
  ];

  return (
    <div className="flex flex-col items-center h-screen pt-[76px] font-inter">
      <div className="flex flex-col items-center w-full h-full p-4 gap-5">
        <SessionMenu currentTitle="Upcoming Sessions" menuItems={menuItems} />
        <div className="flex flex-row items-center justify-between w-full">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <SearchFilter />
          <SearchSort />
        </div>
        {isLoading ? (
          <h1>Loading Session ...</h1>
        ) : !sessionInfo?.success ? (
          <div className="flex flex-col items-center justify-center mb-20 flex-1 gap-2">
            <h2 className="text-xl font-medium text-gray-600">
              No Upcoming Session Available
            </h2>
            <p className="text-gray-500">
              Hang on! Customers is coming to you soon.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full h-full gap-3">
            {sessionInfo.data.sessions?.map((session) => (
              <SessionBox
                key={session.sessionId}
                sessionId={session.sessionId}
                name={session.username}
                detail={`Package: ${session.questionNumber} questions, ${session.price} baht`}
                date={session.createdDate}
                time={session.createdTime}
                upcoming={true}
                onSessionUpdate={fetchSessionData}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
