// components/SidebarContent.tsx
import React from "react";
import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Button, Popconfirm, Avatar, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { useUser } from "../../../context/userContext";
import FullscreenToggleButton from "../../../components/common/Fullscreen";
import { Link, Router } from "react-router-dom";


type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode
): MenuItem {
  return { key, icon, label } as MenuItem;
}

const items: MenuItem[] = [
  getItem("کاربران", "/panel/users", <UserOutlined />),
  getItem("سامانه‌ها", "/panel/orders", <UserOutlined />),
  getItem("نشست‌ها", "/panel/samane", <DesktopOutlined />),
  getItem("فعالیت‌کاربران", "/panel/team", <TeamOutlined />),
  getItem("فایل‌ها", "/panel/files", <FileOutlined />),
];

interface Props {
  onMenuClick: (key: string) => void;
  onLogout: () => void;
}

const SidebarContent: React.FC<Props> = ({ onMenuClick, onLogout }) => {
  const { user } = useUser();
  return (
    <>
      <div className="text-black text-center text-xl  py-4">
        <Button
          type="text"
          style={{ fontSize: "20px" }}
          className="!bg-gray-200 !rounded-[50%]"
          icon={
            user?.avatarBase64 ? (
              <Avatar
                src={`data:image/png;base64,${user.avatarBase64}`}
                size={40}
              />
            ) : (
              <UserOutlined />
            )
          }
        />
        <div className="text-center mt-2 text-base text-gray-600">
          {user.firstName} {user.lastName}
        </div>
        <div className="mt-2 flex justify-center gap-2 hidden xl:flex">
        <Tooltip title="تمام‌صفحه">
      <Button
        icon={<FullscreenToggleButton />}
        type="text"
        className="!rounded-[50%]"
      />
    </Tooltip>
         <Tooltip title="بازگشت به درگاه">
           <Link to="/">
      <Button
        icon={<i className="fa-light fa-house text-[18px]"></i>}
        type="text"
        className="!rounded-[50%]"
        />
        </Link>
    </Tooltip>
    <Tooltip title="خروج از حساب کاربری">
      <Popconfirm
        title="آیا مطمئن هستی که می‌خوای خارج بشی؟"
        okText="بله"
        cancelText="خیر"
        onConfirm={onLogout}
      >
        <Button
          icon={<i className="fa-light fa-arrow-left-from-bracket text-[18px] text-red-500"></i>}
          type="text"
          danger
        />
      </Popconfirm>
    </Tooltip>
        </div>
        <hr className="text-gray-300 mt-2"/>
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
