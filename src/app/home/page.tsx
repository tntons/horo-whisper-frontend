"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SessionBox from "@/app/home/SessionBox";
import { apiFetch } from "@/lib/api/fetch";
import { getLuckyColor } from "./GetLuckyColor";
import { getCustomerId } from "@/app/utils/getCustomer";
import { io } from "socket.io-client";

interface Session {
  id: number;
  customerId: number;
  tellerId: number;
  createdAt: string;
  endedAt: string;
  sessionStatus: string;
  paymentId: number;
  teller: {
    user: {
      username: string;
    };
  };
  lastChat: {
    content: string;
    timestamp: string;
  }
  unreadCount: number;
}

interface Prediction {
  prediction: string;
  luckyColors: string[];
  luckyNumbers: number[];
}

interface ErrorResponse {
  success: false;
  code: string;
  message: string;
}

export default function Home() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [predictionData, setPredictionData] = useState<
    Prediction | ErrorResponse | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [customerId, setCustomerId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const id = await getCustomerId()
        setCustomerId(id)
      } catch (error) {
        console.error('Error fetching customer ID:', error)
      }
    }
    fetchCustomerId()
  }, [])
  
  const fetchSessions = async () => {
    try {
      const payload = await apiFetch(`/customers/sessions`);
      console.log("Session data", payload);
      setSessions(payload.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const fetchPrediction = async () => {
    try {
      const response = await apiFetch(
        `/customers/daily-prediction/${customerId}`
      );
      const data = await response.data;
      setPredictionData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setPredictionData(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
    fetchSessions();
  }, []);

  // useEffect(() => {
  //   const socket = io('http://localhost:8000', {
  //     auth: { token: localStorage.getItem('APP_TOKEN') }
  //   })
  //   socket.emit('joinUpdates')
  //   socket.on('sessionUpdate', (upd: Partial<Session> & { sessionId: number }) => {
  //     setSessions(s =>
  //       s.map(sess =>
  //         sess.id === upd.id ? { ...sess, ...upd } : sess
  //       )
  //     )
  //   })
  //   return () => { socket.disconnect() }
  // }, [])


  const currentSessions = sessions.filter(
    (session) => session.sessionStatus === "Active"
  );

  const pendingSessions = sessions
    .filter(
      (session) =>
        session.sessionStatus === "Pending" ||
        session.sessionStatus === "Processing"
    )
    .sort((a, b) => {
      // Sort "Processing" sessions first
      if (
        a.sessionStatus === "Processing" &&
        b.sessionStatus !== "Processing"
      ) {
        return -1;
      }
      if (
        a.sessionStatus !== "Processing" &&
        b.sessionStatus === "Processing"
      ) {
        return 1;
      }
      return 0; // Keep the order for other statuses
    });

  const sessionHistory = sessions
    .filter(
      (session) =>
        session.sessionStatus === "Ended" ||
        session.sessionStatus === "Declined"
    )
    .sort((a, b) => {
      // Sort "Ended" sessions first
      if (a.sessionStatus === "Ended" && b.sessionStatus !== "Ended") {
        return -1;
      }
      if (a.sessionStatus !== "Ended" && b.sessionStatus === "Ended") {
        return 1;
      }
      return 0; // Keep the order for other statuses
    });

  return (
    <div className="h-full w-full overflow-y-scroll no-scrollbar font-inter snap-y snap-mandatory ">
      {/* size of the section can be fix here */}
      <section className="h-[33vh] w-full bg-gradient-to-b from-[#090C6C] via-[#575ABA] via-100% to-[#575ABA] py-4 px-4 snap-start">
        <div className="flex items-center justify-center mb-2">
          <h1 className="text-white text-lg font-bold">Your Daily Horoscope</h1>
        </div>

        {isLoading ? (
          <div></div>
        ) : predictionData ? (
          // size of the preidiction box can be fix here
          <div className="flex flex-row w-full h-[27vh] space-x-2 justify-between p-2 gap-2">
            {/* Left Island */}
            <div className="bg-purple02 w-full md:w-8/12 h-full rounded-lg">
              <div className="flex flex-col h-full p-2">
                <h1 className="text-white text-md font-bold mb-1">
                  Today's Prediction
                </h1>
                <div className="flex w-full flex-1 bg-purple03 rounded-lg p-2 overflow-hidden">
                  <p className="text-white text-base overflow-y-auto no-scrollbar max-h-full">
                    {predictionData &&
                      "prediction" in predictionData &&
                      predictionData.prediction}
                  </p>
                </div>
              </div>
            </div>
            {/* Right Island */}
            <div className="flex flex-col items-start justify-between h-full w-4/12 gap-4">
              <div className="flex flex-col bg-purple02 w-full h-1/2 rounded-lg ">
                <div className="flex flex-col h-full p-2 gap-1">
                  <h1 className="text-white text-md font-bold">Lucky Color</h1>
                  <div className="flex w-full h-full bg-purple03 rounded-lg p-1">
                    <div className="flex flex-row w-full items-center justify-evenly gap-2">
                      {predictionData &&
                        "luckyColors" in predictionData &&
                        predictionData.luckyColors.map((color, index) => (
                          <div
                            key={index}
                            className={`w-5 h-5 rounded-full ${getLuckyColor(
                              color
                            )}`}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-purple02 w-full h-1/2 rounded-lg ">
                <div className="flex flex-col h-full p-2 gap-1">
                  <h1 className="text-white text-md font-bold">Lucky Number</h1>
                  <div className="flex w-full h-full bg-purple03 rounded-lg p-1">
                    <div className="flex flex-row w-full items-center justify-evenly gap-3">
                      {predictionData &&
                        "luckyNumbers" in predictionData &&
                        predictionData.luckyNumbers.map((number, index) => (
                          <p key={index} className="text-white text-[17px]">
                            {number}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full items-center justify-center gap-2">
            <h1 className="text-white text-lg font-normal text-opacity-80">
              Not Available
            </h1>
            <h1 className="text-white text-lg font-normal text-opacity-80">
              Please Login or Enter Prediction Attribute
            </h1>
          </div>
        )}
      </section>

      <section className="w-full min-h-screen bg-background justify-center items-center px-8 pt-6 snap-start">
        <div className="flex flex-col gap-6 pb-4">
          <button
            className="bg-purple04 text-white rounded-xl py-2 justify-center items-center"
            onClick={() => router.push("/browseTeller")}
          >
            <h1 className="text-white text-[14px] font-bold">
              Book New Session
            </h1>
          </button>

          {/* Current Sessions */}
          {currentSessions.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2>Current Session</h2>
              {currentSessions.map((session) => (
                <SessionBox
                  key={session.id}
                  name={session.teller.user.username}
                  date={new Date(session.createdAt).toLocaleDateString()}
                  active={true}
                  sessionId={session.id}
                  sessionStatus={session.sessionStatus}
                  paymentId={session.paymentId}
                  timeSendLastMessage={session.lastChat?.timestamp || ""}
                  lastMessage={session.lastChat?.content || ""}
                  numberUnreadMessage={session.unreadCount}
                  sessionEndAt={session.endedAt}
                />
              ))}
            </div>
          )}

          {/* Pending Sessions */}
          {pendingSessions.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2>Pending Session</h2>
              {pendingSessions.map((session) => (
                <SessionBox
                  key={session.id}
                  name={session.teller.user.username}
                  date={new Date(session.createdAt).toLocaleDateString()}
                  active={false}
                  sessionStatus={session.sessionStatus}
                  sessionId={session.id}
                  paymentId={session.paymentId} // Pass the paymentId
                  onPaymentVerified={fetchSessions} // Callback to refresh sessions
                />
              ))}
            </div>
          )}

          {/* Session History */}
          {sessionHistory.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2>Session History</h2>
              {sessionHistory.map((session) => (
                <SessionBox
                  key={session.id}
                  name={session.teller.user.username}
                  date={new Date(session.createdAt).toLocaleDateString()}
                  active={false}
                  sessionId={session.id}
                  sessionStatus={session.sessionStatus}
                  paymentId={session.paymentId}
                  timeSendLastMessage={session.lastChat?.timestamp || ""}
                  lastMessage={session.lastChat?.content || ""}
                  numberUnreadMessage={session.unreadCount}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
