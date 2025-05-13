import Actions from "./Actions";

type TableBodyProps = {
  data: any[];
  columns: { key: string; label: string }[];
};

const TableBody: React.FC<TableBodyProps> = ({ data, columns }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200 ">
      {data.length === 0 ? (
        <tr className="">
          <td
            colSpan={columns.length + 1}
            className="text-center py-4 text-gray-500"
          >
            داده‌ای یافت نشد.
          </td>
        </tr>
      ) : (
        data.map((item, index) => (
          <tr className="even:bg-gray-50 border-0" key={item.id || index}>
            {/* ستون شماره ردیف */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
              {index + 1}
            </td>

            {/* ستون‌های دیتا */}
            {columns.map((col) => (
              <td
                key={col.key || col.label}
                className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center 
                  ${col.key === "actions" ? "sticky left-0 bg-white z-10" : ""}`}
                
              >
                {col.key === "fullName" ? (
                  `${item.firstName} ${item.lastName}`
                ) : col.key === "status" ? (
                  item.status === 1 ? (
                    <span className="px-3 py-1 rounded-[5px]  text-xs font-semibold bg-green-100 text-green-600">
                      فعال
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-[5px] text-xs font-semibold bg-red-100 text-red-600">
                      غیرفعال
                    </span>
                  )
                ) : col.key === "type" ? (
                  item.type === 0 ? (
                    <span className="px-3 py-1 rounded-[5px] text-xs font-semibold bg-blue-100 text-blue-600">
                      کاربر سازمانی
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-[5px] text-xs font-semibold bg-orange-100 text-orange-600">
                      شهروند
                    </span>
                  )
                ) : col.key === "twoFactorEnabled" ? (
                  item.twoFactorEnabled ? (
                    <span className="px-3 py-1 rounded-[5px] text-xs font-semibold bg-green-100 text-green-600">
                      فعال
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-[5px] text-xs font-semibold bg-red-100 text-red-600">
                      غیرفعال
                    </span>
                  )
                ) : col.key === "actions" ? (
                  <Actions item={item} />
                ) : (
                  item[col.key]
                )}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default TableBody;
