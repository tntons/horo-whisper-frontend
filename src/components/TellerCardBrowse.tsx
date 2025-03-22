import React from "react";
import Image from "next/image";

interface TellerCardProps {
  imageSrc: string;
  rating: number;
  tellerName: string;
  tags: string[];
  description: string;
  reviews: number;
  waitTime: number;
  price: number;
  questions: number;
}

const TellerCardBrowse: React.FC<TellerCardProps> = ({
  imageSrc,
  rating,
  tellerName,
  tags,
  description,
  reviews,
  waitTime,
  price,
  questions,
}) => {
  return (
    <div className="relative m-2 w-[90%] h-[146px] rounded-[7px] bg-white01 text-black flex items-center p-3 border border-greyborder">
      {/* Image Section */}
      <div className="w-[35%] h-full object-cover rounded-[7px] relative overflow-hidden">
        <Image src={imageSrc} alt="Teller" layout="fill" objectFit="cover" />

        {/* Rating Badge */}
        <div className="absolute bottom-0 right-0 bg-purple01 text-white text-sm font-bold px-2 py-1">
          {rating}
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between ml-4 h-full">
        <div className="text-lg">{tellerName}</div>

        {/* Tags */}
        <div className="flex space-x-2 my-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-pink01 text-pink03 flex items-center border border-pink02 text-xs px-2 py-1 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-xs line-clamp-2">{description}</p>

        {/* Reviews & Wait Time */}
        <div className="flex items-center text-sm mt-1">
          📖 <span className="ml-1 underline">{reviews} Reviews</span>
        </div>
        <div className="flex items-center text-sm mt-1">
          ⏳ Expected wait time - {waitTime} minutes
        </div>

        {/* Pricing */}
        <p className="text-base mt-1">
          From ฿{price} / {questions} questions
        </p>
      </div>

      {/* Arrow Icon */}
      <div className="absolute top-3 right-2 w-[20px] h-[20px]">
        <Image src="/arrow.png" alt="next arrow" width={20} height={20} />
      </div>
    </div>
  );
};

export default TellerCardBrowse;
