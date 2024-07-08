import React from 'react';
import './Button.css';

const Button = ({ onClick, children, color, style }) => (
  <button className={`custom-button ${color}`} onClick={onClick} style={style}>
    {children}
  </button>
);

export default Button;
