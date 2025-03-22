import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const SearchBar: React.FC = () => {
  return (
    <div className="w-full h-[38px] px-4 m-2 mt-3">
      <div className="flex items-center bg-greybackground border border-blue01 rounded-[12px] px-3 py-2 shadow-sm">
        {/* Search Icon */}
        <Search size={15} className="text-black mr-2" />

        {/* Search Input */}
        <input
          type="text"
          placeholder="Find your teller ..."
          className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent"
        />

        {/* Filter Button */}
        {/* <button className="ml-2 p-2 bg-gray-200 rounded-full">
          <SlidersHorizontal size={20} className="text-gray-600" />
        </button> */}
      </div>
    </div>
  );
};

export default SearchBar;
