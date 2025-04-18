"use client";

import React, { useState, useEffect } from "react";
import { Minus } from "lucide-react";

interface PackageItem {
  id: number;
  tellerId: number;
  packageDetail: string | null;
  questionNumber: number;
  price: number;
}

const EditPackageScreen: React.FC = () => {
  const tellerId = 1; // Replace with actual teller ID later
  const [packageInfo, setPackageInfo] = useState<PackageItem[]>([]);
  const [isDone, setIsDone] = useState(false);

  const fetchPackage = async () => {
    try {
      const response = await fetch(`/api/tellers/${tellerId}/teller-package`);
      const data = await response.json();
      setPackageInfo(data.data || []);
    } catch (error) {
      console.error("Error fetching package:", error);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, [tellerId]);

  const addPackageItem = () => {
    const newItem: PackageItem = {
      id: Date.now(), // Temporary ID for UI
      tellerId,
      packageDetail: null,
      questionNumber: 0,
      price: 0,
    };
    setPackageInfo((prev) => [...prev, newItem]);
  };

  const updatePackageItem = (
    index: number,
    key: keyof PackageItem,
    value: number | string | null
  ) => {
    const updated = [...packageInfo];
    updated[index] = { ...updated[index], [key]: value };
    setPackageInfo(updated);
  };

  const removePackageItem = (id: number) => {
    setPackageInfo((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDone = async () => {
    try {
      const response = await fetch(`/api/tellers/${tellerId}/teller-package`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packages: packageInfo }),
      });

      if (!response.ok) throw new Error("Failed to update packages");

      console.log("Packages saved:", packageInfo);
    } catch (error) {
      console.error("Error saving packages:", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col ml-2 mt-4 bg-[#FEF0E5] font-inter">
      <div className="p-4 mx-4 mt-4 justify-start items-start">
        <h2 className="text-xl font-bold mb-3">Edit Package</h2>

        <div className="mb-3 text-[14px] text-black">Package offerings</div>

        <div className="space-y-3 text-[14px]">
          {packageInfo.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2">
              <div className="w-6 text-black">{index + 1}.</div>

              <input
                type="number"
                value={item.questionNumber}
                className="bg-white border border-gray-300 rounded px-2 py-1 w-12 h-10"
                onChange={(e) =>
                  updatePackageItem(
                    index,
                    "questionNumber",
                    parseInt(e.target.value)
                  )
                }
              />

              <p className="text-black text-[14px]">questions</p>

              <input
                type="number"
                value={item.price}
                className="bg-white border border-gray-300 rounded px-2 py-1 w-20 h-10"
                onChange={(e) =>
                  updatePackageItem(index, "price", parseInt(e.target.value))
                }
              />

              <p className="text-black text-[14px]">฿</p>

              <button
                className="bg-[#E86464] rounded-full p-1"
                onClick={() => removePackageItem(item.id)}
              >
                <Minus size={16} className="text-white" />
              </button>
            </div>
          ))}

          {/* Add Button */}
          <div className="flex items-center">
            <div className="w-6 mt-3 text-black">{packageInfo.length + 1}.</div>
            <button
              className="bg-[#9C9C9C] text-white mt-3 rounded-full px-6 py-1"
              onClick={addPackageItem}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Done Button */}
      <div className="flex items-center justify-center mt-10">
        <button
          onClick={handleDone}
          className="bg-[#1F2359] text-white text-xl py-2 px-24 rounded-lg"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default EditPackageScreen;
