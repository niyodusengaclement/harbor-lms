import React from 'react';

const SearchBar = ({ onChangeHandler }) => {
    return (
        <div className="col form-group">
            <input type="text" onChange={onChangeHandler} placeholder="Search" className="form-control" />
        </div>
    );
}
export default SearchBar;