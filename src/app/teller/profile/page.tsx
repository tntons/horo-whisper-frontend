"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsPencil } from "react-icons/bs";
import { apiFetch } from "@/lib/api/fetch";
import { signOut } from "next-auth/react";
import { getTellerId } from "@/app/utils/getTellerId";
import { defaultProfilePic } from "@/app/utils/defaultProfilePic";

interface TellerProfile {
  tellerId: number;
  profilePic :string;
  tellerName: string;
  specialty: string[];
  bio: string;
  traffic: number;
  totalNumberOfReviews: number;
  averageRating: number;
  packages: PackageItem[];
  totalAmountFromEndedSessions: number;
  numberOfEndedSessions: number;
}

interface PackageItem {
  id: number;
  tellerId: number;
  packageDetail: string | null;
  questionNumber: number;
  price: number;
  status: "Active" | "Deleted" | "New";
}

export default function TellerProfilePage() {
  const [acceptingCustomers, setAcceptingCustomers] = useState(true);
  const [tellerId, setTellerId] = useState<number | null>(null);
  const router = useRouter();

  const toggleAcceptingCustomers = () => {
    setAcceptingCustomers(!acceptingCustomers);
  };

  const [profileInfo, setProfileInfo] = useState<TellerProfile>();

  useEffect(() => {
    const fetchId = async () => {
      const id = await getTellerId();
      setTellerId(id);
    };

    fetchId();
  }, []);

  useEffect(() => {
    if (!tellerId) return;

    const fetchProfile = async () => {
      try {
        const response = await apiFetch(`/tellers/${tellerId}`);
        const data = await response;
        setProfileInfo(data);
        console.log("profileInfo: ", data);
      } catch (error) {
        console.error("Error fetching teller profile:", error);
      }
    };

    fetchProfile();
  }, [tellerId]);

  const handleLogout = async () => {
    localStorage.removeItem("APP_TOKEN");
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="flex mt-4 w-full h-full bg-[#FEF0E5] font-inter">
      {/* Main content */}
      <div className="w-[90%] mx-auto">
        {/* Accepting customers toggle */}
        <button
          onClick={handleLogout}
          className="self-end mb-4 text-sm text-red-600 hover:underline"
        >
          Logout
        </button>

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
                className={`w-4 h-4 rounded-full transition-all duration-300 ${acceptingCustomers
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
            <div className="w-24 h-24 relative mb-4">
              <Image
                src={profileInfo?.profilePic ? profileInfo.profilePic : defaultProfilePic}
                alt="Teller profile"
                width={92}
                height={124}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold">{profileInfo?.tellerName}</h2>

              <div className="flex flex-wrap">
                {profileInfo?.specialty.map((item, index) => (
                  <span
                    key={index}
                    className="bg-[#FBF6D1] rounded-full border border-[#D4BB2C] text-sm px-2 py-0.5 text-[#534002] my-0.5 mr-1"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-sm mt-2 text-gray-700">{profileInfo?.bio}</p>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              className="flex items-center mt-3 bg-blue01 text-white px-4 py-2 rounded-lg text-lg gap-1"
              onClick={() => router.push("/teller/profile/editProfile")}
            >
              <BsPencil className="mr-1" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Earnings section */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow">
          <div className="flex justify-between items-center mt-1 ml-3">
            <div>
              <h2 className="text-lg font-bold">You've made</h2>
              <div className="text-2xl font-bold">
                ₿{profileInfo?.totalAmountFromEndedSessions}
              </div>
              <p className="text-sm">By advising</p>
              <p className="font-bold">
                {profileInfo?.numberOfEndedSessions} Customers
              </p>
            </div>

            <div className="space-y-0.5 mr-4 flex flex-col items-start justify-start">
              <div className="bg-[#B48FE8] text-md rounded-xl py-0.5 px-2 mb-2 flex justify-center text-center">
                Packages
              </div>
              {profileInfo?.packages
                .filter((item) => item.status === "Active")
                .map((item) => (
                  <div key={item.id}>
                    <p className="text-md text-center">
                      ₿ {item.price} / {item.questionNumber} questions
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              className="flex items-center mt-3 bg-blue01 text-white px-4 py-2 rounded-lg text-lg gap-1"
              onClick={() => router.push("/teller/profile/editPackage")}
            >
              Edit Package
            </button>
          </div>
        </div>

        {/* Reviews section */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow">
          <div className="flex space-y-0.5 justify-between ml-3 items-center">
            <div>
              <div className="font-bold text-lg">
                {profileInfo?.averageRating}/5
              </div>
              <div className="flex text-xl">
                <span className="text-[#FFC13C]">
                  {"★".repeat(Math.floor(profileInfo?.averageRating || 0))}
                </span>
                <span className="text-gray-300">
                  {"★".repeat(5 - Math.floor(profileInfo?.averageRating || 5))}
                </span>
              </div>
              <div className="text-base text-gray-600">
                {profileInfo?.totalNumberOfReviews} Reviews
              </div>
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
