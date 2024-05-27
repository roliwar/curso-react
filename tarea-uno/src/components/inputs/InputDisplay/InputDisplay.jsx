import React from 'react';
import './InputDisplay.css';

const InputDisplay = (props) => {
    const {text} = props
    return (
        <input type="text" className="display" readOnly value={text}>
        </input>
    );
};

InputDisplay.displayName = 'Display'
export default InputDisplay;