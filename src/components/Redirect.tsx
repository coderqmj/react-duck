import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Redirect(props: { url: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    const { url = '/' } = props;
    setTimeout(() => {
      navigate(url);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
}
