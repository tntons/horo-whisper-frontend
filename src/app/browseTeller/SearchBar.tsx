import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  forCustomer:boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  forCustomer
}) => {
  return (
    <div className="flex w-full h-[38px] bg-greybackground border border-blue01 rounded-[12px] px-3 py-2 shadow-sm">
      {/* Search Icon */}
      <Search size={20} className="text-[#696969] flex-shrink-0 mr-2" />

      {/* Search Input */}
      <input
        type="text"
        placeholder={forCustomer ? "Find your teller ..." : "Find your session ..."}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent"
      />
    </div>
  );
};

export default SearchBar;
