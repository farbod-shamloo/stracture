import { Layout, Button, Tooltip, Menu, Drawer } from "antd";
import { UserOutlined, LoginOutlined, MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const LandingLayout: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  return (
    <Layout className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Header className="bg-transparent flex justify-between items-center px-6 py-4 shadow-lg">
        {/* برند */}
        <div className="text-white text-2xl font-bold tracking-wider cursor-pointer">لوگو</div>

        {/* همبرگر منو */}
        <div className="md:hidden">
          <Button
            type="default"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            shape="circle"
            className="text-white hover:bg-transparent border-white hover:text-white transition duration-300"
          />
        </div>

        {/* منو سمت راست برای صفحه‌های بزرگتر از موبایل */}
        <div className="hidden md:flex items-center gap-6">
          {/* آیکون ورود به پنل ادمین */}
          <Tooltip title="پنل ادمین">
            <Button
              shape="circle"
              icon={<UserOutlined />}
              href="/panel"
              type="default"
              className="text-white hover:bg-transparent hover:text-white transition duration-300"
            />
          </Tooltip>

          {/* دکمه ورود */}
          <Button
            type="primary"
            icon={<LoginOutlined />}
            href="/login"
            className="bg-pink-500 hover:bg-pink-600 text-white transition duration-300"
          >
             ثبت نام \ ورود
          </Button>

    
        </div>
      </Header>

      {/* Drawer (همبرگر منو) */}
      <Drawer
        title="منو"
        placement="right"
        onClose={closeDrawer}
        visible={visible}
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        <Menu mode="vertical" defaultSelectedKeys={['1']} className="text-white">
          <Menu.Item key="1">
            <Tooltip title="پنل ادمین">
              <Button
                shape="circle"
                icon={<UserOutlined />}
                href="/panel"
                type="default"
                className="text-white hover:bg-transparent hover:text-white transition duration-300"
              />
            </Tooltip>
          </Menu.Item>

          <Menu.Item key="2">
            <Button
              type="primary"
              icon={<LoginOutlined />}
              href="/login"
              className="bg-pink-500 hover:bg-pink-600 text-white transition duration-300"
            >
             ثبت نام \ ورود
            </Button>
          </Menu.Item>

        </Menu>
      </Drawer>

      <Content className="p-10 text-center text-white">
      <Outlet />
      </Content>

      {/* فوتر */}
      <Footer className="text-center py-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <p className="opacity-75">&copy; 2025 MyBrand. همه حقوق محفوظ است.</p>
      </Footer>
    </Layout>
  );
}

export default LandingLayout;
