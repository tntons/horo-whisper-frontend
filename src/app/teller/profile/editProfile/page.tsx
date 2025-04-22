"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { apiFetch } from "@/lib/api/fetch";
import { getTellerId } from "@/app/utils/getTellerId";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { defaultProfilePic } from "@/app/utils/defaultProfilePic";

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
  const [profileInfo, setProfileInfo] = useState<TellerProfile>();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tellerId = await getTellerId();
        const response = await apiFetch(`/tellers/${tellerId}`);
        const data = await response;
        setProfileInfo(data);
      } catch (error) {
        console.error("Error fetching teller profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Create a unique filename
      const uniqueFileName = `profile_${v4()}_${file.name}`;
      const imageRef = ref(storage, `image/${uniqueFileName}`);
      
      // Upload the file
      await uploadBytes(imageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(imageRef);
      
      // Update profile info with new image URL
      setProfileInfo(prev => prev ? { ...prev, profilePic: downloadURL } : prev);
      
      toast.success("Profile picture uploaded successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Failed to upload profile picture", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } finally {
      setIsUploading(false);
    }
  };

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
        profilePic: profileInfo?.profilePic
      });
      const tellerId = await getTellerId();
      console.log("tellerId: ", tellerId);

      const response = await apiFetch(`/tellers/${tellerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: profileInfo?.bio,
          bankName: profileInfo?.bankName,
          bankAccountNumber: profileInfo?.bankAccountNumber,
          specialty: profileInfo?.specialty,
          profilePic: profileInfo?.profilePic,
        }),
      });
      console.log("Response:", response);

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
      console.error("Error saving profile:", error);
      toast.error("Failed to update profile", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="h-full w-full mt-4 bg-[#FEF0E5] font-inter">
      <ToastContainer />
      {/* Content */}
      <div className="p-4 mx-4 mt-4">
        <h2 className="text-xl font-bold text-center mb-6">Edit Profile</h2>

        {/* Profile Picture Section */}
        <div className="mb-6">
          <label className="block text-[14px] mb-3">Profile Picture</label>
          <div className="flex flex-col items-center gap-4">
            <div 
              onClick={handleImageClick}
              className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            >
                <Image
                  src={profileInfo?.profilePic ? profileInfo.profilePic : defaultProfilePic}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    // If the image fails to load, fall back to the default image
                    const target = e.target as HTMLImageElement;
                    target.src = defaultProfilePic;
                  }}
                  priority
                />

              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="loading-spinner"></div>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button 
              onClick={handleImageClick}
              className="bg-[#1F2359] text-white text-md py-2 px-4 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Change Profile Image
            </button>
          </div>
        </div>

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

        {/* Bank Section */}
        <div className="space-y-4 mb-6">
          <div>
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
          <div>
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

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSave}
            className="bg-[#1F2359] text-white text-xl py-2 px-24 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Done
          </button>
        </div>
      </div>

      <style jsx>{`
        .loading-spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 3px solid white;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
