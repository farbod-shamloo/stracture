// UserFilter.tsx
import React from 'react';
import Filter from './Filter';

const UserFilter = () => {
  return (
    <div>
      <h1>استفاده از فیلتر</h1>
      <Filter 
        title="فیلتر محصولات"
        content={<p>اینجا می‌توانید فیلترهای مختلف را برای محصولات اضافه کنید.</p>}
      />
    </div>
  );
};

export default UserFilter;
