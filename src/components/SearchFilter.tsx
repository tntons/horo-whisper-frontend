import React from "react";
import { ListFilter } from "lucide-react";

const SearchFilter: React.FC = () => {
  return (
    <div className="flex w-[38px] h-[38px] bg-greybackground border border-blue01 rounded-[12px] px-3 py-2 justify-center shadow-sm">
      {/* Filter Button */}
      <button>
        <ListFilter size={24} className="text-[#696969]" />
      </button>
    </div>
  );
};

export default SearchFilter;
