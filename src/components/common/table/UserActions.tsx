// components/users/UserActions.tsx
import { Space, Tooltip } from 'antd'
import {
  
  EditOutlined,
  EyeOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'

import { Icon } from '@iconify/react';

interface Props {
  user: any
}

const UserActions = ({ user }: Props) => {
  const handleDelete = () => {
    console.log('حذف کاربر', user)
  }

  const handleEdit = () => {
    console.log('ویرایش کاربر', user)
  }

  const handleView = () => {
    console.log('نمایش کاربر', user)
  }

  const handleChangeRole = () => {
    console.log('تغییر نقش', user)
  }

  return (
    <Space>
         <Tooltip title="نمایش">
         <Icon icon="solar:shield-keyhole-outline" width="30" height="30"  onClick={handleView} />
      </Tooltip>
      <Tooltip title="نمایش">
      <Icon icon="solar:key-minimalistic-square-3-outline" width="30" height="30"  onClick={handleView} />
      </Tooltip>
      <Tooltip title="تغییر نقش">
      <Icon icon="garden:exit-stroke-16" width="30" height="30"   onClick={handleChangeRole} />
      </Tooltip>
      <Tooltip title="ویرایش">
        <Icon icon="mage:edit" width="30" height="30"   onClick={handleEdit} />
      </Tooltip>
      <Tooltip title="حذف">
        <Icon icon="proicons:delete"  width="30" height="30" style={{ color: 'red' }} onClick={handleDelete} />
      </Tooltip>
    </Space>
  )
}

export default UserActions
