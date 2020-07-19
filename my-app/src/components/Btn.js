import React from 'react';
import {Button } from 'react-bootstrap';
import '../assets/styles/components/btn.scss'
export default ({name, label, handleClick}) => {
    return(
        <Button name={name} className="btn" onClick={(event) => handleClick(event.target)}>{label}</Button>
    )
}