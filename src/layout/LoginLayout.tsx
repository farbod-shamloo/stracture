import { Layout, Button, Input, Form, Checkbox, message,  Tabs } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Content, Footer } = Layout;
const { TabPane } = Tabs;

const LoginLayout: React.FC = () => {
  const onFinishLogin = () => {
    message.success('ورود با موفقیت انجام شد');
  };

  const onFinishRegister = () => {
    message.success('ثبت‌نام با موفقیت انجام شد');
  };

  return (
    <Layout className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Content className="flex justify-center items-center h-full p-6">
        <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">ورود یا ثبت‌نام</h2>
          
          {/* Tabs برای انتخاب بین فرم ورود و ثبت‌نام */}
          <Tabs defaultActiveKey="1">
            {/* تب ورود */}
            <TabPane tab="ورود" key="1">
              <Form
                name="login"
                onFinish={onFinishLogin}
                className="mb-6"
                initialValues={{ remember: true }}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "نام کاربری را وارد کنید!" }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="نام کاربری"
                    className="rounded-md shadow-md"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "رمز عبور را وارد کنید!" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="رمز عبور"
                    className="rounded-md shadow-md"
                  />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>مرا به خاطر بسپار</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full bg-pink-500 hover:bg-pink-600 transition duration-300"
                  >
                    ورود
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            {/* تب ثبت‌نام */}
            <TabPane tab="ثبت‌نام" key="2">
              <Form
                name="register"
                onFinish={onFinishRegister}
                className="mb-6"
              >
                <Form.Item
                  name="registerUsername"
                  rules={[{ required: true, message: "نام کاربری را وارد کنید!" }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="نام کاربری"
                    className="rounded-md shadow-md"
                  />
                </Form.Item>

                <Form.Item
                  name="registerPassword"
                  rules={[{ required: true, message: "رمز عبور را وارد کنید!" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="رمز عبور"
                    className="rounded-md shadow-md"
                  />
                </Form.Item>

                <Form.Item
                  name="registerConfirmPassword"
                  dependencies={['registerPassword']}
                  rules={[
                    { required: true, message: 'تأیید رمز عبور الزامی است!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('registerPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('رمز عبور با تأیید رمز عبور همخوانی ندارد!');
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="تأیید رمز عبور"
                    className="rounded-md shadow-md"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="default"
                    htmlType="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 transition duration-300"
                  >
                    ثبت‌نام
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </Content>

      <Footer className="text-center py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <p>&copy; 2025 MyBrand. همه حقوق محفوظ است.</p>
      </Footer>
    </Layout>
  );
}

export default LoginLayout;
