import React from 'react';

import "./Button.css"

const Button = ({label,variant="primary",onClick}) => {
    return (
        <button onClick={onClick} className={`button button__${variant}`}>
      {label}
        </button>
    );
};

export default Button;