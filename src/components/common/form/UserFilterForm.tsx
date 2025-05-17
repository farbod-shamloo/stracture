import React, { useEffect, useState } from "react";
import Application from "../../../services/Application";
import Role from "../../../services/Role";
import ApplicationGroup from "../../../services/ApplicationGroup";

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
    applicationGroup: "",
  });

  const [applications, setApplications] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [applicationGroups, setApplicationGroups] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apps = await Application();
        if (apps?.data?.items) setApplications(apps.data.items);

        const rolesData = await Role();
        if (rolesData?.data?.items) setRoles(rolesData.data.items);

        const applicationGroupsData = await ApplicationGroup();
        if (applicationGroupsData?.data?.items) {
          setApplicationGroups(applicationGroupsData.data.items);
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
      {/* سامانه */}
      <div>
        <label className="text-[13px]">سامانه</label>
        <select
          name="system"
          value={formData.system}
          onChange={handleChange}
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

      {/* گروه اپلیکیشن */}
      <div>
        <label className="text-[13px]">گروه سامانه</label>
        <select
          name="applicationGroup"
          value={formData.applicationGroup}
          onChange={handleChange}
          className="bg-gray-100 w-full p-2 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">لطفاً گروه اپلیکیشن را انتخاب کنید</option>
          {applicationGroups.map((group) => (
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
          onClick={() =>
            setFormData({
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
              applicationGroup: "",
            })
          }
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
