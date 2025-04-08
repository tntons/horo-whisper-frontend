import React from "react";
import { ArrowDownUp } from "lucide-react";

const SearchSort: React.FC = () => {
  return (
    <div className="flex w-[38px] h-[38px] bg-greybackground border border-blue01 rounded-[12px] px-3 py-2 justify-center shadow-sm">
      {/* Sort Button */}
      <button>
        <ArrowDownUp size={23} className="text-[#696969]" />
      </button>
    </div>
  );
};

export default SearchSort;
