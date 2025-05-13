import { Layout, Button, Tooltip, Menu, Drawer } from "antd";
import { UserOutlined, LoginOutlined, MenuOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";



import { useUser} from "../context/userContext"
import NotificationPopover from "../components/common/Notification";

const { Header, Content, Footer } = Layout;

const LandingLayout: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [showIntro, setShowIntro] = useState(true);


  const {user} = useUser()
  
  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  // const [user, setUser] = useState(null);
  
  //   useEffect(() => {
  //   fetch("https://gw.tehrantc.com/ssotest/api/v1/User/GetCurrentUser", {
  //     method: "GET",
  //     credentials: "include", // برای ارسال کوکی‌ها در درخواست
  //   })
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Not logged in");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setUser(data.data); // فرض بر اینه که داده‌ها در فیلد `data` قرار دارند
  //     })
  //     .catch(() => {
  //       setUser(null);
  //     });
  // }, []);

  // برای خودکار رفتن اسپلش بعد از چند ثانیه
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white text-3xl font-bold"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
          >
            <div className="text-center">
              ورود به سایت
              <div>
                <Button
                  type="primary"
                  className="mt-6"
                  onClick={() => setShowIntro(false)}
                >
                  ادامه
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <>
          <Header className="bg-transparent flex justify-between items-center px-6 py-4 shadow-lg">

      <div className="text-white text-2xl font-bold tracking-wider cursor-pointer">
        لوگو
      </div>

      <div className="md:hidden">
        <Button
          type="default"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          shape="circle"
          className="text-white hover:bg-transparent border-white hover:text-white transition duration-300"
        />
      </div>

      <div className="hidden md:flex items-center gap-6">
        <NotificationPopover />
        <Tooltip title="پنل ادمین">
          <Button
            shape="circle"
            icon={<UserOutlined />}
             href={`/panel?name=${user.firstName}&username=${user.userName}`}
            type="default"
            className="text-white hover:bg-transparent hover:text-white transition duration-300"
          />
        </Tooltip>

        {user ? (
          <span className="text-white">
            {user.firstName} {user.lastName} - {user.userName} 
          </span>
        ) : (
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={() =>
              window.location.href =
                "https://sina-test.tehrantc.com/dargah/user/sign-in"
            }
            className="bg-pink-500 hover:bg-pink-600 text-white transition duration-300"
          >
            ثبت نام \ ورود
          </Button>
        )}
      </div>
    </Header>
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

          <Footer className="text-center py-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <p className="opacity-75">&copy; 2025 MyBrand. همه حقوق محفوظ است.</p>
          </Footer>
        </>
      )}
    </Layout>
  );
};

export default LandingLayout;
