import React, { useState } from "react";
import { ListFilter } from "lucide-react";
import { Dispatch, SetStateAction } from 'react'

interface SearchFilterProps {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>
  allTags: string[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  selectedTags,
  setSelectedTags,
  priceRange,
  setPriceRange,
  allTags,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="relative font-inter">
      <div
        className="flex w-[38px] h-[38px] bg-greybackground border border-blue01 rounded-[12px] px-3 py-2 justify-center shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <button>
          <ListFilter size={24} className="text-[#696969]" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-[0px] top-12 w-64 bg-white p-4 shadow-lg rounded-xl border">
          <div>
            <p className="font-semibold text-lg mb-2">Filter by Tags</p>
            <div className="flex flex-wrap gap-1">
              {allTags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => handleTagClick(tag)}
                  className={`text-base px-2 py-1 rounded-full border ${
                    selectedTags.includes(tag)
                      ? "bg-yellow01 text-yellow03"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="font-semibold text-lg mb-2">
              Max Price: ฿{priceRange[1]}
            </p>
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="slider-blue w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
