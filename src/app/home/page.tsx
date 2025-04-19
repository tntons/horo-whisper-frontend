"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SessionBox from "@/app/home/SessionBox";
import { getLuckyColor } from "./GetLuckyColor";

interface Session {
  id: number;
  customerId: number;
  tellerId: number;
  createdAt: string;
  endedAt: string | null;
  sessionStatus: string;
  paymentId: number;
  teller: {
    user: {
      username: string;
    };
  };
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
  const [predictionData, setPredictionData] = useState<Prediction | ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const customerId = 1; // Replace with actual customer ID

  const fetchSessions = async () => {
    try {
      const response = await fetch(`/api/customers/sessions/${customerId}`); // Replace 1 with the actual customerId
      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }
      const data = await response.json();
      setSessions(data.data); // Set the fetched sessions
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };
  const fetchPrediction = async () => {
    try {
      const response = await fetch(`/api/customers/daily-prediction/${customerId}`);

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to fetch prediction");
      }
      const data = await response.json();

      setPredictionData(data.data);
      setIsLoading(false);

    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  }

  useEffect(() => {
    fetchPrediction();
    fetchSessions();

  }, []);
  console.log(predictionData);

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

  const getLuckyColorClass = (color: string): string => {
    switch (color.toLowerCase()) {
      case 'blue':
        return 'bg-luckyblue';
      case 'pink':
        return 'bg-luckypink';
      case 'white':
        return 'bg-luckywhite';
      // Add more color mappings as needed
      default:
        return 'bg-purple03'; // fallback color
    }
  };

  return (
    <div className="h-screen w-full overflow-y-scroll no-scrollbar font-inter">
      <section className="w-full h-[30vh] bg-gradient-to-b from-[#090C6C] via-[#575ABA] via-70% to-[#575ABA] py-4 px-4">
        <div className="flex items-center justify-center">
          <h1 className="text-white text-lg font-bold">
            Your Daily Horoscope
          </h1>
        </div>

        {isLoading ?(
          <div></div>
        ): predictionData ? (
          <div className="flex flex-row w-full h-full items-center justify-between p-4 gap-3">
            {/* Left Island */}
            <div className="bg-purple02 w-8/12 h-full rounded-lg ">
              <div className='flex flex-col h-full p-2 gap-1'>
                <h1 className="text-white text-[11px] font-bold">
                  Today's Prediction
                </h1>
                <div className="flex w-full h-full bg-purple03 rounded-lg p-2">
                  <p className="text-white text-[9px] font-thin text-opacity-80">
                    {predictionData && "prediction" in predictionData && predictionData.prediction}
                  </p>
                </div>
              </div>
            </div>
            {/* Right Island */}
            <div className="flex flex-col w-4/12 h-full gap-3">

              <div className="flex flex-col bg-purple02 w-full h-1/2 rounded-lg ">
                <div className='flex flex-col h-full p-2 gap-1'>
                  <h1 className="text-white text-[11px] font-bold">
                    Lucky Color
                  </h1>
                  <div className="flex w-full h-full bg-purple03 rounded-lg p-1">
                    <div className="flex flex-row w-full items-center justify-evenly gap-1">
                      {predictionData && 'luckyColors' in predictionData &&
                        predictionData.luckyColors.map((color, index) => (
                          <div
                            key={index}
                            className={`w-5 h-5 rounded-full ${getLuckyColor(color)}`}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-purple02 w-full h-1/2 rounded-lg ">
                <div className='flex flex-col h-full p-2 gap-1'>
                  <h1 className="text-white text-[11px] font-bold">
                    Lucky Number
                  </h1>
                  <div className="flex w-full h-full bg-purple03 rounded-lg p-1">
                    <div className="flex flex-row w-full items-center justify-evenly gap-2">
                      {predictionData && 'luckyNumbers' in predictionData &&
                        predictionData.luckyNumbers.map((number, index) => (
                          <p key={index} className="text-white text-[17px]">
                            {number}
                          </p>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) :
          <div className="flex flex-col w-full h-full items-center justify-center gap-2">

            <h1 className="text-white text-lg font-normal text-opacity-80">
              Not Available
            </h1>
            <h1 className="text-white text-lg font-normal text-opacity-80">
              Please Login or Enter Prediction Attribute
            </h1>

          </div>
        }
      </section>

      <section className="w-full h-screen bg-background justify-center items-center px-8 pt-6">
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
                  sessionStatus={session.sessionStatus}
                  paymentId={session.paymentId}
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
                  sessionStatus={session.sessionStatus}
                  paymentId={session.paymentId}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
