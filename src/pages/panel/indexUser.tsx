import React from 'react';
import UserTable from '../../components/common/table/UserTable';


const IndexUser: React.FC = () => {
      const columns = [
    { key: "fullName", label: "نام و نام خانوادگی" },
    { key: "nationalCode", label: "کد ملی" },
    { key: "userName", label: "نام کاربری" },
    { key: "status", label: "وضعیت کاربران" },
    { key: "twoFactorEnabled", label: "ورود دو مرحله ای" },
    { key: "type", label: "نوع کاربر" },
    { key: "actions", label: "عملیات" },
  ];

  return (
    <div>
      <UserTable columns={columns}/>
    </div>
  );
};

export default IndexUser;