import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import Row from "./Row";

type UserTableProps = {
  columns: { key: string; label: string }[];
  data: any[];
  currentPage: number;
  itemsPerPage: number;
  totalCount: number;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  onDelete: (item: any) => void;
  handlePageClick: (event: { selected: number }) => void;
  handleItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const UserTable: React.FC<UserTableProps> = ({
  columns,
  data,
  currentPage,
  itemsPerPage,
  totalCount,
  setData,
  onDelete,
  handlePageClick,
  handleItemsPerPageChange,
}) => {
  return (
    <div className="overflow-x-auto rounded-[10px]">
   
      <div className="overflow-x-auto rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
     
          <TableHeader columns={columns} />
          <TableBody
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            columns={columns}
            data={data}
            setData={setData}
            onDelete={onDelete}
          />
        </table>
      </div>

      <div className="flex items-center justify-center mt-7">
        <Pagination
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
          handlePageClick={handlePageClick}
          currentPage={currentPage}
        />
        <Row itemsPerPage={itemsPerPage} handleItemsPerPageChange={handleItemsPerPageChange} />
      </div>
    </div>
  );
};

export default UserTable;
