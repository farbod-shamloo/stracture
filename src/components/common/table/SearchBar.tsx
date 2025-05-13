// components/users/SearchBar.tsx
import { Input, Button, Space } from 'antd'
import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
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
  <Input
    placeholder="جستجو..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    prefix={<SearchOutlined />}
    style={{
      paddingRight: "8px",
      width: 250,
    }}
  />
  
  <Button
    type="primary"
    onClick={handleSearch}
    style={{
      backgroundColor: "#1890ff", // رنگ آبی
      borderColor: "#1890ff",
      color: "#fff",
    }}
  >
    جستجو
  </Button>

  <Button icon={<FilterOutlined />} />
</Space>
  )
}

export default SearchBar
