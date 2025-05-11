// components/users/UserTag.tsx
import { Tag } from 'antd'

interface Props {
  type: 'status' | 'twoStep' | 'type'
  value: string
}

const UserTag = ({ type, value }: Props) => {
  let color: string = 'default'

  if (type === 'status') {
    color = value === 'فعال' ? 'green' : 'red'
  } else if (type === 'twoStep') {
    color = value === 'فعال' ? 'green' : 'red'
  } else if (type === 'type') {
    color = value === 'مدیر' ? 'blue' : 'cyan'
  }

  return <Tag color={color}>{value}</Tag>
}

export default UserTag
