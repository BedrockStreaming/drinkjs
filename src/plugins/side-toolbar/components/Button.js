import React from 'react';

import styles from './Button.css';

const Button = ({ icon, className, ...other }) => (
  <button
    className={`${styles.button} ${className}`}
    onMouseDown={e => e.preventDefault()}
    {...other}
  >
    {icon}
  </button>
);

export default Button;
