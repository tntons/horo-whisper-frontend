"use client";

import TellerCardBrowse from "../../components/TellerCardBrowse";
import SearchBar from "../../components/SearchBar";
import SearchFilter from "../../components/SearchFilter";
import { useState } from "react";

const tellers = [
  {
    imageSrc: "/teller00.png",
    rating: 4.8,
    tellerName: "Golf the Teller",
    tags: ["Tarot Reading", "Love and relationship"],
    description:
      "I have been practicing tarot for over 20 years and graduated from a well-known institution....",
    reviews: 28,
    waitTime: 3,
    price: 200,
    questions: 3,
  },
  {
    imageSrc: "/teller00.png",
    rating: 1.4,
    tellerName: "Golfy the Teller",
    tags: ["Love and relationship"],
    description:
      "I have been in love for over 20 years and graduated from romance novels....",
    reviews: 2,
    waitTime: 100,
    price: 20,
    questions: 5,
  },
  {
    imageSrc: "/teller00.png",
    rating: 4.8,
    tellerName: "Paepae the Teller",
    tags: ["Tarot Reading", "Love and relationship"],
    description:
      "I have been practicing tarot for over 20 years and graduated from a well-known institution....",
    reviews: 28,
    waitTime: 3,
    price: 200,
    questions: 3,
  },
  {
    imageSrc: "/teller00.png",
    rating: 1.4,
    tellerName: "Mekk the Teller",
    tags: ["Love and relationship"],
    description:
      "I have been in love for over 20 years and graduated from romance novels....",
    reviews: 2,
    waitTime: 100,
    price: 20,
    questions: 5,
  },
  {
    imageSrc: "/teller00.png",
    rating: 4.8,
    tellerName: "MekkyMekko the Teller",
    tags: ["Tarot Reading", "Love and relationship"],
    description:
      "I have been practicing tarot for over 20 years and graduated from a well-known institution....",
    reviews: 28,
    waitTime: 3,
    price: 200,
    questions: 3,
  },
  {
    imageSrc: "/teller00.png",
    rating: 1.4,
    tellerName: "Tonseiei the Teller",
    tags: ["Love and relationship"],
    description:
      "I have been in love for over 20 years and graduated from romance novels....",
    reviews: 2,
    waitTime: 100,
    price: 20,
    questions: 5,
  },
];

export default function BrowseTeller() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTellers = tellers.filter((teller) =>
    teller.tellerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-content w-full flex flex-col overflow-y-auto">
      <div className="sticky top-0 pt-4 pb-2 z-10 flex items-start px-4 justify-between">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <SearchFilter />
      </div>

      <div className="flex flex-col items-center overflow-y-auto no-scrollbar w-full">
        {filteredTellers.length > 0 ? (
          filteredTellers.map((teller, index) => (
            <TellerCardBrowse key={index} {...teller} />
          ))
        ) : (
          <p className="text-blue01 mt-4">No tellers found.</p>
        )}
      </div>
    </div>
  );
}
