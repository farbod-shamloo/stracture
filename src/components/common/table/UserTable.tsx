import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import api from "../../../services/axios";
import Pagination from "./Pagination";
import Row from "./Row";
import SearchBar from "./SearchBar";

const UserTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [filters, setFilters] = useState<{ key: string; label: string }[]>([]);

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
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    const perPageFromUrl = parseInt(searchParams.get("perPage") || "5", 10);
    setCurrentPage(pageFromUrl - 1);
    setItemsPerPage(perPageFromUrl);
  }, [searchParams]);

  const handleDelete = (itemToDelete) => {
    const updatedData = data.filter((item) => item.id !== itemToDelete.id);
    setData(updatedData);
  };

  useEffect(() => {
    api
      .get("/v1/User/GetAllByFilter")
      .then((res) => {
        const items = res?.data?.data?.items;
        if (Array.isArray(items)) {
          setData(items);
        } else {
          setError("داده‌ها به درستی بارگذاری نشدند.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("خطا در دریافت اطلاعات");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const offset = currentPage * itemsPerPage;
    const currentData = data.slice(offset, offset + itemsPerPage);
    setCurrentData(currentData);
  }, [currentPage, itemsPerPage, data]);

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
    searchParams.set("page", (newPage + 1).toString());
    setSearchParams(searchParams);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0);
    searchParams.set("perPage", newItemsPerPage.toString());
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto rounded-[10px]">
      {data.length === 0 ? (
        <p className="p-4 text-gray-500">داده‌ای یافت نشد.</p>
      ) : (
        <>
          <SearchBar data={data} setFilters={setFilters} />
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
              data={data}
              itemsPerPage={itemsPerPage}
              handlePageClick={handlePageClick}
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
