import React from 'react'

function Actions({item, onDelete, data}) {
  
  return (
    <div className="text-[22px] flex justify-center items-center gap-4">
  <div className="relative group">
    <button onClick={() => console.log("Access", item)}>
      <i className="fa-light fa-shield-keyhole"></i>
    </button>
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-10">
      دسترسی‌ها
    </div>
  </div>

  <div className="relative group">
    <button onClick={() => console.log("Lock", item)}>
      <i className="fa-light fa-lock"></i>
    </button>
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-10">
      قفل کردن
    </div>
  </div>

  <div className="relative group">
    <button onClick={() => console.log("Login", item)}>
      <i className="fa-light fa-arrow-right-to-bracket"></i>
    </button>
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-10">
      ورود به حساب
    </div>
  </div>

  <div className="relative group">
    <button onClick={() => console.log("Edit", item)}>
      <i className="fa-light fa-pen-to-square"></i>
    </button>
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-10">
      ویرایش
    </div>
  </div>

  <div className="relative group">
    <button onClick={() => onDelete?.(item)}>
      <i className="fa-light fa-trash-can text-red-500"></i>
    </button>
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-10">
      حذف
    </div>
  </div>
</div>
  )
}

export default Actions