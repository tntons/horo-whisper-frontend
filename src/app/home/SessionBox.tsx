import Image from "next/image";
import { GrNext } from "react-icons/gr";
import React from "react";
import { useRouter } from "next/navigation";
import { formatTime, timeAgo } from "../utils/date";

interface SessionBoxProps {
  name: string;
  date: string;
  active: boolean;
  sessionStatus: string;
  paymentId: number;
  sessionId: number;
  lastMessage?: string;
  timeSendLastMessage?: string;
  numberUnreadMessage?: number;
  onPaymentVerified?: () => void;
  sessionEndAt?: string;
}

const SessionBox = ({
  name,
  date,
  active,
  sessionStatus,
  paymentId,
  sessionId,
  lastMessage,
  timeSendLastMessage,
  numberUnreadMessage,
  sessionEndAt,
  onPaymentVerified,
}: SessionBoxProps) => {
  let statusMessage = "";
  let statusColor = "";
  let isClickable = false;
  let showDate = true;
  let showActiveStatus = true;
  let showReviewBadge = true;

  switch (sessionStatus) {
    case "Pending":
      statusMessage = "Waiting for confirmation\n ";
      showDate = false;
      showActiveStatus = false;
      showReviewBadge = false;
      break;
    case "Processing":
      statusMessage = "Booking confirmed!\nMake payment now";
      statusColor = "text-[#2CA600] underline font-bold";
      isClickable = true;
      showDate = false;
      showActiveStatus = false;
      showReviewBadge = false;
      break;

    case 'Active':
      statusMessage = timeSendLastMessage
        ? `Last reply ${timeAgo(timeSendLastMessage)}`
        : 'Last reply —'
      break

    case 'Ended':
      statusMessage = sessionEndAt
        ? `Session ended ${timeAgo(sessionEndAt)}`
        : 'Session ended —'
      break
      
    case "Declined":
      statusMessage = "Session declined";
      showActiveStatus = false;
      showReviewBadge = false;
      break;
    default:
      statusMessage = "Unknown status";
      break;
  }

  const router = useRouter();
  const handleVerifyPayment = () => {
    router.push(`/payment/${paymentId}`);
  }

  return (
    <div className="flex flex-row items-center justify-between w-full h-[11vp] bg-greybackground rounded-lg border border-greyborder p-3"
      onClick={(active) ? () => router.push(`/chat?sessionId=${sessionId}&&usertype=customer`) : undefined}
    >
      {/* Left Column - Image */}
      <div className="relative w-[45px] h-full bg-gray-300 rounded-lg flex-shrink-0 overflow-hidden">
        <Image
          src="/teller00.png"
          width={45}
          height={45}
          alt="Teller profile"
          className="object-cover"
        />
        {showReviewBadge && !active && (
          <div className="absolute -bottom-0.5 bg-[#DED3F6] py-0.5 flex justify-center items-center w-full">
            <span className="text-[#5E5F8C] text-sm -mt-0.5">Review</span>
          </div>
        )}
      </div>

      {/* Middle Column - Details */}
      <div className="flex flex-col flex-grow mx-3 justify-start">
        <h2 className="text-md font-bold leading-tight">{name}</h2>
        {showDate && <p className="text-md text-gray-500">{lastMessage}</p>}

        <div className="flex flex-row items-center gap-1 mt-1">
          {showActiveStatus && (
            <div
              className={`w-2.5 h-2.5 ${
                active ? "bg-[#75EB79]" : "bg-[#9F9F9F]"
              } rounded-full`}
            ></div>
          )}
          <p
            className={`text-md ${statusColor}`}
            onClick={() => {
              if (isClickable) {
                console.log("Redirect to payment page");
                handleVerifyPayment();
              }
            }}
          >
            {statusMessage.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

      {/* Right Column - Next Icon*/}
      <div className="flex flex-col items-end gap-1">
        {numberUnreadMessage && numberUnreadMessage > 0 ? (
              <>
                <p className="mr-0.5">{formatTime(timeSendLastMessage)}</p>
                <div className="flex items-center justify-center w-7 h-7 bg-purple04 rounded-full">
                    <span className="text-md text-white">{numberUnreadMessage}</span>
                  </div>
              </>
          ) : timeSendLastMessage ? (
              // no unread but has a time
              <>
                <p className="mr-0.5">{formatTime(timeSendLastMessage)}</p>
                <div className="flex items-center justify-center w-7 h-7 rounded-full">
                </div>
              </>
            ) : (
            // neither unread nor time: show next arrow
            <GrNext className="fill-purple04" size={24} />
          )}
      </div>
    </div>
  );
};

export default SessionBox;
