// components/users/FilterTags.tsx
import { Tag } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

interface Props {
  filters: { key: string; label: string }[]
  onRemove: (key: string) => void
}

const FilterTags = ({ filters, onRemove }: Props) => {
  return (
    <div style={{ marginBottom: 16 }}>
      {filters.map(filter => (
        <Tag
          key={filter.key}
          closable
          onClose={() => onRemove(filter.key)}
          closeIcon={<CloseOutlined />}
          color="blue"
        >
          {filter.label}
        </Tag>
      ))}
    </div>
  )
}

export default FilterTags
