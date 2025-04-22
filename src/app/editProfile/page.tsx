"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api/fetch";
import { getCustomerId } from "@/app/utils/getCustomer";

interface User {
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

interface Prediction {
  customerId: number;
  birthTime: string;
  birthPlace: string;
  relationship: string;
}

export default function EditProfile() {
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [user, setUser] = useState<User>({
    username: "",
    firstName: "",
    lastName: "",
    birthDate: "",
  });
  const [prediction, setPrediction] = useState<Prediction>({
    customerId: 0,
    birthTime: "",
    birthPlace: "",
    relationship: "",
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      try {
        const id = await getCustomerId();
        setCustomerId(id);

        const res = await apiFetch(`/customers/id/${id}`);
        setUser({
          username: res.user.username ?? "",
          firstName: res.user.firstName ?? "",
          lastName: res.user.lastName ?? "",
          birthDate: res.user.birthDate ? res.user.birthDate.split("T")[0] : "",
        });
        if (res.prediction) {
          setPrediction({
            customerId: res.prediction.customerId ?? id,
            birthTime: res.prediction.birthTime ?? "",
            birthPlace: res.prediction.birthPlace ?? "",
            relationship: res.prediction.relationship ?? "",
          });
        } else {
          setPrediction({ ...prediction, customerId: id });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      }
    }

    loadProfile();
  }, []);

  const handleSubmit = async () => {
    if (!customerId) return;
    setLoadingSubmit(true);
    try {
      const body = JSON.stringify({
        user: user,
        prediction: prediction,
      });
      console.log("req body: ", body);

      await apiFetch(`/customers/id/${customerId}`, {
        method: "PATCH",
        body: body,
      });

      toast.success("You've successfully updated your profile!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "custom-toast",
      });
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("APP_TOKEN");
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="flex flex-col overflow-y-auto no-scrollbar items-center w-full h-full bg-[#FEF0E5] px-4 py-6">
      <ToastContainer />

      <button
        onClick={handleLogout}
        className="self-end  px-3 py-2 text-[11px] font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
      >
        Logout
      </button>

      {/* Edit Profile Section */}
      <div className="w-[75%] mt-2">
        <h2 className="text-xl font-bold text-[#171717] mb-4">Edit Profile</h2>
        <div className="flex flex-col text-[14px] gap-2">
          <label className="block mb-1 font-normal text-[#171717]">
            User Name
          </label>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <label className="block mb-1 font-normal text-[#171717]">
            First Name
          </label>
          <input
            type="text"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <label className="block mb-1 font-normal text-[#171717]">
            Last Name
          </label>
          <input
            type="text"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="w-[75%] mt-6">
        <h2 className="text-xl font-bold text-[#171717] mb-4">
          Edit Prediction Attributes
        </h2>
        <div className="flex flex-col text-[14px] gap-2">
          <label className="block mb-1 font-normal text-[#171717]">
            Date of Birth
          </label>
          <input
            type="date"
            value={user.birthDate ?? ""}
            onChange={(e) => setUser({ ...user, birthDate: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <label className="block mb-1 font-normal text-[#171717]">
            Time of Birth
          </label>
          <input
            type="time"
            value={prediction.birthTime}
            onChange={(e) =>
              setPrediction({ ...prediction, birthTime: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <label className="block mb-1 font-normal text-[#171717]">
            Birth Place
          </label>
          <input
            type="text"
            value={prediction.birthPlace}
            onChange={(e) =>
              setPrediction({ ...prediction, birthPlace: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <label className="block mb-1 font-normal text-[#171717]">
            Relationship
          </label>
          <input
            type="text"
            value={prediction.relationship}
            onChange={(e) =>
              setPrediction({ ...prediction, relationship: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loadingSubmit}
        className="mt-14 w-[60%] h-[46px] bg-blue01 text-white text-[18px] font-normal py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
      >
        {loadingSubmit ? "Updating..." : "Done"}
      </button>
    </div>
  );
}
