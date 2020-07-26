import React from 'react';

export default (props) => {
    const {handleClick} = props;
    return (
        <div className="dropdown">
                <h5 className="dropbtn">...</h5>
                <div className="dropdown-content">
                  <a href="#/here1" name="publish" onClick={(event) => handleClick(event.target)}>update</a>
                  <a href="#/here2" name="invite" onClick={(event) => handleClick(event.target)}>delete</a>
                </div>
              </div>
    )
}