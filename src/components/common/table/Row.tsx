import React from 'react'

function Row({itemsPerPage, handleItemsPerPageChange}) {
  return (
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
              <option value={25}>25 سطر</option>
            </select>
          </div>
  )
}

export default Row
