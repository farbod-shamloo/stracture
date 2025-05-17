import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import api from "../../../services/axios";
import Pagination from "./Pagination";
import Row from "./Row";
import SearchBar from "./SearchBar";
import FilterUser from "../../../services/FilterUser";

const UserTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentData, setCurrentData] = useState<any[]>([]);

  // مقدار سرچ از URL میاد یا خالی
  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");

  const columns = [
    { key: "fullName", label: "نام و نام خانوادگی" },
    { key: "nationalCode", label: "کد ملی" },
    { key: "userName", label: "نام کاربری" },
    { key: "status", label: "وضعیت کاربران" },
    { key: "twoFactorEnabled", label: "ورود دو مرحله ای" },
    { key: "type", label: "نوع کاربر" },
    { key: "actions", label: "عملیات" },
  ];

  useEffect(() => {
    // وقتی پارامترهای صفحه یا تعداد آیتم تغییر کرد، stateها رو بروز کن
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    const perPageFromUrl = parseInt(searchParams.get("perPage") || "5", 10);
    setCurrentPage(pageFromUrl - 1);
    setItemsPerPage(perPageFromUrl);

    // مقدار سرچ از URL رو هم بروز کن
    const urlSearch = searchParams.get("search") || "";
    setSearchKey(urlSearch);
  }, [searchParams]);

  useEffect(() => {
    // وقتی مقدار سرچ اولیه لود شد یا تغییر کرد، داده بگیر
    fetchData(searchKey);
  }, []);

  const fetchData = (search = "") => {
    setLoading(true);
    setError(null);

    // به‌روزرسانی مقدار سرچ در state و URL
    setSearchKey(search);
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    setSearchParams(params);

    FilterUser(search)
      .then((res) => {
        if (res) {
          const items = res.items;
          if (Array.isArray(items)) {
            setData(items);
            setFilteredData(items);
          } else {
            setError("داده‌ای یافت نشد.");
          }
        } else {
          setError("خطا در دریافت داده از سرور");
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("خطا در دریافت اطلاعات");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // صفحه‌بندی
  useEffect(() => {
    const offset = currentPage * itemsPerPage;
    setCurrentData(filteredData.slice(offset, offset + itemsPerPage));
  }, [filteredData, currentPage, itemsPerPage]);

  const handleDelete = (itemToDelete: any) => {
    const newData = data.filter((item) => item.id !== itemToDelete.id);
    setData(newData);

    const newFiltered = filteredData.filter((item) => item.id !== itemToDelete.id);
    setFilteredData(newFiltered);
  };

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
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

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto rounded-[10px]">
      <SearchBar onSearch={fetchData} searchValue={searchKey} data={filteredData} />

      {filteredData.length === 0 ? (
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
              setData={setData}
              onDelete={handleDelete}
            />
          </table>

          <div className="flex items-center justify-center mt-7">
            <Pagination
              data={filteredData}
              itemsPerPage={itemsPerPage}
              handlePageClick={handlePageClick}
            />

            <Row itemsPerPage={itemsPerPage} handleItemsPerPageChange={handleItemsPerPageChange} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserTable;
