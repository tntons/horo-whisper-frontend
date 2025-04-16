"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SessionBox from "@/app/home/SessionBox";

interface Session {
  id: number;
  customerId: number;
  tellerId: number;
  createdAt: string;
  endedAt: string | null;
  sessionStatus: string;
  teller: {
    user: {
      username: string;
    };
  };
}

export default function Home() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);

  const fetchSessions = async () => {
    try {
      const customerId = 1; // Replace with actual customer ID
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

  useEffect(() => {
    fetchSessions();
  }, []);

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
    <div className="h-screen w-full overflow-y-scroll no-scrollbar font-inter">
      <section className="w-full h-[30vh] bg-gradient-to-b from-[#090C6C] via-[#575ABA] via-100% to-[#575ABA] ">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-white text-lg mt-4 font-bold">
            Your Daily Horoscope
          </h1>
        </div>
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
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
