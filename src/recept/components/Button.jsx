'use client';

import React from 'react';

const Button = ({ children, variant = 'primary', fullWidth = false, style = {}, ...rest }) => {
  const baseStyle = {
    padding: '12px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: rest.disabled ? 'not-allowed' : 'pointer',
    opacity: rest.disabled ? 0.7 : 1,
    border: 'none',
    transition: 'background-color 0.15s ease, transform 0.05s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : undefined,
  };

  const variants = {
    primary: {
      backgroundColor: '#7B3F1E',
      color: 'white',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: '#7B3F1E',
      border: '2px solidrgba(196, 82, 21, 0.63)',
    },
  };

  const mergedStyle = {
    ...baseStyle,
    ...(variants[variant] || variants.primary),
    ...style,
  };

  return (
    <button style={mergedStyle} {...rest}>
      {children}
    </button>
  );
};

export default Button;
