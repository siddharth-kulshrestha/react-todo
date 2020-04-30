import React from 'react';
import './button.css';

export const Button = ({ onClick, text }) => (
    <span className="button-container" onClick={onClick} >
        {text}
    </span>
);
