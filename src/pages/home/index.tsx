import React, { memo } from 'react';
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DuckCmpProps } from 'saga-duck';
import HomeDuck from './HomeDuck';

const Home = memo((props: DuckCmpProps<HomeDuck>) => {
  const navigate = useNavigate();
  const {
    duck: { creators, selector, selectors },
    dispatch,
    store,
  } = props;
  const { title } = selector(store);
  const message = selectors.message(store);

  return (
    <div>
      <Button type="primary" onClick={() => navigate('/mine')}>
        个人资料
      </Button>
      <header>{message}</header>
      <div>{title}</div>
      <Input onChange={(e) => dispatch(creators.setTitle(e.target.value))} />
    </div>
  );
});

export default Home;
