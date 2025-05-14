// components/SystemForm.tsx
import React, { useState } from "react";

const UserFilterForm = ({ onSubmit }: { onSubmit: (formData: any) => void }) => {
  const [formData, setFormData] = useState({
    system: "",
    systemSearch: "",
    userType: "",
    role: "",
    roleSearch: "",
    systemGroup: "",
    systemGroupSearch: "",
    subSystemGroup: "",
    subSystemGroupSearch: "",
    organization: "",
    geoStructure: "",
    orgChart: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 text-[14px]">
      <div>
        <hr  className="text-gray-300 py-1"/>
        <label className="text-[13px]">سامانه</label>
        <input
          type="text"
          name="system"
          value={formData.system}
          onChange={handleChange}
          className="bg-gray-100 w-full p-2 rounded"
        />
      </div>

      <div>
        <label  className="text-[13px]">جستجو سامانه</label>
        <input
          type="text"
          name="systemSearch"
          value={formData.systemSearch}
          onChange={handleChange}
          className="bg-gray-100 w-full p-2 rounded"
        />
      </div>

      <div>
        <label  className="text-[13px]">نوع کاربر</label>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          className="bg-gray-100 w-full p-2 rounded"
        >
          <option value="">لطفاً انتخاب کنید</option>
          <option value="admin">مدیر</option>
          <option value="user">کاربر عادی</option>
        </select>
      </div>

      <div>
        <label  className="text-[13px]">نقش</label>
        <input
          type="text"
          name="roleSearch"
          placeholder="جستجو نقش"
          value={formData.roleSearch}
          onChange={handleChange}
          className="bg-gray-100 w-full p-2 rounded mb-2"
        />
      
      </div>

      <div>
        <label  className="text-[13px]">گروه سامانه</label>
        <input
          type="text"
          name="systemGroupSearch"
          placeholder="جستجو گروه سامانه"
          value={formData.systemGroupSearch}
          onChange={handleChange}
          className="bg-gray-100 w-full p-2 rounded mb-2"
        />
   
      </div>

      <div>
        <label  className="text-[13px]">زیرگروه سامانه</label>
        <input
          type="text"
          name="subSystemGroupSearch"
          placeholder="جستجو زیر گروه سامانه"
          value={formData.subSystemGroupSearch}
          onChange={handleChange}
          className="bg-gray-100 w-full p-2 rounded mb-2"
        />
     
      </div>

      <div>
        <label  className="text-[13px]">سازمان</label>
        <select
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          className="bg-gray-100 w-full p-2 rounded"
        >
          <option value="">لطفا سازمان را انتخاب نمایید</option>
          <option value="org1">سازمان ۱</option>
          <option value="org2">سازمان ۲</option>
        </select>
      </div>

      <div>
        <label  className="text-[13px]">ساختار جغرافیایی</label>
        <select
          name="geoStructure"
          value={formData.geoStructure}
          onChange={handleChange}
          className="bg-gray-100 w-full p-2 rounded"
        >
          <option value="">لطفا ساختار جغرافیایی را انتخاب نمایید</option>
          <option value="north">شمال</option>
          <option value="south">جنوب</option>
        </select>
      </div>

      <div>
        <label  className="text-[13px]">چارت سازمانی</label>
        <input
          type="text"
          name="orgChart"
          placeholder="لطفا چارت سازمانی را وارد نمایید"
          value={formData.orgChart}
          onChange={handleChange}
          className="bg-gray-100 w-full p-2 rounded"
        />
      </div>

   <div className="flex gap-1 justify-end pt-3">
   <button
        type="submit"
        className="bg-gray-200 text-black px-4 py-2 rounded w-100px"
      >
        انصراف
      </button>
   <button
        type="submit"
        className="bg-blue-800 text-white px-4 py-2 rounded w-[180px]"
      >
       اعمال فیلتر
      </button>
   </div>
    </form>
  );
};

export default UserFilterForm;
