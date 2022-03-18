import React, { memo } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Mine = memo(() => {
  const navigate = useNavigate();
  return (
    <div>
      <Button type="primary" onClick={() => navigate('/home')}>
        首页
      </Button>
      <header>我是个人资料</header>
    </div>
  );
});

export default Mine;
