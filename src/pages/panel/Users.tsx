import React, { useState, useEffect } from "react";
import { Table, Button, Form, Input, Modal, Space, Pagination, message } from "antd";
import { UserAddOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";

interface User {
  key: string;
  name: string;
  email: string;
  role: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // داده‌های کاربران
  const [loading, setLoading] = useState(false); // وضعیت بارگذاری
  const [isModalVisible, setIsModalVisible] = useState(false); // نمایش یا مخفی کردن فرم
  const [editingUser, setEditingUser] = useState<User | null>(null); // کاربری که در حال ویرایش است
  const [searchText, setSearchText] = useState(""); // جستجو
  const [filterRole, setFilterRole] = useState(""); // فیلتر نقش کاربر
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 }); // تنظیمات صفحه‌بندی

  // مثال داده‌ها
  useEffect(() => {
    // در اینجا داده‌های کاربران رو از API یا دیتابیس دریافت می‌کنیم
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        setUsers([
          { key: "1", name: "Ali", email: "ali@example.com", role: "Admin" },
          { key: "2", name: "Sara", email: "sara@example.com", role: "User" },
          { key: "3", name: "Mohammad", email: "mohammad@example.com", role: "User" },
        ]);
        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  // تابع برای ثبت و ویرایش کاربر
  const handleFormSubmit = (values: any) => {
    if (editingUser) {
      // ویرایش کاربر
      setUsers(users.map(user => (user.key === editingUser.key ? { ...user, ...values } : user)));
      message.success("کاربر ویرایش شد");
    } else {
      // ثبت کاربر جدید
      setUsers([
        ...users,
        { key: String(users.length + 1), name: values.name, email: values.email, role: values.role },
      ]);
      message.success("کاربر جدید ثبت شد");
    }
    setIsModalVisible(false);
    setEditingUser(null);
  };

  // تابع برای حذف کاربر
  const handleDelete = (key: string) => {
    setUsers(users.filter(user => user.key !== key));
    message.success("کاربر حذف شد");
  };

  // جدول برای نمایش کاربران
  const columns = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "ایمیل", dataIndex: "email", key: "email" },
    { title: "نقش", dataIndex: "role", key: "role" },
    {
      title: "عملیات",
      key: "action",
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingUser(record);
              setIsModalVisible(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            danger
          />
        </Space>
      ),
    },
  ];

  // فیلتر جستجو
  const filteredData = users.filter(user => {
    const matchesSearchText =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesRoleFilter = filterRole ? user.role === filterRole : true;
    return matchesSearchText && matchesRoleFilter;
  });

  // صفحه‌بندی
  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({ current: page, pageSize });
  };

  return (
    <div>
      {/* بخش جستجو و فیلتر */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="جستجو"
          prefix={<SearchOutlined />}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <select onChange={e => setFilterRole(e.target.value)} style={{ padding: "5px" }}>
          <option value="">همه نقش‌ها</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <Button
          icon={<UserAddOutlined />}
          type="primary"
          onClick={() => {
            setIsModalVisible(true);
            setEditingUser(null);
          }}
        >
          ثبت کاربر
        </Button>
      </Space>

      {/* جدول کاربران */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        loading={loading}
        rowKey="key"
      />

      {/* صفحه‌بندی */}
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={filteredData.length}
        onChange={handlePageChange}
        style={{ marginTop: 16 }}
      />

      {/* فرم ثبت یا ویرایش کاربر */}
      <Modal
        title={editingUser ? "ویرایش کاربر" : "ثبت کاربر جدید"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
     <Form
  initialValues={editingUser || { name: "", email: "", role: "" }} // مقدار پیش‌فرض در صورت null بودن editingUser
  onFinish={handleFormSubmit}
  layout="vertical"
>
  <Form.Item
    name="name"
    label="نام"
    rules={[{ required: true, message: "لطفاً نام را وارد کنید" }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    name="email"
    label="ایمیل"
    rules={[{ required: true, message: "لطفاً ایمیل را وارد کنید" }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    name="role"
    label="نقش"
    rules={[{ required: true, message: "لطفاً نقش را انتخاب کنید" }]}
  >
    <select style={{ width: "100%", padding: "5px" }}>
      <option value="Admin">Admin</option>
      <option value="User">User</option>
    </select>
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
      {editingUser ? "ویرایش کاربر" : "ثبت کاربر"}
    </Button>
  </Form.Item>
</Form>

      </Modal>
    </div>
  );
};

export default Users;
