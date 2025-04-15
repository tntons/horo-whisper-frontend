"use client";

import TellerCardBrowse from "./TellerCardBrowse";
import SearchBar from "./SearchBar";
import SearchFilter from "./SearchFilter";
import SearchSort from "./SearchSort";
import { useState, useEffect } from "react";

export default function BrowseTeller() {
  const [tellers, setTellers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tellers from the backend
  const fetchTellers = async () => {
    try {
      const response = await fetch("/api/tellers");
      if (!response.ok) {
        throw new Error("Failed to fetch tellers");
      }
      const result = await response.json();
      if (result.success) {
        setTellers(result.data);
      } else {
        throw new Error("Failed to fetch tellers");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTellers();
  }, []);

  // Filter tellers based on the search query
  const filteredTellers = tellers.filter((teller) =>
    teller.tellerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-content w-full flex flex-col overflow-y-auto">
      <div className="sticky top-0 pt-4 pb-2 z-10 flex items-start px-4 justify-between">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <SearchFilter />
        <SearchSort />
      </div>

      <div className="flex flex-col items-center overflow-y-auto no-scrollbar w-full">
        {isLoading ? (
          <p className="text-blue01 mt-4">Loading...</p>
        ) : error ? (
          <p className="text-red-500 mt-4">{error}</p>
        ) : filteredTellers.length > 0 ? (
          filteredTellers.map((teller, index) => (
            <TellerCardBrowse
              key={index}
              imageSrc={teller.imageSrc || "/default-profile.png"}
              rating={teller.averageRating || 0}
              tellerName={teller.tellerName || "Unknown"}
              tags={teller.specialty || []}
              description={teller.bio || "No description available"}
              reviews={teller.totalReviews || 0}
              waitTime={teller.traffic || 0}
              price={teller.minPrice || 0}
            />
          ))
        ) : (
          <p className="text-blue01 mt-4">No tellers found.</p>
        )}
      </div>
    </div>
  );
}
