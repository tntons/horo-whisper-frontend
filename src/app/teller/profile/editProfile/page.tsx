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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/tellers/${tellerId}`);
        const data = await response.json();
        setProfileInfo(data);
      } catch (error) {
        console.error("Error fetching teller profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const allMethods = ["Tarot Card", "Palm Reading", "Astrology", "Others"];
  const allSpecialties = [
    "Love and Relationship",
    "Work and Education",
    "Friends and Family",
    "Health and Well-being",
  ];

  const [selectedMethods, setSelectedMethods] = useState<
    Record<string, boolean>
  >({});
  const [selectedSpecialties, setSelectedSpecialties] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (profileInfo?.specialty) {
      const methodState: Record<string, boolean> = {};
      const specialtyState: Record<string, boolean> = {};

      allMethods.forEach((method) => {
        methodState[method] = profileInfo.specialty.includes(method);
      });

      allSpecialties.forEach((specialty) => {
        specialtyState[specialty] = profileInfo.specialty.includes(specialty);
      });

      setSelectedMethods(methodState);
      setSelectedSpecialties(specialtyState);
    }
  }, [profileInfo?.specialty]);

  const handleCheckboxChange = (name: string, isMethod: boolean) => {
    const updated =
      isMethod && selectedMethods
        ? { ...selectedMethods, [name]: !selectedMethods[name] }
        : { ...selectedSpecialties, [name]: !selectedSpecialties[name] };

    if (isMethod) {
      setSelectedMethods(updated);
    } else {
      setSelectedSpecialties(updated);
    }

    const updatedSpecialty = [
      ...Object.keys({ ...(isMethod ? updated : selectedMethods) }).filter(
        (key) => (isMethod ? updated[key] : selectedMethods[key])
      ),
      ...Object.keys({ ...(!isMethod ? updated : selectedSpecialties) }).filter(
        (key) => (!isMethod ? updated[key] : selectedSpecialties[key])
      ),
    ];

    setProfileInfo((prev) =>
      prev ? { ...prev, specialty: updatedSpecialty } : prev
    );
  };

  const handleSave = async () => {
    try {
      console.log("Updated profile Info:", {
        bio: profileInfo?.bio,
        bankname: profileInfo?.bankName,
        bankAccountNumber: profileInfo?.bankAccountNumber,
        specialty: profileInfo?.specialty,
      });

      const response = await fetch(`/api/tellers/${tellerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: profileInfo?.bio,
          bankName: profileInfo?.bankName,
          bankAccountNumber: profileInfo?.bankAccountNumber,
          specialty: profileInfo?.specialty,
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
            value={profileInfo?.bio || ""}
            onChange={(e) =>
              setProfileInfo((prev) =>
                prev ? { ...prev, bio: e.target.value } : prev
              )
            }
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
            value={profileInfo?.bankName || ""}
            onChange={(e) =>
              setProfileInfo((prev) =>
                prev ? { ...prev, bankName: e.target.value } : prev
              )
            }
          />
        </div>
        <div className="mb-3">
          <label className="block text-[14px] mb-1">Bank Account</label>
          <input
            className="w-full text-[13px] p-3 border border-gray-300 rounded-md"
            value={profileInfo?.bankAccountNumber || ""}
            onChange={(e) =>
              setProfileInfo((prev) =>
                prev ? { ...prev, bankAccountNumber: e.target.value } : prev
              )
            }
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
                  checked={selectedMethods[method] || false}
                  onChange={() => handleCheckboxChange(method, true)}
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
                  checked={selectedSpecialties[specialty] || false}
                  onChange={() => handleCheckboxChange(specialty, false)}
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
