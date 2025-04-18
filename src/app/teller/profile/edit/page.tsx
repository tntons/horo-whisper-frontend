"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoChevronBack } from "react-icons/io5";

export default function EditProfilePage() {
  const router = useRouter();
  const [bio, setBio] = useState(
    "I have been practicing tarot for over 20 years and graduated from a well-known institution specializing in spiritual and intuitive arts. My passion lies in helping people find clarity in love and relationship"
  );

  const [selectedMethods, setSelectedMethods] = useState({
    "Tarot Card": true,
    "Palm Reading": false,
    Astrology: false,
    Others: false,
  });

  const [selectedSpecialties, setSelectedSpecialties] = useState({
    "Love and Relationship": true,
    "Work and Education": false,
    "Friends and Family": false,
    "Health and Well-being": false,
  });

  const handleMethodChange = (method) => {
    setSelectedMethods({
      ...selectedMethods,
      [method]: !selectedMethods[method],
    });
  };

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialties({
      ...selectedSpecialties,
      [specialty]: !selectedSpecialties[specialty],
    });
  };

  const handleSave = () => {
    // Save profile data (would connect to API in real implementation)
    console.log("Saving profile data:", {
      bio,
      methods: Object.keys(selectedMethods).filter(
        (key) => selectedMethods[key]
      ),
      specialties: Object.keys(selectedSpecialties).filter(
        (key) => selectedSpecialties[key]
      ),
    });

    // Navigate back to profile page
    router.back();
  };

  return (
    <div className="h-full w-full mt-4 bg-[#FEF0E5] font-inter">
      {/* Content */}
      <div className="p-4 bg-[#FEF2E9] rounded-lg mx-4 mt-4">
        <h2 className="text-xl font-bold mb-2">Edit Profile</h2>

        {/* Bio Section */}
        <div className="mb-3">
          <label className="block text-[14px] mb-1">Brief Introduction</label>
          <textarea
            className="w-full text-[13px] p-3 border border-gray-300 rounded-md"
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-6">
          <label className="block text-[14px] mb-1">Choose your pic</label>
          <button className="bg-[#9C9C9C] text-white font-light py-2 px-5 rounded-full">
            Choose File
          </button>
        </div>

        {/* Reading Methods */}
        <div className="mb-6 text-[14px]">
          <label className="block mb-2">Which method do you use?</label>
          <div className="space-y-2">
            {Object.keys(selectedMethods).map((method) => (
              <div key={method} className="flex items-center">
                <input
                  type="checkbox"
                  id={`method-${method}`}
                  checked={selectedMethods[method]}
                  onChange={() => handleMethodChange(method)}
                  className="w-4 h-4"
                />
                <label htmlFor={`method-${method}`} className="ml-2">
                  {method}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-6 text-[14px]">
          <label className="block mb-2">What do you specialize in?</label>
          <div className="space-y-2">
            {Object.keys(selectedSpecialties).map((specialty) => (
              <div key={specialty} className="flex items-center">
                <input
                  type="checkbox"
                  id={`specialty-${specialty}`}
                  checked={selectedSpecialties[specialty]}
                  onChange={() => handleSpecialtyChange(specialty)}
                  className="w-4 h-4"
                />
                <label htmlFor={`specialty-${specialty}`} className="ml-2">
                  {specialty}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Done Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="bg-[#1F2359] text-white text-xl py-2 px-20 rounded-lg font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
