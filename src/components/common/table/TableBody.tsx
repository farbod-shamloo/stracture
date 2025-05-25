import { useState } from "react";
import Actions from "./Actions";
import { convertToJalali } from "../../../utils/convertToJalali";

import { Popconfirm, message } from "antd";

type TableBodyProps = {
  data: any[];
  columns: { key: string; label: string }[];
  currentPage: number;
  itemsPerPage: number;
  isLoading?: boolean;
};

const TableBody: React.FC<TableBodyProps> = ({
  data,
  columns,
  onDelete,
  setData,
  currentPage,
  itemsPerPage,
  isLoading = false,
}) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  const renderCellContent = (colKey, item) => {
    const statusBadge = (text: string, color: string) => {
      const colorMap: Record<string, string> = {
        green: "bg-green-100 text-green-600",
        red: "bg-red-100 text-red-600",
        blue: "bg-blue-100 text-blue-600",
        orange: "bg-orange-100 text-orange-600",
        gray: "bg-gray-200 text-black",
      };

      return (
        <span className={`px-3 py-1 rounded-[5px] text-xs  ${colorMap[color]}`}>
          {text}
        </span>
      );
    };

    switch (colKey) {
      case "fullName":
        return `${item.firstName} ${item.lastName}`;
      case "status":
        return item.status === 1
          ? statusBadge("فعال", "green")
          : statusBadge("غیرفعال", "red");
      case "type":
        return item.type === 0
          ? statusBadge(" سازمانی", "blue")
          : statusBadge("شهروند", "gray");
      case "twoFactorEnabled":
        return item.twoFactorEnabled
          ? statusBadge("فعال", "green")
          : statusBadge("غیرفعال", "red");
      case "actions":
        return <Actions data={data} item={item} />;
      default:
        return item[colKey];
    }
  };

  const detailsToShow = [
    { key: "gender", label: "جنسیت" },
    { key: "fatherName", label: "نام پدر" },
    { key: "birthDate", label: "تاریخ تولد", isDate: true },
    { key: "nationalCode", label: "کدملی" },
    { key: "personelCode", label: "کد پرسنلی" },
    { key: "mobile", label: "موبایل" },
    { key: "email", label: "ایمیل" },
    { key: "permissionCount", label: "تعداد دسترسی" },
    { key: "positions", label: "سمت ها" }, 
  ];

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.length === 0 ? (
        <tr>
          <td colSpan={columns.length + 1} className="py-6 text-center">
            <div className="flex justify-center items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            </div>
            <p className="text-gray-500 mt-2">در حال بارگذاری اطلاعات...</p>
          </td>
        </tr>
      ) : (
        data.map((item, index) => (
          <>
            <tr className="even:bg-gray-50 border-0" key={item.id || index}>
              <td className="px-6 py-4 text-sm text-gray-500 text-center flex items-center justify-center gap-2 relative">
                <button
                  onClick={() => toggleExpand(index)}
                  className="transition-transform duration-200 focus:outline-none absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <span
                    className={`inline-block transform  ${
                      expandedRow === index ? "rotate-90" : ""
                    }`}
                  >
                    ❯
                  </span>
                </button>
                <span>{currentPage * itemsPerPage + index + 1}</span>
              </td>

              {columns.map((col) => (
                <td
                  key={col.key || col.label}
                  className={`px-6 py- whitespace-nowrap text-sm text-gray-900 text-center 
                    ${col.key === "actions" ? "sticky left-0  z-10" : ""}`}
                >
                  {renderCellContent(col.key, item)}
                </td>
              ))}
            </tr>
            {expandedRow === index && (
              <tr className="bg-gray-50">
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-6 text-sm text-gray-700"
                >
                  <div className="text-right space-y-1">
                    {detailsToShow.map(({ key, label, isDate }) => (
                      <p key={key}>
                        {label}:{" "}
                        {isDate ? convertToJalali(item[key]) : item[key]}
                      </p>
                    ))}
                  </div>
                </td>
              </tr>
            )}
          </>
        ))
      )}
    </tbody>
  );
};

export default TableBody;
