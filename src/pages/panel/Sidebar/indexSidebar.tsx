// components/SidebarContent.tsx
import React from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  EditOutlined,
  LockOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Button, Popconfirm } from "antd";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode): MenuItem {
  return { key, icon, label } as MenuItem;
}

const items: MenuItem[] = [
  getItem("داشبورد", "/panel/dashboard", <PieChartOutlined />),
  getItem("سفارشات", "/panel/orders", <DesktopOutlined />),
  getItem("کاربران", "/panel/users", <UserOutlined />),
  getItem("تیم", "/panel/team", <TeamOutlined />),
  getItem("فایل‌ها", "/panel/files", <FileOutlined />),
];

interface Props {
  onMenuClick: (key: string) => void;
  onLogout: () => void;
}

const SidebarContent: React.FC<Props> = ({ onMenuClick, onLogout }) => {
  return (
    <>
      <div className="text-white text-center text-xl font-bold py-4">
        <Button
          icon={<UserOutlined />}
          type="text"
          style={{ fontSize: "20px" }}
          className="!bg-gray-300 !rounded-[50%]"
        />
        <div className="mt-2 flex justify-center gap-2 hidden xl:flex">
          <Popconfirm
            title="آیا مطمئن هستی که می‌خوای خارج بشی؟"
            okText="بله"
            cancelText="خیر"
            onConfirm={onLogout}
          >
            <Button icon={<LogoutOutlined />} type="text" danger />
          </Popconfirm>
          <Button icon={<EditOutlined />} type="text" className="!text-emerald-500 !rounded-[50%]" />
          <Button icon={<LockOutlined />} type="text" className="!text-red-400 !rounded-[50%]" />
        </div>
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={["/panel/dashboard"]}
        mode="inline"
        items={items}
        onClick={({ key }) => onMenuClick(key)}
      />
    </>
  );
};

export default SidebarContent;
