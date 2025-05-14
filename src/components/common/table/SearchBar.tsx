// components/SearchBar.tsx
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import Filter from "./Filter";

interface User {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  [key: string]: any;
}

interface Props {
  data: User[];
  setFilters: (filters: User[]) => void;
}

const SearchBar = ({ data, setFilters }: Props) => {
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const runSearch = (value: string) => {
    const term = value.trim().toLowerCase();

    if (term === "") {
      setFilters(data);
      setNotFound(false);
      return;
    }

    const filtered = data.filter((item) => {
      const fn = item.firstName?.toLowerCase() || "";
      const ln = item.lastName?.toLowerCase() || "";
      const full = item.fullName?.toLowerCase() || "";
      return fn.includes(term) || ln.includes(term) || full.includes(term);
    });

    setFilters(filtered);
    setNotFound(filtered.length === 0);
  };

  const handleSearchClick = () => {
    runSearch(search);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      runSearch(value);
    }, 1500); // ۱.۵ ثانیه بعد از تایپ

    setTypingTimeout(timeout);
  };

  return (
    <>
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
              className="absolute left-1 top-1/2 -translate-y-1/2 bg-blue-200 text-blue-900 text-[12px] px-3 py-1 rounded-md hover:bg-blue-300 transition "
            >
              جستجو
            </button>
          </div>

          <Filter />
        </div>

        <div>
          <span>تعداد کل: {data.length}</span>
        </div>
      </div>

      {notFound && (
        <div className="text-center text-red-500 mb-4">
          موردی یافت نشد
        </div>
      )}
    </>
  );
};

export default SearchBar;
