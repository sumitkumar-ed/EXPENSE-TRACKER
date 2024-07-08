import React from 'react';
import './Button.css';

const Button = ({ onClick, children, color, style, boxShadow }) => (
  <button className={`custom-button ${color} ${boxShadow ? 'box-shadow' : ''}`} onClick={onClick} style={style}>
    {children}
  </button>
);

export default Button;
