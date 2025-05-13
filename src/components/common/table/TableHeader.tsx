import React from 'react';

type TableHeaderProps = {
  columns: { key: string; label: string }[];
};

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead className="bg-gray-200">
      <tr>
        <th className="px-6 py-4 text-center text-xs font-medium text-black uppercase">
          ردیف
        </th>
        {columns.map((col) => (
          <th
            key={col.key}
            className="px-6 py-4 text-center text-xs font-medium text-black uppercase"
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
