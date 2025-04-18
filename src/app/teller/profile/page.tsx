"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";

export default function TellerProfilePage() {
  const [acceptingCustomers, setAcceptingCustomers] = useState(true);

  const toggleAcceptingCustomers = () => {
    setAcceptingCustomers(!acceptingCustomers);
  };

  return (
    <div className="flex items-center w-full h-full bg-[#FEF0E5] font-inter">
      {/* Main content */}
      <div className="w-[90%] mx-auto mt-10">
        {/* Accepting customers toggle */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow">
          <div className="flex justify-between items-center ml-2 mr-4">
            <p className="font-bold text-lg">
              You are accepting
              <br />
              new customers
            </p>
            <div
              className="w-12 h-6 bg-gray-200 rounded-full p-1 flex items-center cursor-pointer"
              onClick={toggleAcceptingCustomers}
            >
              <div
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  acceptingCustomers
                    ? "bg-indigo-900 transform translate-x-6"
                    : "bg-gray-400"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Profile section */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow">
          <div className="flex gap-4">
            <div className="w-24 h-24 relative">
              <Image
                src="/default-profile.png"
                alt="Teller profile"
                width={92}
                height={124}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold">Golf the teller</h2>

              <div className="mt-1 flex">
                <span className="bg-yellow-100 text-sm px-2 py-0.5 rounded-md text-yellow-800 mr-2">
                  Tarot Reading
                </span>
                <span className="bg-yellow-100 text-sm px-2 py-0.5 rounded-md text-yellow-800">
                  Love and relationship
                </span>
              </div>

              <p className="text-sm mt-2 text-gray-700">
                "I have been practicing tarot for over 20 years and graduated
                from a well-known institution specializing in spiritual and
                intuitive arts. My passion lies in helping people find clarity
                in love and relationships"
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button className="flex items-center mt-3 bg-blue01 text-white px-4 py-2 rounded-lg text-lg gap-1">
              <BsPencil className="mr-1" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Earnings section */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow">
          <div className="flex justify-between items-center ml-3">
            <div>
              <h2 className="text-lg font-bold">You've made</h2>
              <div className="text-2xl font-bold">₿10,000</div>
              <p className="text-sm">By advising</p>
              <p className="font-bold">198 Customers</p>
            </div>

            <div className="space-y-0.5 mr-4 flex flex-col items-start justify-start">
              <div className="bg-[#B48FE8] text-md rounded-xl py-0.5 px-2 mb-2 flex justify-center text-center">
                Packages
              </div>
              <p className="text-md text-center">₿ 200 / 3 questions</p>
              <p className="text-md text-center">₿ 300 / 5 questions</p>
              <p className="text-md text-center">₿ 500 / 10 questions</p>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button className="flex items-center mt-3 bg-blue01 text-white px-4 py-2 rounded-lg text-lg gap-1">
              Edit Package
            </button>
          </div>
        </div>

        {/* Reviews section */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow">
          <div className="flex space-y-0.5 justify-between ml-3 items-center">
            <div>
              <div className="font-bold text-lg">4.8/5</div>
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar className="text-gray-300" />
              </div>
              <div className="text-base text-gray-600">26 Reviews</div>
            </div>

            <button className="bg-[#727272] text-white text-lg px-4 py-2 mr-2 rounded-lg">
              See Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
