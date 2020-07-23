import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onChangeHandler }) => {
    return (
        <Navbar className="bg-light justify-content-between">
            <div className="col form-group">
                <input type="text" onChange={onChangeHandler} placeholder="Search" className="form-control" />
            </div>
        </Navbar>
    );
}
export default SearchBar;