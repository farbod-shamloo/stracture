import { Badge, Popover, Button } from 'antd';
import { BellOutlined, SmileOutlined } from '@ant-design/icons';

const NotificationPopover = () => {
  return (
    <Popover
      trigger="hover"
      placement="bottomRight"
      content={
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <SmileOutlined style={{ fontSize: 24, color: '#999' }} />
          <div style={{ marginTop: 8 }}>پیامی ندارید</div>
        </div>
      }
    >
      <Badge
        count={0}
        showZero
        style={{
          backgroundColor: 'red',
          color: 'white',
          fontWeight: 'bold',
        }}
        size="small"
      >
        <Button
          type="text"
          icon={<BellOutlined style={{ fontSize: 20, color: "white" }} />}
        />
      </Badge>
    </Popover>
  );
};

export default NotificationPopover;
