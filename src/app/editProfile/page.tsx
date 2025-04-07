"use client";

import React, { useState } from "react";

export default function EditProfile() {
  const [name, setName] = useState("Thanadon Sigmatikaprakai");
  const [dateOfBirth, setDateOfBirth] = useState("20.12.2004");
  const [timeOfBirth, setTimeOfBirth] = useState("13:38");
  const [whatever, setWhatever] = useState("abcdefg");
  const [something, setSomething] = useState("qwerty");

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({
      name,
      dateOfBirth,
      timeOfBirth,
      whatever,
      something,
    });
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#FEF0E5] px-4 py-6">
      {/* Edit Profile Section */}
      <div className="w-[75%] mt-4">
        <h2 className="text-xl font-bold text-[#171717] mb-4">Edit Profile</h2>
        <div className="flex flex-col text-[14px] gap-2">
          <div>
            <label className="block mb-1 font-normal text-[#171717]">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex justify-between text-[14px] gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-normal text-[#171717]">
                Date of Birth
              </label>
              <input
                type="text"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-[14px] font-normal text-[#171717]">
                Time of Birth
              </label>
              <input
                type="text"
                value={timeOfBirth}
                onChange={(e) => setTimeOfBirth(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Prediction Attributes Section */}
      <div className="w-[75%] mt-10">
        <h2 className="text-xl font-bold text-[#171717] mb-4">
          Edit Prediction Attributes
        </h2>
        <div className="flex flex-col text-[14px] gap-2">
          <div>
            <label className="block mb-1  font-normal text-[#171717]">
              Whatever
            </label>
            <input
              type="text"
              value={whatever}
              onChange={(e) => setWhatever(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-normal text-[#171717]">
              Something
            </label>
            <input
              type="text"
              value={something}
              onChange={(e) => setSomething(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Done Button */}
      <button
        onClick={handleSubmit}
        className="mt-14 w-[60%] h-[46px] bg-blue01 text-white text-[18px] font-normal py-3 rounded-lg flex items-center justify-center"
      >
        Done
      </button>
    </div>
  );
}
