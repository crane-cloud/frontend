import React from 'react';
import './InputText.css';

const InputText = props => {
    return <input 
        className="Input-Text"
        type="text"
        value={props.value}
        placeholder={props.value} />;
};

export default InputText;