import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="w-full h-[38px] m-2 mt-3 sticky top-0 z-10">
      <div className="flex w-[69%] bg-greybackground border border-blue01 rounded-[12px] px-3 py-2 shadow-sm">
        {/* Search Icon */}
        <Search size={20} className="text-black flex-shrink-0 mr-2" />

        {/* Search Input */}
        <input
          type="text"
          placeholder="Find your teller ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent"
        />
      </div>
    </div>
  );
};

export default SearchBar;
