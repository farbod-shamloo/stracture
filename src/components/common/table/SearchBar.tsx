// components/users/SearchBar.tsx
import { Input, Button, Space } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface Props {
  setFilters: (filters: { key: string; label: string }[]) => void
}

const SearchBar = ({ setFilters }: Props) => {
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    if (search.trim()) {
      setFilters([{ key: 'search', label: search }])
    }
  }

  return (
    <Space style={{ marginBottom: 16 }}>
      <Input.Search
        placeholder="جستجو..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        onSearch={handleSearch}
        allowClear
      />
      <Button icon={<FilterOutlined />}>فیلتر</Button>
    </Space>
  )
}

export default SearchBar
