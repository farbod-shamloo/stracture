import React, { useEffect, useState } from "react";
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
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Drawer, Button } from "antd";
import { Popconfirm } from "antd";
import { useNavigate } from "react-router-dom"; // اضافه کردن useNavigate
import Dashboard from "../pages/panel/Dashboard";
import Orders from "../pages/panel/Orders";
import Users from "../pages/panel/Users";
import Team from "../pages/panel/team";
import Files from "../pages/panel/files";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  const item: any = {
    key,
    icon,
    label,
  };

  if (children && children.length > 0) {
    item.children = children;
  }

  return item as MenuItem;
}

const items: MenuItem[] = [
  getItem("داشبورد", "1", <PieChartOutlined />),
  getItem("سفارشات", "2", <DesktopOutlined />),
  getItem("کاربران", "3", <UserOutlined />), // هیچ children نمی‌دیم
  getItem("تیم", "4", <TeamOutlined />),     // همین‌طور
  getItem("فایل‌ها", "5", <FileOutlined />),
];

const PanelLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const navigate = useNavigate(); // استفاده از useNavigate

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <Dashboard />;
      case "2":
        return <Orders />;
      case "3":
        return <Users />;

      case "4":
        return <Team />;
      case "5":
        return <Files />;
      default:
        return "محتوا یافت نشد";
    }
  };

  const getBreadcrumb = () => {
    switch (selectedKey) {
      case "1":
        return ["پنل", "داشبورد"];
      case "2":
        return ["پنل", "سفارشات"];
      case "3":
        return ["پنل", "کاربران"];
      case "4":
        return ["پنل", "تیم"];
      case "5":
        return ["پنل", "فایل‌ها"];
      default:
        return ["پنل"];
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const storedKey = localStorage.getItem("selectedKey");
    if (storedKey) {
      setSelectedKey(storedKey); // اگر تب ذخیره شده در localStorage وجود دارد، آن را بارگذاری کن
    }
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 700) {
        setHideSidebar(true); // سایدبار کامل حذف
        setIsMobile(true); // حالت موبایل
        setCollapsed(true); // پیش‌فرض بسته
      } else if (width < 1024) {
        setHideSidebar(false);
        setCollapsed(true); // فقط جمع
        setIsMobile(false);
      } else {
        setHideSidebar(false); // سایدبار کامل باز
        setCollapsed(false);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // تابع handleMenu برای تغییر مسیر
  const handleMenu = (key: string) => {
    setSelectedKey(key);
    localStorage.setItem("selectedKey", key);
    switch (key) {
      case "1":
        navigate("/panel/dashboard");
        break;
      case "2":
        navigate("/panel/orders");
        break;
      case "3":
        navigate("/panel/users");
        break;
      case "4":
        navigate("/panel/team");
        break;
      case "5":
        navigate("/panel/files");
        break;
      default:
        break;
    }
  };

  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/");
  }

  const sidebarContent = (
    <>
      <div className="text-white text-center text-xl font-bold py-4">
        <Button
          icon={<UserOutlined />}
          type="text"
          onClick={() => setShowDrawer(true)}
          style={{ fontSize: "20px" }}
          className="!bg-gray-300 !rounded-[50%]"
        />
        
        <div className="mt-2 flex justify-center gap-2 hidden xl:flex">
        <Popconfirm
          title="آیا مطمئن هستی که می‌خوای خارج بشی؟"
          okText="بله"
          cancelText="خیر"
          onConfirm={handleLogout}
        >
          <Button
            icon={<LogoutOutlined />}
            type="text"
            danger
          />
</Popconfirm>


          <Button
            icon={<EditOutlined />}
            type="text"
            style={{ fontSize: "20px" }}
            className="!text-emerald-500 !rounded-[50%]"
          />
          <Button
            icon={<LockOutlined />}
            type="text"
            style={{ fontSize: "20px" }}
            className="!text-red-400 !rounded-[50%]"
          />


        </div>
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        onClick={({ key }) => handleMenu(key)} // استفاده از handleMenu
      />
    </>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!hideSidebar && (
        <Sider theme="light" collapsible={false} collapsed={collapsed}>
          {sidebarContent}
        </Sider>
      )}

      <Drawer
        title="منو"
        placement="right"
        onClose={() => setShowDrawer(false)}
        open={showDrawer}
      >
        {sidebarContent}
        
      </Drawer>

      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <div className="flex justify-start items-center mt-4">
            {isMobile && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  padding: "10px 16px",
                }}
              >
                <Button
                  icon={<UserOutlined />}
                  type="text"
                  onClick={() => setShowDrawer(true)}
                  style={{ fontSize: "20px" }}
                  className="!bg-gray-300 !rounded-[50%]"
                />
              </div>
            )}
            <Breadcrumb>
              {getBreadcrumb().map((item, index) => (
                <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              marginTop: 16,
            }}
          >
            {renderContent()}
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          ساخته شده با ❤️ توسط فربد
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PanelLayout;
