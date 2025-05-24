import React from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { deleteUser } from "../../../services/DeleteUser"; // مسیر دهی به فایل deleteUser.ts

const actionsConfig = [
  {
    icon: "fa-shield-keyhole",
    title: "دسترسی‌ها",
    onClick: (item) => console.log("Access", item),
  },
  {
    icon: "fa-lock",
    title: "قفل کردن",
    onClick: (item) => console.log("Lock", item),
  },
  {
    icon: "fa-arrow-right-to-bracket",
    title: "ورود به حساب",
    onClick: (item) => console.log("Login", item),
  },
  {
    icon: "fa-pen-to-square",
    title: "ویرایش",
    onClick: (item, navigate) => navigate(`/panel/users/edit/${item.userId}`),
  },
  {
    icon: "fa-trash-can",
    title: "حذف",
    className: "text-red-500",
    onClick: async (item, navigate, onDelete) => {
      try {
        const confirmDelete = window.confirm(`آیا از حذف "${item.firstName} ${item.lastName}" مطمئن هستی؟`);
        if (!confirmDelete) return;

        await deleteUser(item.userId);
        message.success("کاربر با موفقیت حذف شد");
        onDelete?.(item); // می‌تونه برای آپدیت لیست باشه
      } catch (error) {
        message.error("خطا در حذف کاربر");
      }
    },
  },
];

function Actions({ item, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="text-[22px] flex justify-center items-center gap-4">
      {actionsConfig.map(({ icon, title, onClick, className }, index) => (
        <div key={index} className="relative group">
          <button
            onClick={() => onClick(item, navigate, onDelete)}
            className={className}
          >
            <i className={`fa-light ${icon}`}></i>
          </button>
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-10">
            {title}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Actions;
