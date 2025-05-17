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

  const [currentPage, setCurrentPage] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");

  useEffect(() => {
    console.log("🔁 URL SearchParams changed:", searchParams.toString());
    setCurrentPage(searchParams.toString());
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    const perPageFromUrl = parseInt(searchParams.get("perPage") || "5", 10);
    setCurrentPage(pageFromUrl - 1);
    setItemsPerPage(perPageFromUrl);

    const urlSearch = searchParams.get("search") || "";
    setSearchKey(urlSearch);

    console.log(
      "   → currentPage:",
      pageFromUrl - 1,
      "itemsPerPage:",
      perPageFromUrl,
      "searchKey:",
      urlSearch
    );
  }, [searchParams]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["users", searchKey, currentPage, itemsPerPage],
    queryFn: () => FilterUser(searchKey, currentPage + 1, itemsPerPage),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    onError: (err) => {
      console.error(err);
    },
  });

  const [currentData, setCurrentData] = useState<any[]>([]);

  useEffect(() => {
    console.log(" Received data from query:", data);
    setCurrentData(data?.items || []);
  }, [data]);

  useEffect(() => {
    console.log(" currentData state updated:", currentData);
  }, [currentData]);

  const totalCount = data?.totalCount || (data?.items?.length ?? 0);

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
    console.log(" Deleting item:", itemToDelete);
    const newData = currentData.filter((item) => item.id !== itemToDelete.id);
    setCurrentData(newData);
    console.log("   → new currentData length:", newData.length);
  };

  const handlePageClick = (event: { selected: number }) => {
    console.log("Page clicked:", event.selected);
    const newPage = event.selected;

    const params = new URLSearchParams(searchParams);
    params.set("page", (newPage + 1).toString());
    setSearchParams(params);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(" Items per page changed:", event.target.value);
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0);

    const params = new URLSearchParams(searchParams);
    params.set("perPage", newItemsPerPage.toString());
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleSearch = (search: string) => {
    console.log(" Search key changed:", search);
    setSearchKey(search);
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // بازگشت به صفحه اول بعد از سرچ جدید
    setSearchParams(params);
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت اطلاعات</p>;

  return (
    <div className="overflow-x-auto rounded-[10px]">
      <SearchBar
        onSearch={handleSearch}
        searchValue={searchKey}
        data={currentData}
        totalCount={totalCount}
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
