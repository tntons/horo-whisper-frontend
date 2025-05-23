"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Box from "@/components/Box";
import ConfirmBox from "./ConfirmBox";
import { apiFetch } from "@/lib/api/fetch";
import { getCustomerId } from "@/app/utils/getCustomer";

interface PackageInfo {
  success: boolean;
  data: Array<{
    status: string;
    id: number;
    tellerId: number;
    packageDetail: string | null;
    questionNumber: number;
    price: number;
  }>;
}
export default function ChoosePackage() {
  const [packageInfo, setPackageInfo] = useState<PackageInfo | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [selectedAnonymity, setSelectedAnonymity] = useState<number | null>(
    null
  );
  const [isConfirm, setIsConfirm] = useState(false);
  const { tellerId } = useParams();
  const [customerId, setCustomerId] = useState<number | null>(null);

  if (typeof tellerId !== "string") {
    throw new Error("Invalid tellerId");
  }

  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const id = await getCustomerId();
        setCustomerId(id);
        console.log("customerId: ", id);
      } catch (error) {
        console.error("Error fetching customer ID:", error);
      }
    };
    fetchCustomerId();
  }, []);
  const fetchPackage = async () => {
    try {
      console.log("tellerId: ", tellerId);
      // setTellerId(tellerId)
      const data = await apiFetch(`/tellers/${tellerId}/teller-package`);
      setPackageInfo(data);
    } catch (error) {
      console.error("Error fetching package:", error);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, []);
  useEffect(() => {
    console.log(selectedPackage);
  }, [selectedPackage]);

  const handleBookSession = async () => {
    try {
      const response = await apiFetch(`/customers/book-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: customerId,
          tellerId: parseInt(tellerId, 10),
          packageId: selectedPackage,
        }),
      });
      console.log(response);

      setIsConfirm(true);

      console.log("Session is booked");
    } catch (error) {
      console.error("Error accepting session:", error);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {isConfirm && <ConfirmBox />}
      <Box title="Choose Package">
        <div className="flex flex-col gap-3">
          {packageInfo?.data
            .filter((pkg) => pkg.status === "Active")
            .map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedPackage(item.id)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                  selectedPackage === item.id
                    ? "border-purple02"
                    : "border-greyborder"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-medium">฿{item.price}</h2>
                    <p className="text-gray-600">
                      {item.questionNumber} questions
                    </p>
                  </div>
                  <div
                    className={`h-6 w-6 border-2 rounded-full flex items-center justify-center ${
                      selectedPackage === 0
                        ? "border-purple02"
                        : "border-greyborder"
                    }`}
                  >
                    {selectedPackage === item.id && (
                      <div className="h-3 w-3 bg-purple02 rounded-full" />
                    )}
                  </div>
                </div>
              </button>
            ))}
        </div>
      </Box>

      <Box title="Choose Anonymity">
        <div className="flex flex-col gap-3">
          <div>
            <button
              className="flex items-center gap-2"
              onClick={() => setSelectedAnonymity(0)}
            >
              <div
                className={`h-6 w-6 border-2 rounded-full flex items-center justify-center ${
                  selectedAnonymity === 0
                    ? "border-purple02"
                    : "border-greyborder"
                }`}
              >
                {selectedAnonymity === 0 && (
                  <div className="h-3 w-3 bg-purple02 rounded-full" />
                )}
              </div>
              <p className="text-md"> I want to stay anonymous</p>
            </button>
          </div>
          <div>
            <button
              className="flex items-center gap-2"
              onClick={() => setSelectedAnonymity(1)}
            >
              <div
                className={`h-6 w-6 border-2 rounded-full flex items-center justify-center ${
                  selectedAnonymity === 1
                    ? "border-purple02"
                    : "border-greyborder"
                }`}
              >
                {selectedAnonymity === 1 && (
                  <div className="h-3 w-3 bg-purple02 rounded-full" />
                )}
              </div>
              <p className="text-md"> Share my name with the fortune teller</p>
            </button>
          </div>
        </div>
      </Box>

      <div className="mt-10 mx-4 flex justify-center">
        <button
          disabled={selectedPackage === null || selectedAnonymity === null}
          className={`w-[75%] h-[47px] bg-purple04 text-white py-3 rounded-xl flex justify-center items-center ${
            selectedPackage === null || selectedAnonymity === null
              ? "opacity-50"
              : ""
          }`}
          onClick={() => handleBookSession()}
        >
          <span className="text-xl">Book</span>
        </button>
      </div>
    </div>
  );
}
