import React from 'react';

import Button from './Button';

const Toggler = ({ active, ...props }) => {
  const style = {
    transition: 'transform .1s',
  };

  if (active) {
    style.transform = 'rotate(45deg)';
  }

  return (
    <Button
      icon={(
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 12h-7V5h-1v7H5v1h7v7h1v-7h7"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      )}
      style={style}
      {...props}
    />
  );
};

export default Toggler;
