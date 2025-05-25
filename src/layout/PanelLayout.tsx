import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, theme, Button, Drawer } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SidebarContent from "../pages/Panel/Sidebar/indexSidebar";
import AddUser from "../pages/Panel/users/AddUser";

const { Content, Footer, Sider } = Layout;

const PanelLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 700) {
        setHideSidebar(true);
        setIsMobile(true);
        setCollapsed(true);
      } else if (width < 1024) {
        setHideSidebar(false);
        setCollapsed(true);
        setIsMobile(false);
      } else {
        setHideSidebar(false);
        setCollapsed(false);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuClick = (key: string) => {
    navigate(key);
    setShowDrawer(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

const getBreadcrumbFromPath = () => {
  const breadcrumbMap: Record<string, string> = {
    panel: "پنل",
    dashboard: "داشبورد",
    users: "کاربران",
    add: "افزودن کاربر",
    edit: "ویرایش کاربر",
    orders: "سامانه ها",
    files: "فایل‌ها",
    team: "تیم",
  };

  const pathParts = location.pathname.split("/").filter(Boolean);

  return pathParts
    .filter((part) => isNaN(Number(part))) 
    .filter((part) => !/^[0-9a-fA-F]{24}$/.test(part)) 
    .map((part) => breadcrumbMap[part] || null)
    .filter(Boolean); 
};


  const sidebar = (
    <SidebarContent onMenuClick={handleMenuClick} onLogout={handleLogout} />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!hideSidebar && (
        <Sider
          theme="light"
          collapsible={false}
          collapsed={collapsed}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "auto",
          }}
        >
          {sidebar}
        </Sider>
      )}

      <Drawer
        title="منو"
        placement="right"
        onClose={() => setShowDrawer(false)}
        open={showDrawer}
      >
        {sidebar}
      </Drawer>

      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <div className="flex items-center justify-between px-1.5">
            <div className="flex justify-start items-center mt-4">
              {isMobile && (
                <div style={{ padding: "10px 16px" }}>
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
                {getBreadcrumbFromPath().map((item, index) => (
                  <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>

            {location.pathname === "/panel/users" && <AddUser />}
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
            <Outlet />
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
