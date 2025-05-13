import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import api from "../../../services/axios";

const UserTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]); // مقداردهی اولیه به صورت آرایه
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ستون‌ها با استفاده از `key` و `label`
  const columns = [
    { key: "fullName", label: "نام و نام خانوادگی" },
    { key: "nationalCode", label: "کد ملی" },
    { key: "userName", label: "نام کاربری" },
    { key: "status", label: "وضعیت کاربران" },
    { key: "twoFactorEnabled", label: "ورود دو مرحله ای" },
    { key: "type", label: "نوع کاربر" },
    { key: "type", label: "نوع کاربر" },
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

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto rounded-[10px]">
      {data.length === 0 ? (
        <p className="p-4 text-gray-500">داده‌ای یافت نشد.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader columns={columns} />
          <TableBody columns={columns} data={data} />
        </table>
      )}
    </div>
  );
};

export default UserTable;
