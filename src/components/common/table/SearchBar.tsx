import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

interface Props {
  setFilters: (filters: { key: string; label: string }[]) => void;
}

const SearchBar = ({ setFilters, data }: Props) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      setFilters([{ key: "search", label: search }]);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-100">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو..."
            className="pl-10 pr-10 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring focus:border-blue-400 bg-gray-100"
          />

          {/* آیکون سرچ سمت راست داخل اینپوت */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon icon="guidance:search" width="20" height="20" />
          </div>

          {/* دکمه جستجو سمت چپ داخل اینپوت */}
          <button
            onClick={handleSearch}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-blue-200 text-blue-900 text-[12px] px-3 py-1 rounded-md hover:bg-blue-600 transition "
          >
            جستجو
          </button>
        </div>

        {/* دکمه فیلتر جدا از اینپوت */}
        <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition bg-gray-100">
          <Icon icon="solar:filter-linear" width="24" height="24" />
        </button>
      </div>

     <div>
      <span>تعداد کل: {data.length}</span>
     </div>
    </div>
  );
};

export default SearchBar;
