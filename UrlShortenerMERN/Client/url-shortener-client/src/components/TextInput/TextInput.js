import React from 'react';
import './TextInput.css'

const TextInput = ({ label, placeholder, onChange,type, value }) => {
    return (
        <div className='text-input'>

            {Boolean(label) && <label htmlFor="">{label}</label>}

            <input
                type={type}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                value = {value}
            />
        </div>
    );
};

export default TextInput;