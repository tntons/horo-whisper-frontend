"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

interface TellerProfile {
  tellerId: number;
  tellerName: string;
  specialty: string[];
  bio: string;
  profilePic: string;
  bankName: string;
  bankAccountNumber: string;
}

export default function EditProfilePage() {
  const tellerId = 1; // Replace with actual teller ID later
  const [profileInfo, setProfileInfo] = useState<TellerProfile>();

  const [bio, setBio] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/tellers/${tellerId}`);
        const data = await response.json();
        setProfileInfo(data);

        setBio(data.bio || "");
        setBankName(data.bankName || "");
        setBankAccount(data.bankAccountNumber || "");
      } catch (error) {
        console.error("Error fetching teller profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleBioChange = (newBio: string) => {
    setBio(newBio);
    setProfileInfo((prev) => ({
      ...prev!,
      bio: newBio,
    }));
  };

  const handleBankNameChange = (newBank: string) => {
    setBankName(newBank);
    setProfileInfo((prev) => ({
      ...prev!,
      bankName: newBank,
    }));
  };

  const handleBankAccountChange = (newBankAcc: string) => {
    setBankAccount(newBankAcc);
    setProfileInfo((prev) => ({
      ...prev!,
      bankAccountNumber: newBankAcc,
    }));
  };

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

  const handleMethodChange = (method: string) => {
    setSelectedMethods({
      ...selectedMethods,
      [method]: !selectedMethods[method],
    });
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties({
      ...selectedSpecialties,
      [specialty]: !selectedSpecialties[specialty],
    });
  };

  const handleSave = async () => {
    try {
      console.log("Saving profile data:", {
        bio,
        bankName,
        bankAccount,
        methods: Object.keys(selectedMethods).filter(
          (key) => selectedMethods[key]
        ),
        specialties: Object.keys(selectedSpecialties).filter(
          (key) => selectedSpecialties[key]
        ),
      });

      console.log("Temp updated profile Info:", {
        bio,
        bankName,
        bankAccount,
      });

      const response = await fetch(`/api/tellers/${tellerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio,
          bankName,
          bankAccountNumber: bankAccount,
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      toast.success("You've successfully made the change!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "custom-toast",
      });
    } catch (error) {
      console.error("Error saving packages:", error);
    }
  };

  return (
    <div className="h-full w-full mt-4 bg-[#FEF0E5] font-inter">
      <ToastContainer />
      {/* Content */}
      <div className="p-4 mx-4 mt-4">
        <h2 className="text-xl font-bold mb-3">Edit Profile</h2>

        {/* Bio Section */}
        <div className="mb-3">
          <label className="block text-[14px] mb-1">Brief Introduction</label>
          <textarea
            className="w-full text-[13px] p-3 border border-gray-300 rounded-md"
            rows={5}
            value={bio}
            onChange={(e) => handleBioChange(e.target.value)}
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-3">
          <label className="block text-[14px] mb-1">Choose your pic</label>
          <button className="bg-[#9C9C9C] text-white font-light py-2 px-5 rounded-full">
            Choose File
          </button>
        </div>

        {/* Bank Section */}
        <div className="mb-3">
          <label className="block text-[14px] mb-1">Bank Name</label>
          <input
            className="w-full text-[13px] p-3 border border-gray-300 rounded-md"
            value={bankName}
            onChange={(e) => handleBankNameChange(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block text-[14px] mb-1">Bank Account</label>
          <input
            className="w-full text-[13px] p-3 border border-gray-300 rounded-md"
            value={bankAccount}
            onChange={(e) => handleBankAccountChange(e.target.value)}
          />
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
            className="bg-[#1F2359] text-white text-xl py-2 px-24 rounded-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
