import React from 'react';
import './TextInput.css'

const TextInput = ({ label, placeholder, onChange }) => {
    return (
        <div className='text-input'>

            {Boolean(label) && <label htmlFor="">{label}</label>}

            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default TextInput;