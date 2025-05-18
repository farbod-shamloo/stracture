import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import Row from "./Row";
import SearchBar from "./SearchBar";
import FilterUser from "../../../services/FilterUser";

const UserTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");
  const [currentData, setCurrentData] = useState<any[]>([]);
 const [filters, setFilters] = useState({
  Application: "",
  userType: "",
  Role: "",
  applicationGroup: "",
});

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    const perPageFromUrl = parseInt(searchParams.get("perPage") || "5", 10);
    const urlSearch = searchParams.get("search") || "";



    setCurrentPage(pageFromUrl - 1);
    setItemsPerPage(perPageFromUrl);
    setSearchKey(urlSearch);

    console.log("🔁 URL Params Updated:", {
      currentPage: pageFromUrl - 1,
      itemsPerPage: perPageFromUrl,
      searchKey: urlSearch,
    });
  }, [searchParams]);
useEffect(() => {
  const newFilters = {
    Application: searchParams.get("Application") || "",
    userType: searchParams.get("userType") || "",
    Role: searchParams.get("Role") || "",
    ApplicationGroup: searchParams.get("ApplicationGroup") || "",
  };
  setFilters(newFilters);
  console.log("🎯 فیلترهای جدید:", newFilters);
}, [searchParams]);


  const { data, error, isLoading } = useQuery({
    queryKey: ["users", searchKey, currentPage, itemsPerPage,JSON.stringify(filters) ],
    queryFn: () =>
      FilterUser(searchKey, (currentPage ?? 0) + 1, itemsPerPage,filters ),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    setCurrentData(data?.items || []);
  }, [data]);

  const totalCount = data?.totalCount || currentData.length;

  const columns = [
    { key: "fullName", label: "نام و نام خانوادگی" },
    { key: "nationalCode", label: "کد ملی" },
    { key: "userName", label: "نام کاربری" },
    { key: "status", label: "وضعیت کاربران" },
    { key: "twoFactorEnabled", label: "ورود دو مرحله ای" },
    { key: "type", label: "نوع کاربر" },
    { key: "actions", label: "عملیات" },
  ];

  const handleDelete = (itemToDelete: any) => {
    const newData = currentData.filter((item) => item.id !== itemToDelete.id);
    setCurrentData(newData);
  };

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected;
    const params = new URLSearchParams(searchParams);
    params.set("page", (newPage + 1).toString());
    setSearchParams(params);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0);

    const params = new URLSearchParams(searchParams);
    params.set("perPage", newItemsPerPage.toString());
    params.set("page", "1");
    setSearchParams(params);
  };

const handleFilter = (newFilters: any) => {
  setFilters(newFilters);
  setCurrentPage(0);

  const params = new URLSearchParams(searchParams);

  params.set("page", "1");

  // اضافه کردن همه فیلترها به URL
  Object.entries(newFilters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });

  setSearchParams(params);
};


  const handleSearch = (search: string) => {
    setSearchKey(search);
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <span className="text-gray-500">در حال بارگذاری اطلاعات...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-10 text-red-500">
        خطا در دریافت اطلاعات
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[10px]">
      <SearchBar
        onSearch={handleSearch}
        searchValue={searchKey}
        data={currentData}
        totalCount={totalCount}
        onFilter={handleFilter}
      />

      {currentData.length === 0 ? (
        <p className="p-4 text-gray-500">داده‌ای یافت نشد.</p>
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader columns={columns} />
            <TableBody
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              columns={columns}
              data={currentData}
              setData={setCurrentData}
              onDelete={handleDelete}
            />
          </table>

          <div className="flex items-center justify-center mt-7">
            <Pagination
              totalCount={totalCount}
              itemsPerPage={itemsPerPage}
              handlePageClick={handlePageClick}
              currentPage={currentPage}
            />
            <Row
              itemsPerPage={itemsPerPage}
              handleItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserTable;
