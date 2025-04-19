import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { MessageSquareCode } from "lucide-react";
import { Clock } from "lucide-react";

interface TellerCardProps {
  tellerId: number;
  imageSrc: string;
  rating: number;
  tellerName: string;
  tags: string[];
  description: string;
  reviews: number;
  waitTime: number;
  price: number;
}

const TellerCardBrowse: React.FC<TellerCardProps> = ({
  tellerId,
  imageSrc,
  rating,
  tellerName,
  tags,
  reviews,
  waitTime,
  price,
}) => {
  const truncatedTellerName =
    tellerName.replace(/\s+/g, "").length > 10
      ? tellerName.slice(0, 10) + "..."
      : tellerName;

  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/tellerinfo/${tellerId}`);
  };

  return (
    <div
      className="relative flex-shrink-0 my-2 w-[91%] rounded-[7px] bg-white01 text-black flex items-center p-3 border border-greyborder font-inter"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="w-[92px] h-[124px] object-cover rounded-[7px] relative overflow-hidden">
        <Image src={imageSrc} alt="Teller" layout="fill" objectFit="cover" />
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between ml-4 mb-2 h-[90%]">
        {/* Name and Price */}
        <div className="flex justify-between items-baseline">
          <div className="text-lg font-medium text-black">
            {truncatedTellerName}
          </div>
          <div className="text-base font-bold text-black">Starts ฿{price}</div>
        </div>

        {/* Tags */}
        <div className="flex-1 space-x-1 my-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-yellow01 rounded-full border border-yellow02 text-[7px] px-1.5 py-0.5 text-yellow03"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center text-[12px]">
          <span className="text-[#FFC13C]">
            {"★".repeat(Math.floor(rating))}
          </span>
          <span className="ml-1 text-base font-medium">{rating}/5</span>
        </div>

        {/* Reviews & Wait Time */}
        <div className="flex items-center text-[9px] mt-1">
          <MessageSquareCode
            size={12}
            className="text-[#2C2D4D] font-extralight mr-2"
          />
          <span className="underline">{reviews} Reviews</span>
        </div>
        <div className="flex items-center text-[9px] mt-1">
          <Clock size={12} className="text-[#2C2D4D] font-extralight mr-2" />
          Expected wait time - {waitTime} minutes
        </div>
      </div>

      {/* Arrow Icon */}
      <div className="absolute top-1/2 right-6 w-[20px] h-[20px] transform -translate-y-1/2">
        <ChevronRight size={37} className="text-[#5D5E7C]" />
      </div>
    </div>
  );
};

export default TellerCardBrowse;
