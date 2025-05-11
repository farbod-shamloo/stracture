// components/users/UserTable.tsx
import { Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import SearchBar from './SearchBar'
import UserActions from './UserActions'
import UserTag from './UserTag'
import FilterTags from './FilterTags'

interface User {
  key: number
  firstName: string
  lastName: string
  username: string
  phone: string
  status: 'فعال' | 'غیرفعال'
  twoStep: 'فعال' | 'غیرفعال'
  type: 'مدیر' | 'پشتیبان'
}

const initialData: User[] = [
  {
    key: 1,
    firstName: 'رضا',
    lastName: 'رستمی',
    username: '721***',
    phone: '0912***',
    status: 'فعال',
    twoStep: 'غیرفعال',
    type: 'مدیر',
  },
  {
    key: 2,
    firstName: 'رضا',
    lastName: 'رستمی',
    username: '721***',
    phone: '0912***',
    status: 'فعال',
    twoStep: 'غیرفعال',
    type: 'مدیر',
  },
  {
    key: 3,
    firstName: 'رضا',
    lastName: 'رستمی',
    username: '721***',
    phone: '0912***',
    status: 'فعال',
    twoStep: 'غیرفعال',
    type: 'مدیر',
  },
  // بقیه دیتا...
]

const UserTable = () => {
  const [data, setData] = useState<User[]>(initialData)
  const [filters, setFilters] = useState<{ key: string; label: string }[]>([])

  const handleRemoveFilter = (key: string) => {
    setFilters(prev => prev.filter(f => f.key !== key))
    // اینجا دیتا رو مجدد فیلتر کن
  }
  const columns: ColumnsType<User> = [
    {
      title: 'ردیف',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'نام و نام خانوادگی',
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'کد ملی',
      dataIndex: 'username',
    },
    {
      title: 'تلفن',
      dataIndex: 'phone',
    },
    {
      title: 'وضعیت کاربر',
      render: (_, record) => <UserTag type="status" value={record.status} />,
    },
    {
      title: 'ورود دو مرحله‌ای',
      render: (_, record) => <UserTag type="twoStep" value={record.twoStep} />,
    },
    {
      title: 'نوع کاربر',
      render: (_, record) => <UserTag type="type" value={record.type} />,
    },
    {
      title: 'عملیات',
      render: (_, record) => <UserActions user={record} />,
    },
  ];
  

  return (
    <>
      <SearchBar setFilters={setFilters} />
      <FilterTags filters={filters} onRemove={handleRemoveFilter} />
      <Table className="custom-user-table" columns={columns} dataSource={data} pagination={{ pageSize: 5 }}  rowClassName={(_, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')} />
    </>
  )
}

export default UserTable
