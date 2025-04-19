"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { MessageSquareCode } from "lucide-react";

export default function TellerDetail() {
  const { tellerId } = useParams(); // Get the tellerId from the URL
  const [teller, setTeller] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch teller details
  const fetchTellerDetails = async () => {
    try {
      const response = await fetch(`/api/tellers/${tellerId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch teller details");
      }
      const data = await response.json();
      setTeller(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTellerDetails();
  }, [tellerId]);

  if (isLoading) {
    return <p className="text-center mt-4 text-lg text-blue01">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }

  if (!teller) {
    return <p className="text-center mt-4">No teller details found.</p>;
  }

  const {
    packages,
    reviews,
    tellerName,
    specialty,
    bio,
    traffic,
    totalNumberOfReviews,
  } = teller;

  return (
    <div className="flex flex-col h-full font-inter">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Teller Info Card */}
        <div className="bg-greybackground m-4 rounded-lg p-3 border border-greyborder">
          <div className="flex gap-4">
            <div className="w-24 h-28 bg-gray-200 rounded-lg flex-shrink-0">
              {/* Placeholder for teller image */}
            </div>

            <div className="flex-1">
              <div className="flex justify-between w-full">
                <h2 className="font-normal text-lg mt-2">{tellerName}</h2>
                <p className="text-gray-500 underline">Report</p>
              </div>

              <div className="flex flex-wrap mt-2">
                {specialty.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-yellow01 rounded-full border border-yellow02 text-sm px-2 py-0.5 text-yellow03 my-0.5 mr-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center text-md mt-2">
                <MessageSquareCode
                  size={12}
                  className="text-[#2C2D4D] font-normal mr-2"
                />
                {totalNumberOfReviews} Reviews
              </div>

              <div className="flex items-center text-md">
                <Clock size={12} className="text-[#2C2D4D] font-normal mr-2" />
                Expected wait time - {traffic} minutes
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="mt-4 flex gap-4">
            {/* Left Column - Packages */}
            <div className="w-1/2 ml-4">
              <div className="flex">
                <p className="bg-purple01/30 flex items-center text-md px-2 w-fit rounded-xl border border-black">
                  Packages
                </p>
              </div>

              <div className="flex flex-col mt-2 gap-1">
                {packages
                  .filter((pkg) => pkg.status === "Active")
                  .map((pkg, index) => (
                    <p key={index}>
                      ฿ {pkg.price} / {pkg.questionNumber} questions
                    </p>
                  ))}
              </div>
            </div>

            {/* Dividing Line */}
            <div className="border-l border-dashed border-[#D0D0D0] -ml-4"></div>

            {/* Right Column - Description */}
            <div className="w-1/2 mt-1">
              <p>{bio}</p>
            </div>
          </div>

          {/* Book Button */}
          <div className="flex justify-center mt-4">
            <button
              className="bg-purple04 text-white rounded-xl px-28 py-1 w-[75%] h-[40px] flex items-center justify-center"
              onClick={() => router.push(`/choosepackage/${tellerId}`)}
            >
              <span className="text-[19px] font-normal justify-center">
                Book
              </span>
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mx-4 mb-20 border border-greyborder rounded-t-lg">
          <div className="bg-purple02 text-white px-4 py-2 rounded-t-lg">
            <h1>Reviews</h1>
          </div>

          <div>
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-3 border-b-2 border-greyborder"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#D9D9D9] rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p>{review.customerName}</p>
                      <p className="text-greydate">
                        {new Date(review.reviewAt).toISOString().split("T")[0]}
                      </p>
                    </div>
                    <div className="flex text-[#FFC13C] text-md">
                      {"★ ".repeat(review.rating)}
                    </div>
                  </div>
                </div>

                <h1 className="text-[13px] font-medium mt-2">{review.title}</h1>
                <p className="mt-0.5">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
