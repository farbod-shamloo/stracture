import React, { useState, useEffect } from "react";
import { Table, Button, Form, Input, Modal, Space, Pagination, message, Upload } from "antd";
import { FileAddOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";


interface FileData {
  key: string;
  name: string;
  size: string;
  type: string;
}

const File: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]); // داده‌های فایل‌ها
  const [loading, setLoading] = useState(false); // وضعیت بارگذاری
  const [isModalVisible, setIsModalVisible] = useState(false); // نمایش یا مخفی کردن فرم
  const [editingFile, setEditingFile] = useState<FileData | null>(null); // فایلی که در حال ویرایش است
  const [searchText, setSearchText] = useState(""); // جستجو
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 }); // تنظیمات صفحه‌بندی

  // مثال داده‌ها
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        setFiles([
          { key: "1", name: "File 1", size: "2MB", type: "PDF" },
          { key: "2", name: "File 2", size: "5MB", type: "Image" },
          { key: "3", name: "File 3", size: "1MB", type: "Document" },
        ]);
        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  // تابع برای ثبت و ویرایش فایل
  const handleFormSubmit = (values: any) => {
    if (editingFile) {
      // ویرایش فایل
      setFiles(files.map(file => (file.key === editingFile.key ? { ...file, ...values } : file)));
      message.success("فایل ویرایش شد");
    } else {
      // ثبت فایل جدید
      setFiles([
        ...files,
        { key: String(files.length + 1), name: values.name, size: "0MB", type: values.type },
      ]);
      message.success("فایل جدید ثبت شد");
    }
    setIsModalVisible(false);
    setEditingFile(null);
  };

  // تابع برای حذف فایل
  const handleDelete = (key: string) => {
    setFiles(files.filter(file => file.key !== key));
    message.success("فایل حذف شد");
  };

  // جدول برای نمایش فایل‌ها
  const columns = [
    { title: "نام فایل", dataIndex: "name", key: "name" },
    { title: "نوع فایل", dataIndex: "type", key: "type" },
    { title: "حجم فایل", dataIndex: "size", key: "size" },
    {
      title: "عملیات",
      key: "action",
      render: (_: any, record: FileData) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingFile(record);
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
  const filteredData = files.filter(file => {
    const matchesSearchText =
      file.name.toLowerCase().includes(searchText.toLowerCase()) ||
      file.type.toLowerCase().includes(searchText.toLowerCase());
    return matchesSearchText;
  });

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
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Button
          icon={<FileAddOutlined />}
          type="primary"
          onClick={() => {
            setIsModalVisible(true);
            setEditingFile(null);
          }}
        >
          ثبت فایل جدید
        </Button>
      </Space>

      {/* جدول فایل‌ها */}
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

      {/* فرم ثبت یا ویرایش فایل */}
      <Modal
        title={editingFile ? "ویرایش فایل" : "ثبت فایل جدید"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
     <Form
  initialValues={editingFile || {}}
  onFinish={handleFormSubmit}
  layout="vertical"
>
  <Form.Item
    name="name"
    label="نام فایل"
    rules={[{ required: true, message: "لطفاً نام فایل را وارد کنید" }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    name="type"
    label="نوع فایل"
    rules={[{ required: true, message: "لطفاً نوع فایل را وارد کنید" }]}
  >
    <Input />
  </Form.Item>
  <Form.Item label="بارگذاری فایل">
    <Upload beforeUpload={() => false}>
      <Button>انتخاب فایل</Button>
    </Upload>
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
      {editingFile ? "ویرایش فایل" : "ثبت فایل"}
    </Button>
  </Form.Item>
</Form>

      </Modal>
    </div>
  );
};

export default File;
