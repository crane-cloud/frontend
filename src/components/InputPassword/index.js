import React from 'react';
import './InputPassword.css';

const InputPassword = props => {
    return <input 
        className="Input-Password"
        type="password"
        // value={props.value}
        placeholder={props.placeholder} />;
};

export default InputPassword;