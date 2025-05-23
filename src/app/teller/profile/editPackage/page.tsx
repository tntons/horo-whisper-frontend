"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Minus } from "lucide-react";
import { apiFetch } from "@/lib/api/fetch";
import { getTellerId } from "@/app/utils/getTellerId";

interface PackageItem {
  id: number;
  tellerId: number;
  packageDetail: string | null;
  questionNumber: number;
  price: number;
  status: "Active" | "Deleted" | "New";
}

export default function EditPackagePage() {
  const [packageInfo, setPackageInfo] = useState<PackageItem[]>([]);
  const [tellerId, setTellerId] = useState<number>(0);

  useEffect(() => {
    const fetchId = async () => {
      const id = await getTellerId();
      setTellerId(id);
    };

    fetchId();
  }, []);

  useEffect(() => {
    if (tellerId === 0) console.log("Teller ID is not set yet.");

    const fetchPackage = async () => {
      try {
        console.log("tellerId: ", tellerId);
        const response = await apiFetch(`/tellers/${tellerId}/teller-package`);
        const data = await response.data;
        setPackageInfo(data);
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };

    fetchPackage();
  }, [tellerId]);

  console.log("packageInfo: ", packageInfo);

  const addPackageItem = () => {
    const newItem: PackageItem = {
      id: Date.now(), // temporary ID for UI only
      tellerId,
      packageDetail: null,
      questionNumber: 0,
      price: 0,
      status: "New",
    };
    setPackageInfo((prev) => [...prev, newItem]);
  };

  const updatePackageItem = (
    id: number,
    key: keyof PackageItem,
    value: number | string | null
  ) => {
    setPackageInfo((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const removePackageItem = (id: number) => {
    setPackageInfo(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === id) {
              if (item.status === "New") {
                return null; // remove from UI
              }
              return { ...item, status: "Deleted" };
            }
            return item;
          })
          .filter(Boolean) as PackageItem[]
    );
  };

  const handleDone = async () => {
    try {
      console.log("Packages submitted:", packageInfo);

      const response = await apiFetch(`/tellers/${tellerId}/teller-package`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packages: packageInfo }),
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
      console.error("Error saving packages:", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col ml-2 mt-4 bg-[#FEF0E5] font-inter">
      <ToastContainer />
      <div className="p-4 mx-4 mt-4 justify-start items-start">
        <h2 className="text-xl font-bold mb-3">Edit Package</h2>

        <div className="mb-3 text-[14px] text-black">Package offerings</div>

        <div className="space-y-3 text-[14px]">
          {packageInfo
            .filter((item) => item.status !== "Deleted")
            .map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2 ">
                <div className="w-6 text-black">{index + 1}.</div>

                {item.status === "New" ? (
                  <>
                    <input
                      type="number"
                      value={item.questionNumber}
                      className="bg-white border border-gray-300 rounded px-2 py-1 w-12 h-8"
                      onChange={(e) =>
                        updatePackageItem(
                          item.id,
                          "questionNumber",
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <p className="text-black text-[14px]">questions</p>
                    <input
                      type="number"
                      value={item.price}
                      className="bg-white border border-gray-300 rounded px-2 py-1 w-20 h-8"
                      onChange={(e) =>
                        updatePackageItem(
                          item.id,
                          "price",
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <p className="text-black text-[14px]">฿</p>
                  </>
                ) : (
                  item.status === "Active" && (
                    <>
                      <p className="bg-white border border-gray-300 text-[14px] flex items-center rounded px-2 py-1 w-12 h-8">
                        {item.questionNumber}
                      </p>
                      <p className="text-black text-[14px]">questions</p>
                      <p className="bg-white border border-gray-300 text-[14px] flex items-center rounded px-2 py-1 w-20 h-8">
                        {item.price}
                      </p>
                      <p className="text-black text-[14px]">฿</p>
                    </>
                  )
                )}

                <button
                  className="bg-[#E86464] rounded-full p-1"
                  onClick={() => removePackageItem(item.id)}
                >
                  <Minus size={16} className="text-white" />
                </button>
              </div>
            ))}

          <div className="flex items-center">
            <div className="w-6 text-black">
              {packageInfo.filter((item) => item.status !== "Deleted").length +
                1}
              .
            </div>
            <button
              className="bg-[#9C9C9C] text-white rounded-full ml-1 px-6 py-1"
              onClick={addPackageItem}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-10">
        <button
          onClick={handleDone}
          className="bg-[#1F2359] text-white text-xl py-2 px-24 rounded-lg"
        >
          Done
        </button>
      </div>
    </div>
  );
}
