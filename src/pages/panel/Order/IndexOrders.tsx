import React, { useState } from "react";
import { Card, Table, Tag, Select, Input, Space } from "antd";

const { Option } = Select;
const { Search } = Input;

const Orders: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  const allOrders = [
    {
      key: "1",
      name: "علی محمدی",
      product: "هدفون بی‌سیم",
      amount: "1,200,000 تومان",
      status: "ارسال شده",
      date: "1403/02/10",
    },
    {
      key: "2",
      name: "مریم صالحی",
      product: "لپ‌تاپ مک‌بوک",
      amount: "38,000,000 تومان",
      status: "در حال بررسی",
      date: "1403/02/09",
    },
    {
      key: "3",
      name: "حمید تقوی",
      product: "ساعت هوشمند",
      amount: "3,500,000 تومان",
      status: "لغو شده",
      date: "1403/02/08",
    },
    {
      key: "4",
      name: "نازنین جباری",
      product: "موس گیمینگ",
      amount: "880,000 تومان",
      status: "ارسال شده",
      date: "1403/02/08",
    },
  ];

  const filteredOrders = allOrders.filter((order) => {
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    const matchesSearch = order.name.includes(searchText) || order.product.includes(searchText);
    return matchesStatus && matchesSearch;
  });

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
      title: "تاریخ سفارش",
      dataIndex: "date",
      key: "date",
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
      <Card
        title="لیست سفارش‌ها"
        className="rounded-xl shadow"
        extra={
          <Space>
            <Search
              placeholder="جستجوی سفارش..."
              onSearch={(value) => setSearchText(value)}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
              allowClear
            />
            <Select
              placeholder="فیلتر وضعیت"
              allowClear
              onChange={(value) => setStatusFilter(value)}
              style={{ width: 160 }}
            >
              <Option value="ارسال شده">ارسال شده</Option>
              <Option value="در حال بررسی">در حال بررسی</Option>
              <Option value="لغو شده">لغو شده</Option>
            </Select>
          </Space>
        }
      >
        <Table
          dataSource={filteredOrders}
          columns={columns}
          pagination={{ pageSize: 5 }}
          className="rounded-xl"
        />
      </Card>
    </div>
  );
};

export default Orders;
