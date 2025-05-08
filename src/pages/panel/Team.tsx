import React, { useState, useEffect } from "react";
import { Table, Button, Form, Input, Modal, Space, Pagination, message } from "antd";
import { UserAddOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";

interface TeamMember {
  key: string;
  name: string;
  position: string;
  email: string;
}

const Team: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]); // داده‌های اعضای تیم
  const [loading, setLoading] = useState(false); // وضعیت بارگذاری
  const [isModalVisible, setIsModalVisible] = useState(false); // نمایش یا مخفی کردن فرم
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null); // عضو تیم که در حال ویرایش است
  const [searchText, setSearchText] = useState<string>(""); // جستجو
  const [pagination, setPagination] = useState<{ current: number; pageSize: number }>({
    current: 1,
    pageSize: 10,
  }); // تنظیمات صفحه‌بندی

  // مثال داده‌ها
  useEffect(() => {
    // در اینجا داده‌های اعضای تیم رو از API یا دیتابیس دریافت می‌کنیم
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        setTeam([
          { key: "1", name: "Ali", position: "Developer", email: "ali@example.com" },
          { key: "2", name: "Sara", position: "Designer", email: "sara@example.com" },
          { key: "3", name: "Mohammad", position: "Manager", email: "mohammad@example.com" },
        ]);
        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  // تابع برای ثبت و ویرایش عضو تیم
  const handleFormSubmit = (values: { name: string; position: string; email: string }) => {
    if (editingMember) {
      // ویرایش عضو تیم
      setTeam(
        team.map((member) =>
          member.key === editingMember.key ? { ...member, ...values } : member
        )
      );
      message.success("عضو تیم ویرایش شد");
    } else {
      // ثبت عضو تیم جدید
      setTeam([
        ...team,
        { key: String(team.length + 1), name: values.name, position: values.position, email: values.email },
      ]);
      message.success("عضو تیم جدید ثبت شد");
    }
    setIsModalVisible(false);
    setEditingMember(null);
  };

  // تابع برای حذف عضو تیم
  const handleDelete = (key: string) => {
    setTeam(team.filter((member) => member.key !== key));
    message.success("عضو تیم حذف شد");
  };

  // جدول برای نمایش اعضای تیم
  const columns = [
    { title: "نام", dataIndex: "name", key: "name" },
    { title: "نقش", dataIndex: "position", key: "position" },
    { title: "ایمیل", dataIndex: "email", key: "email" },
    {
      title: "عملیات",
      key: "action",
      render: (_: any, record: TeamMember) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingMember(record);
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
  const filteredData = team.filter(
    (member) =>
      member.name.toLowerCase().includes(searchText.toLowerCase()) ||
      member.email.toLowerCase().includes(searchText.toLowerCase())
  );

  // صفحه‌بندی
  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({ current: page, pageSize });
  };

  return (
    <div>
      {/* بخش جستجو */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="جستجو"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Button
          icon={<UserAddOutlined />}
          type="primary"
          onClick={() => {
            setIsModalVisible(true);
            setEditingMember(null);
          }}
        >
          ثبت عضو جدید
        </Button>
      </Space>

      {/* جدول اعضای تیم */}
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

      {/* فرم ثبت یا ویرایش عضو تیم */}
      <Modal
        title={editingMember ? "ویرایش عضو تیم" : "ثبت عضو تیم جدید"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
  <Form
  initialValues={editingMember || {}}
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
    name="position"
    label="نقش"
    rules={[{ required: true, message: "لطفاً نقش را وارد کنید" }]}
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
  <Form.Item>
    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
      {editingMember ? "ویرایش عضو تیم" : "ثبت عضو تیم"}
    </Button>
  </Form.Item>
</Form>

      </Modal>
    </div>
  );
};

export default Team;
