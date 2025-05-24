import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import UserTable from "../../components/common/table/UserTable";
import { getAllByFilter } from "../../services/Users";
import SearchBar from "../../components/common/table/SearchBar"; 

const IndexUser: React.FC = () => {
  const columns = [
    { key: "fullName", label: "نام و نام خانوادگی" },
    { key: "nationalCode", label: "کد ملی" },
    { key: "userName", label: "نام کاربری" },
    { key: "status", label: "وضعیت کاربران" },
    { key: "twoFactorEnabled", label: "ورود دو مرحله ای" },
    { key: "type", label: "نوع کاربر" },
    { key: "actions", label: "عملیات" },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");
  const [filters, setFilters] = useState({
    application: "",
    userType: "",
    role: "",
    applicationGroup: "",
    applicationSubGroup: "",
  });
  const [currentData, setCurrentData] = useState<any[]>([]);

  // همگام‌سازی state با پارامترهای url
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    const perPageFromUrl = parseInt(searchParams.get("perPage") || "5", 10);
    const urlSearch = searchParams.get("search") || "";

    setCurrentPage(pageFromUrl - 1);
    setItemsPerPage(perPageFromUrl);
    setSearchKey(urlSearch);
  }, [searchParams]);

  useEffect(() => {
    const newFilters = {
      application: searchParams.get("application") || "",
      userType: searchParams.get("userType") || "",
      role: searchParams.get("role") || "",
      applicationGroup: searchParams.get("applicationGroup") || "",
      applicationSubGroup: searchParams.get("applicationSubGroup") || "",
    };
    setFilters(newFilters);
  }, [searchParams]);


  const { data, error, isLoading } = useQuery({
    queryKey: ["users", searchKey, currentPage, itemsPerPage, JSON.stringify(filters)],
    queryFn: () => getAllByFilter(searchKey, currentPage + 1, itemsPerPage, filters),
  });


  useEffect(() => {
    setCurrentData(data?.items || []);
  }, [data]);

  const totalCount = data?.totalCount || currentData.length;

  
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

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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

  if (error) {
    return (
      <div className="flex justify-center items-center py-10 text-red-500">
        خطا در دریافت اطلاعات
      </div>
    );
  }

  if (isLoading) return <p>در حال بارگذاری...</p>;

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        searchValue={searchKey}
        data={currentData}
        totalCount={totalCount}
        onFilter={handleFilter}
      />

      <UserTable
        columns={columns}
        data={currentData}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalCount={totalCount}
        setData={setCurrentData}
        onDelete={handleDelete}
        handlePageClick={handlePageClick}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default IndexUser;
