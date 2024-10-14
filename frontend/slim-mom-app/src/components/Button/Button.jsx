import React from 'react';
import './Button.css'; // Import the CSS file

export const Button = ({ children, full, type }) => {
  return full ? (
    <button className="button-full" type={type}>
      {children}
    </button>
  ) : (
    <button className="button-empty" type={type}>
      {children}
    </button>
  );
};

export default Button;
