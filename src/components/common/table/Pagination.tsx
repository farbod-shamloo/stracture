import React from "react";
import ReactPaginate from "react-paginate";
function Pagination({
  totalCount,
  itemsPerPage,
  handlePageClick,
  currentPage,
}) {
  return (
    <div className="">
      <ReactPaginate
        previousLabel={"قبلی"}
        nextLabel={"بعدی"}
        breakLabel={"..."}
        pageCount={Math.ceil(totalCount / itemsPerPage)}
        onPageChange={handlePageClick}
        forcePage={currentPage} // این خط اضافه کن
        containerClassName={"flex justify-center gap-4"}
        activeClassName="text-white border border-blue-500 py-2 px-4 rounded-md"
        pageClassName={"py-2 px-4 cursor-pointer"}
        previousClassName={"py-2 px-4 cursor-pointer"}
        nextClassName={"py-2 px-4 cursor-pointer"}
        
      />
    </div>
  );
}

export default Pagination;
