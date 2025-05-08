import React from "react";
import { Card, Col, Row, Table, Tag } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "کاربران",
      value: "1,280",
      icon: <UserOutlined className="text-white text-3xl" />,
      bg: "bg-gradient-to-r from-purple-500 to-indigo-500",
    },
    {
      title: "سفارشات",
      value: "320",
      icon: <ShoppingCartOutlined className="text-white text-3xl" />,
      bg: "bg-gradient-to-r from-pink-500 to-red-500",
    },
    {
      title: "درآمد امروز",
      value: "45,800,000 تومان",
      icon: <DollarCircleOutlined className="text-white text-3xl" />,
      bg: "bg-gradient-to-r from-green-400 to-emerald-500",
    },
    {
      title: "محصولات",
      value: "86",
      icon: <AppstoreOutlined className="text-white text-3xl" />,
      bg: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
  ];

  const orders = [
    {
      key: "1",
      name: "علی محمدی",
      product: "هدفون",
      amount: "1,200,000 تومان",
      status: "ارسال شده",
    },
    {
      key: "2",
      name: "مریم صالحی",
      product: "لپ‌تاپ",
      amount: "28,000,000 تومان",
      status: "در حال بررسی",
    },
    {
      key: "3",
      name: "حمید تقوی",
      product: "ساعت هوشمند",
      amount: "3,500,000 تومان",
      status: "لغو شده",
    },
  ];

  const columns = [
    {
      title: "نام مشتری",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "محصول",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "مبلغ",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = status === "ارسال شده" ? "green" : status === "لغو شده" ? "red" : "gold";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              className={`text-white rounded-2xl shadow-lg overflow-hidden ${stat.bg}`}
              bodyStyle={{ padding: 20 }}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-light">{stat.title}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
                <div>{stat.icon}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="mt-6 rounded-xl shadow" title="آخرین سفارش‌ها">
        <Table
          dataSource={orders}
          columns={columns}
          pagination={false}
          className="rounded-xl"
        />
      </Card>
    </div>
  );
};

export default Dashboard;
