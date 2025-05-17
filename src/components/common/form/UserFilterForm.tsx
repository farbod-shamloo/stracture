import React, { useEffect, useState } from "react";
import Application from "../../../services/Application";

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

  // اینجا state برای ذخیره داده‌ها از API می‌سازیم
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Application();
        // data.data.items شامل لیست اپلیکیشن‌هاست
        if (data && data.data && data.data.items) {
          setApplications(data.data.items);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-[14px]">
      <div>
        <hr className="text-gray-300 py-1" />
        <label className="text-[13px]">سامانه</label>
        <select
          name="system"
          value={formData.system}
          onChange={handleChange}
          className="bg-gray-100 w-full p-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">لطفاً سامانه را انتخاب کنید</option>
          {/* داده‌ها را اینجا از API رندر می‌کنیم */}
          {applications.map((app) => (
            <option key={app.id} value={app.code}>
              {app.name}
            </option>
          ))}
        </select>
      </div>

      {/* بخش‌های دیگر فرم بدون تغییر می‌ماند */}

      <div className="flex gap-1 justify-end pt-3">
        <button
          type="button"  // دکمه انصراف نباید type submit باشد
          className="bg-gray-200 text-black px-4 py-2 rounded w-100px"
          onClick={() => setFormData({
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
          })}
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
