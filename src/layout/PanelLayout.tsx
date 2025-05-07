import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  EditOutlined,
  LockOutlined,
  ToolOutlined 
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Drawer, Button } from "antd";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("داشبورد", "1", <PieChartOutlined />),
  getItem("سفارشات", "2", <DesktopOutlined />),
  getItem("کاربران", "sub1", <UserOutlined />, [
    getItem("کاربر ۱", "3"),
    getItem("کاربر ۲", "4"),
    getItem("کاربر ۳", "5"),
  ]),
  getItem("تیم", "sub2", <TeamOutlined />, [
    getItem("تیم A", "6"),
    getItem("تیم B", "7"),
  ]),
  getItem("فایل‌ها", "9", <FileOutlined />),
];

const PanelLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
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

<Button
    icon={<ToolOutlined />}
    type="text"
    style={{ fontSize: "20px" }}
    className="!text-amber-500 !rounded-[50%]"
  />
</div>
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
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

      {/* Drawer فقط برای حالت موبایل زیر 700 پیکسل */}
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
              <Breadcrumb.Item>پنل</Breadcrumb.Item>
              <Breadcrumb.Item>داشبورد</Breadcrumb.Item>
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
            محتوای اصلی اینجاست.
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
