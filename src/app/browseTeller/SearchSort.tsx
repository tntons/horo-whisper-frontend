import React, { useState } from "react";
import { ArrowDownUp } from "lucide-react";

const sortOptions = [
  "Default",
  "Price: Low to High",
  "Price: High to Low",
  "Rating: High to Low",
  "Estimated Wait Time",
];

interface SearchSortProps {
  selectedSort: string;
  setSortOption: (option: string) => void;
}

const SearchSort: React.FC<SearchSortProps> = ({
  selectedSort,
  setSortOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    setSortOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative font-inter">
      {/* Sort Button */}
      <div className="flex w-[38px] h-[38px] bg-greybackground border border-blue01 rounded-[12px] px-3 py-2 justify-center shadow-sm">
        <button onClick={() => setIsOpen(!isOpen)}>
          <ArrowDownUp size={23} className="text-[#696969]" />
        </button>
      </div>

      {/* Sort Options Popup */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 bg-white border border-gray-300 rounded-xl w-56 shadow-md">
          <ul className="text-md text-gray-800">
            {sortOptions.map((option) => (
              <li
                key={option}
                className={`px-4 py-2 hover:bg-blue01 hover:text-white cursor-pointer ${
                  selectedSort === option ? "bg-blue01 text-white" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchSort;
