import React from 'react';
import '../../../App.css'
import './ButtonCircle.css';

const ButtonCircle = (props) => {
    const {children, cssClass, type, onClick, value} = props
    let _type = typeof(type) == 'undefined' ? 'button' : type
    let _cssClass = typeof(cssClass) == 'undefined' ? 'button-circle' : 'button-circle ' + cssClass

    return (
        <button type={_type} className={_cssClass} onClick={onClick} value={value}>
            {children}
        </button>
    );
};

ButtonCircle.displayName = 'ButtonCircle'
export default ButtonCircle;