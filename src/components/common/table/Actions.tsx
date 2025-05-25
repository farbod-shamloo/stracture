import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../services/Users";
import { toast } from "react-toastify";
import { Popconfirm } from "antd";

const actionsConfig = (onDelete) => [
  {
    icon: "fa-shield-keyhole",
    title: "دسترسی‌ها",
    onClick: (item, navigate) => console.log("Access", item),
  },
  {
    icon: "fa-lock",
    title: "قفل کردن",
    onClick: (item, navigate) => console.log("Lock", item),
  },
  {
    icon: "fa-arrow-right-to-bracket",
    title: "ورود به حساب",
    onClick: (item, navigate) => console.log("Login", item),
  },
  {
    icon: "fa-pen-to-square",
    title: "ویرایش",
    onClick: (item, navigate) => navigate(`/panel/users/edit/${item.id}`),
  },
  {
    icon: "fa-trash-can",
    title: "حذف",
    className: "text-red-500",
    danger: true,
    confirm: true, 
    onConfirm: async (item) => {
      try {
        await deleteUser(item.id);
        toast.success(`کاربر با موفقیت حذف شد`);
        onDelete?.(item);
      } catch (error) {
        toast.error("خطا در حذف کاربر");
        console.error("خطا در حذف کاربر:", error);
      }
    },
  },
];

function Actions({ item, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="text-[22px] flex justify-center items-center gap-4">
      {actionsConfig(onDelete).map(
        ({ icon, title, onClick, onConfirm, className, confirm }, index) => {
          const button = (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!confirm) {
                  onClick(item, navigate);
                }
              }}
              className={className}
            >
              <i className={`fa-light ${icon}`}></i>
            </button>
          );

          return (
            <div key={index} className="relative group">
              {confirm ? (
                <Popconfirm
                  title={`آیا مطمئن هستید که می‌خواهید کاربر ${item.firstName} ${item.lastName} را حذف کنید؟`}
                  onConfirm={() => onConfirm(item)}
                  okText="بله"
                  cancelText="خیر"
                >
                  {button}
                </Popconfirm>
              ) : (
                button
              )}
              <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-10">
                {title}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

export default Actions;
