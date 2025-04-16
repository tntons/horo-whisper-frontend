import Image from "next/image";
import { GrNext } from "react-icons/gr";

interface SessionBoxProps {
  name: string;
  date: string;
  active: boolean;
  sessionStatus: string;
}

const SessionBox = ({ name, date, active, sessionStatus }: SessionBoxProps) => {
  let statusMessage = "";
  let statusColor = "";
  let isClickable = false;
  let showDate = true;
  let showActiveStatus = true;
  let showReviewBadge = true;

  switch (sessionStatus) {
    case "Pending":
      statusMessage = "Waiting for confirmation";
      showDate = false;
      showActiveStatus = false;
      showReviewBadge = false;
      break;
    case "Processing":
      statusMessage = "Booking confirmed! Make payment now";
      statusColor = "text-[#2CA600] underline";
      isClickable = true;
      showDate = false;
      showActiveStatus = false;
      showReviewBadge = false;
      break;
    case "Active":
      statusMessage = "Last reply: 2 hours ago"; // Fix later when the chat is completed
      break;
    case "Ended":
      statusMessage = "Session ended 2 hours ago"; //Fix with endedDate
      break;
    case "Declined":
      statusMessage = "Session declined";
      showDate = false;
      showActiveStatus = false;
      showReviewBadge = false;
      break;
    default:
      statusMessage = "Unknown status";
      break;
  }

  return (
    <div className="flex flex-row items-center justify-between w-full h-[11vp] bg-greybackground rounded-lg border border-greyborder p-3">
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
      <div className="flex flex-col flex-grow mx-3 justify-center">
        <h2 className="text-md font-bold">{name}</h2>
        {showDate && <p className="text-md">{date}</p>}

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
                // Handle payment click here
                console.log("Redirect to payment page");
              }
            }}
          >
            {statusMessage}
          </p>
        </div>
      </div>

      {/* Right Column - Next Icon*/}
      <GrNext className="fill-purple04" size={24} />
    </div>
  );
};

export default SessionBox;
