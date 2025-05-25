import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import Filter from "./Filter";

interface Props {
  onSearch: (searchKey: string) => void;
  searchValue: string;
  data: any[];
   totalCount: number;
}

const SearchBar = ({ onSearch,onFilter, searchValue, data , totalCount}: Props) => {
  const [search, setSearch] = useState(searchValue);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  const runSearch = (value: string) => {
    const term = value.trim();
    onSearch(term);
  };

  const handleSearchClick = (e) => {
    e.preventDefault()
    runSearch(search);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch(value);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

 
    debounceTimeout.current = setTimeout(() => {
      runSearch(value);
    }, 1500);
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-100">
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            placeholder="جستجو..."
            className="pl-10 pr-10 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring focus:border-blue-400 bg-gray-100"
          />
          {/* آیکون سرچ سمت راست */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon icon="guidance:search" width="20" height="20" />
          </div>

          {/* دکمه جستجو */}
          <button
            onClick={handleSearchClick}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-blue-200 text-blue-900 text-[12px] px-3 py-1 rounded-md hover:bg-blue-300 transition"
          >
            جستجو
          </button>
        </div>
        <Filter onFilter={onFilter}/>
      </div>
      <div>
        <span>تعداد کل: {totalCount}</span>
      </div>
    </div>
  );
};

export default SearchBar;
