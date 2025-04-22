"use client";

import TellerCardBrowse from "./TellerCardBrowse";
import SearchBar from "./SearchBar";
import SearchFilter from "./SearchFilter";
import SearchSort from "./SearchSort";
import { useState, useEffect, useMemo } from "react";
import { apiFetch } from "@/lib/api/fetch";
import { defaultProfilePic } from "@/app/utils/defaultProfilePic";

export default function BrowseTeller() {
  interface Teller {
    tellerId: number;
    tellerName: string;
    imageSrc?: string;
    averageRating?: number;
    specialty?: string[];
    bio?: string;
    totalReviews?: number;
    traffic?: number;
    minPrice?: number;
  }

  const [tellers, setTellers] = useState<Teller[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState("Default");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const allTags = [
    "Tarot Card",
    "Palm Reading",
    "Astrology",
    "Others",
    "Love and Relationship",
    "Work and Education",
    "Friends and Family",
    "Health and Well-being",
  ];

  const filteredTellers = tellers
    .filter((teller) =>
      teller.tellerName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (teller) =>
        selectedTags.length === 0 ||
        (teller.specialty || []).some((tag) => selectedTags.includes(tag))
    )
    .filter((teller) =>
      teller.minPrice === undefined ? true : teller.minPrice <= priceRange[1]
    );

  const sortedFilteredTellers = useMemo(() => {
    const tellersCopy = [...filteredTellers];
    switch (sortOption) {
      case "Price: Low to High":
        return tellersCopy.sort(
          (a, b) => (a.minPrice || 0) - (b.minPrice || 0)
        );
      case "Price: High to Low":
        return tellersCopy.sort(
          (a, b) => (b.minPrice || 0) - (a.minPrice || 0)
        );
      case "Rating: High to Low":
        return tellersCopy.sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
        );
      case "Estimated Wait Time":
        return tellersCopy.sort((a, b) => (a.traffic || 0) - (b.traffic || 0));
      default:
        return tellersCopy;
    }
  }, [filteredTellers, sortOption]);

  const fetchTellers = async () => {
    try {
      const response = await apiFetch("/tellers");
      console.log("Fetch Tellers response",response);
      if (response.success) {
        setTellers(response.data);
      } else {
        throw new Error("Failed to fetch tellers");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTellers();
  }, []);

  return (
    <div className="main-content w-full flex flex-col overflow-y-auto">
      <div className="sticky top-0 pt-4 pb-2 z-10 flex items-start px-4 justify-between gap-3">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          forCustomer={true}
        />
        <SearchFilter
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          allTags={allTags}
        />
        <SearchSort setSortOption={setSortOption} selectedSort={sortOption} forCustomer ={true} />
      </div>

      <div className="flex flex-col items-center overflow-y-auto no-scrollbar w-full">
        {isLoading ? (
          <p className="text-blue01 mt-4 text-lg">Loading...</p>
        ) : error ? (
          <p className="text-red-500 mt-4">{error}</p>
        ) : sortedFilteredTellers.length > 0 ? (
          sortedFilteredTellers.map((teller, index) => (
            <TellerCardBrowse
              key={index}
              tellerId={teller.tellerId}
              imageSrc={teller?.profilePic ? teller.profilePic : defaultProfilePic}
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
