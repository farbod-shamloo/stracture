// Filter.tsx
import React, { useState } from 'react';
import { Modal } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';

interface FilterProps {
  title: string;
  content: React.ReactNode;
}

const Filter: React.FC<FilterProps> = ({ title, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log("مدال باز شد"); // برای بررسی اینکه showModal درست کار می‌کند
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition bg-gray-100"
        onClick={showModal}
      >
        <Icon icon="solar:filter-linear" width="24" height="24" />
      </button>

      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {content}
      </Modal>
    </div>
  );
};

export default Filter;
