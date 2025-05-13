import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import api from "../../../services/axios";
import ReactPaginate from "react-paginate";

const UserTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  const [currentData, setCurrentData] = useState<any[]>([]);

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
    setCurrentPage(event.selected);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0); 
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto rounded-[10px]">
      {data.length === 0 ? (
        <p className="p-4 text-gray-500">داده‌ای یافت نشد.</p>
      ) : (
        <>
    

          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader columns={columns} />
            <TableBody columns={columns} data={currentData} />
          </table>
          
      <div className="flex items-center justify-center mt-7">
      <div className="">
            <ReactPaginate
              previousLabel={"قبلی"}
              nextLabel={"بعدی"}
              breakLabel={"..."}
              pageCount={Math.ceil(data.length / itemsPerPage)}
              onPageChange={handlePageClick}
              containerClassName={"flex justify-center gap-4"}
              activeClassName="text-white border border-blue-500 py-2 px-4 rounded-md"
              pageClassName={"py-2 px-4 cursor-pointer"}
              previousClassName={"py-2 px-4 cursor-pointer"}
              nextClassName={"py-2 px-4 cursor-pointer"}
            />
          </div>

          <div >
            <select
              id="items-per-page"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value={5}>5 سطر</option>
              <option value={10}>10 سطر</option>
              <option value={15}>15 سطر</option>
              <option value={20}>20 سطر</option>
            </select>
          </div>
      </div>
        </>
      )}
    </div>
  );
};

export default UserTable;
