import React from "react";
import Image from "next/image";

const TellerCardBrowse: React.FC = () => {
  return (
    <div className="relative m-2 w-[90%] h-[146px] rounded-[7px] bg-white01 text-black flex items-center p-3 border border-greyborder">
      <div className="w-[35%] h-full object-cover rounded-[7px] relative overflow-hidden">
        <Image
          src="/teller00.png"
          alt="Teller"
          layout="fill"
          objectFit="cover"
        />

        {/* Rating Badge */}
        <div className="absolute bottom-0 right-0 bg-purple01 text-white text-sm font-bold px-2 py-1">
          4.8
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between ml-4 h-full">
        <div className="text-lg">Golf the Teller</div>

        {/* Tags */}
        <div className="flex space-x-2 my-1">
          <span className="bg-yellow01 text-yellow03 flex items-center border border-yellow02 text-xs px-2 py-1 rounded-lg">
            Tarot Reading
          </span>
          <span className="bg-pink01 text-pink03 flex items-center border border-pink02 text-xs px-2 py-1 rounded-lg">
            Love and relationship
          </span>
        </div>

        {/* Description */}
        <p className="text-xs line-clamp-2">
          “I have been practicing tarot for over 20 years and graduated from a
          well-known institution....”
        </p>

        {/* Reviews & Wait Time */}
        <div className="flex items-center text-sm mt-1">
          📖 <span className="ml-1 underline">28 Reviews</span>
        </div>
        <div className="flex items-center text-sm mt-1">
          ⏳ Expected wait time - 3 minutes
        </div>

        {/* Pricing */}
        <p className="text-base mt-1">From ฿200 / 3 questions</p>
      </div>

      {/* Arrow Icon */}
      <div className="absolute top-3 right-2 w-[20px] h-[20px]">
        <Image src="/arrow.png" alt="next arrow" width={20} height={20} />
      </div>
    </div>
  );
};

export default TellerCardBrowse;
