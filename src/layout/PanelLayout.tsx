// layouts/PanelLayout.tsx
import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, theme, Button, Drawer } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarContent from "../pages/Panel/Sidebar/indexSidebar";

const { Content, Footer, Sider } = Layout;

const PanelLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [selectedKey, setSelectedKey] = useState("/panel/dashboard");
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  
  useEffect(() => {
    const storedKey = localStorage.getItem("selectedKey");
    if (storedKey) setSelectedKey(storedKey);

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
    setSelectedKey(key);
    localStorage.setItem("selectedKey", key);
    navigate(key);
    setShowDrawer(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getBreadcrumb = () => {
    switch (selectedKey) {
      case "/panel/dashboard":
        return ["پنل", "کاربران"];
      case "/panel/orders":
        return ["پنل", "سفارشات"];
      case "/panel/users":
        return ["پنل", "کاربران"];
      case "/panel/team":
        return ["پنل", "تیم"];
      case "/panel/files":
        return ["پنل", "فایل‌ها"];
      default:
        return ["پنل"];
    }
  };

  const sidebar = (
    <SidebarContent onMenuClick={handleMenuClick} onLogout={handleLogout} />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!hideSidebar && (
        <Sider theme="light" collapsible={false} collapsed={collapsed}>
          {sidebar}
        </Sider>
      )}
      <Drawer title="منو" placement="right" onClose={() => setShowDrawer(false)} open={showDrawer}>
        {sidebar}
      </Drawer>

      <Layout>
        <Content style={{ margin: "0 16px" }}>
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
            <Outlet />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>ساخته شده با ❤️ توسط فربد</Footer>
      </Layout>
    </Layout>
  );
};

export default PanelLayout;
