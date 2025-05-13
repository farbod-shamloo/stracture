type TableBodyProps = {
  data: any[];
  columns: { key: string; label: string }[];
};

const TableBody: React.FC<TableBodyProps> = ({ data, columns }) => {
  return (
   <tbody className="bg-white divide-y divide-gray-200">
  {data.length === 0 ? (
    <tr>
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
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
          {index + 1}
        </td>
        {columns.map((col) => (
          <td
            key={col.key}
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"
          >
            {col.key === 'fullName'
              ? `${item.firstName} ${item.lastName}`
              : item[col.key]}
          </td>
        ))}
      </tr>
    ))
  )}
</tbody>
  );
};

export default TableBody;
