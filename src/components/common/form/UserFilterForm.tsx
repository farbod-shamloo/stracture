import React, { useState } from "react";
import Application from "../../../services/Application";
import Role from "../../../services/Role";
import ApplicationGroup from "../../../services/ApplicationGroup";

import { useModal } from "../../../context/ModalContext";
import ApplicationSubGroup from "../../../services/ApplicationSubGroup";

const UserFilterForm = ({
  onFilter,
  onClose, // اضافه‌شده برای انصراف
}: {
  onFilter: (formData: any) => void;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    application: "",
    userType: "",
    role: "",
    applicationGroup: "",
    applicationSubGroup: "",
  });

  const [applications, setApplications] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [applicationGroups, setApplicationGroups] = useState<any[]>([]);
  const [applicationSubGroups, setApplicationSubGroups] = useState<any[]>([]);

  const { closeModal } = useModal();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filterData = {
      userType: formData.userType,
      role: formData.role,
      application: formData.application,
      applicationGroup: formData.applicationGroup,
      applicationSubGroup: formData.applicationSubGroup,
    };

    onFilter(filterData);
    closeModal(); // یا onClose()
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-[14px]">
      {/* سامانه */}
      <div>
        <label className="text-[13px]">سامانه</label>
        <select
          name="application"
          value={formData.application}
          onChange={handleChange}
          onFocus={async () => {
            if (applications.length === 0) {
              try {
                const apps = await Application();
                if (apps?.data?.items) setApplications(apps.data.items);
              } catch (error) {
                console.error("Error fetching applications:", error);
              }
            }
          }}
          className="bg-gray-100 w-full p-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">لطفاً سامانه را انتخاب کنید</option>
          {applications.map((app) => (
            <option key={app.id} value={app.code}>
              {app.name}
            </option>
          ))}
        </select>
      </div>

      {/* نوع کاربر */}
      <div>
        <label className="text-[13px]">نوع کاربر</label>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          className="bg-gray-100 w-full p-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">لطفاً نوع کاربر را انتخاب کنید</option>
          <option value="citizen">شهروند</option>
          <option value="organizational">سازمانی</option>
        </select>
      </div>

      {/* نقش */}
      <div>
        <label className="text-[13px]">نقش</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          onFocus={async () => {
            if (roles.length === 0) {
              try {
                const rolesData = await Role();
                if (rolesData?.data?.items) setRoles(rolesData.data.items);
              } catch (error) {
                console.error("Error fetching roles:", error);
              }
            }
          }}
          className="bg-gray-100 w-full p-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">لطفاً نقش را انتخاب کنید</option>
          {roles.map((role) => (
            <option key={role.id} value={role.code}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      {/* گروه سامانه */}
      <div>
        <label className="text-[13px]">گروه سامانه</label>
        <select
          name="applicationGroup"
          value={formData.applicationGroup}
          onChange={handleChange}
          onFocus={async () => {
            if (applicationGroups.length === 0) {
              try {
                const data = await ApplicationGroup();
                if (data?.data?.items)
                  setApplicationGroups(data.data.items);
              } catch (error) {
                console.error("Error fetching application groups:", error);
              }
            }
          }}
          className="bg-gray-100 w-full p-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">لطفاً گروه سامانه را انتخاب کنید</option>
          {applicationGroups.map((group) => (
            <option key={group.id} value={group.code}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
<div>
  <label className="text-[13px]">زیرگروه سامانه</label>
  <select
    name="applicationSubGroup"  // اصلاح نام
    value={formData.applicationSubGroup}  // اصلاح نام به همانی که در state است
    onChange={handleChange}
    onFocus={async () => {
      if (applicationSubGroups.length === 0) {
        try {
          const data = await ApplicationSubGroup(); // اطمینان از وجود این سرویس و ایمپورتش
          if (data?.data?.items)
            setApplicationSubGroups(data.data.items);
        } catch (error) {
          console.error("Error fetching application sub groups:", error);
        }
      }
    }}
    className="bg-gray-100 w-full p-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="">لطفاً گروه زیرسامانه را انتخاب کنید</option>
    {applicationSubGroups.map((group) => (
      <option key={group.id} value={group.code}>
        {group.name}
      </option>
    ))}
  </select>
</div>


      {/* دکمه‌ها */}
      <div className="flex gap-1 justify-end pt-3">
        <button
          type="button"
          className="bg-gray-200 text-black px-4 py-2 rounded w-100px"
          onClick={closeModal}
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
