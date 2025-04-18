"use client";

import React, { useState } from "react";
import { Minus } from "lucide-react";

interface PackageItem {
  id: number;
  quantity: number;
  type: string;
  price: number;
  currency: string;
}

const EditPackageScreen: React.FC = () => {
  const [packageItems, setPackageItems] = useState<PackageItem[]>([
    { id: 1, quantity: 3, type: "question", price: 200, currency: "₽" },
    { id: 2, quantity: 5, type: "question", price: 300, currency: "₽" },
    { id: 3, quantity: 10, type: "question", price: 500, currency: "₽" },
  ]);

  const addPackageItem = () => {
    const newId =
      packageItems.length > 0
        ? Math.max(...packageItems.map((item) => item.id)) + 1
        : 1;
    setPackageItems([
      ...packageItems,
      { id: newId, quantity: 1, type: "question", price: 100, currency: "₽" },
    ]);
  };

  const removePackageItem = (id: number) => {
    setPackageItems(packageItems.filter((item) => item.id !== id));
  };

  const handleDone = () => {
    console.log("Package saved:", packageItems);
    // Add navigation or submit logic here
  };

  return (
    <div className="h-full w-full flex flex-col justify-start items-starts ml-2 mt-4 bg-[#FEF0E5] font-inter">
      {/* Content */}
      <div className="p-4 mx-4 mt-4">
        <h2 className="text-xl font-bold mb-3">Edit Package</h2>

        <div className="mb-3 text-[14px] text-black">Package offerings</div>

        <div className="space-y-3 text-[14px]">
          {packageItems.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2">
              <div className="w-6 text-black">{index + 1}.</div>

              <input
                type="number"
                value={item.quantity}
                className="bg-white border border-gray-300 rounded px-2 py-1 w-12 h-10"
                onChange={(e) => {
                  const updatedItems = [...packageItems];
                  updatedItems[index].quantity = parseInt(e.target.value);
                  setPackageItems(updatedItems);
                }}
              />

              <p className="text-black text-[14px]">questions</p>

              <input
                type="number"
                value={item.price}
                className="bg-white border border-gray-300 rounded px-2 py-1 w-16 h-10"
                onChange={(e) => {
                  const updatedItems = [...packageItems];
                  updatedItems[index].price = parseInt(e.target.value);
                  setPackageItems(updatedItems);
                }}
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

          {packageItems.length < 6 && (
            <div className="flex items-center">
              <div className="w-6 mt-3 text-black">
                {packageItems.length + 1}.
              </div>
              <button
                className="bg-[#9C9C9C] text-white mt-3 rounded-full px-6 py-1"
                onClick={addPackageItem}
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Done Button */}
      <div className="flex justify-center mt-10">
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
