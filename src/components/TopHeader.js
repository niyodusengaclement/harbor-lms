import React, { useEffect } from "react";
import { faBars, faEllipsisV, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/styles/styles.scss";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar/index";
import { connect } from "react-redux";
import { Dropdown } from 'react-bootstrap';

const TopHeader = (props) => {
  useEffect(() => {
    document.getElementById('top-toggle-close').style.display = 'none';
  }, []);

	const {userProfile} = props;
  const isInstructor = userProfile.role === 'instructor' ? true : false;
  
  const showSidebar = () => {
    document.getElementById('side-nav-small').style.display = 'block';
    document.getElementById('top-toggle-close').style.display = 'block';
    document.getElementById('top-toggle-open').style.display = 'none';
  }

  const hideSidebar = () => {
    document.getElementById('side-nav-small').style.display = 'none';
    document.getElementById('top-toggle-close').style.display = 'none';
    document.getElementById('top-toggle-open').style.display = 'block';
  }

  return (
    <>
      <div id="side-nav-small" className="side-nav-small"><Sidebar /></div>
      <div className="side-nav-big"><Sidebar /></div>
      <div className="main-header">
        <div className="logo-header">
          <Link to="#" className="logo">
            Harbor LMS
          </Link>
          <button id="top-toggle-close" className="navbar-toggler sidenav-toggler ml-auto" type="button" onClick={hideSidebar}>
            <span className="top-toggle-close"><FontAwesomeIcon className="top-icons" icon={faTimes} /></span>
          </button>
          <button id="top-toggle-open"  className="navbar-toggler sidenav-toggler ml-auto" type="button" onClick={showSidebar}>
            <span className="navbar-toggler-icon"><FontAwesomeIcon className="top-icons" icon={faBars} /></span>
          </button>
          <div className={isInstructor && props.buttons && props.buttons.length > 0 ? "dropdown-no-caret float-right" : "hide"} >
            <Dropdown className="topbar-toggler more">
              <Dropdown.Toggle id="dropdown-button-drop-left">
                <div className="drop-menu"><FontAwesomeIcon className="top-icons" icon={faEllipsisV} /></div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
              {
                isInstructor && props.buttons && props.buttons.length > 0 ?
                props.buttons.map((btn, idx) =>
                <Dropdown.Item onClick={btn.clickHandler} key={idx}>{btn.name}</Dropdown.Item>
                ) 
                :
                null
              }
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <nav className="navbar navbar-header navbar-expand-lg">
          <div className="container-fluid">
            <h5 className="nav-title">{props.page}</h5>

            <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
              <li className="nav-item">
                <div>
                  {
                  isInstructor && props.buttons && props.buttons.length > 0 ?
                  props.buttons.map((btn, idx) =>
                  <button type="button" className={!btn.class ? "blue-btn" : btn.class} key={idx} name={btn.name} onClick={btn.clickHandler}><span>{btn.name}</span></button>
                  ) 
                  :
                  null
                }
                </div>
              </li>
						</ul>
          </div>
        </nav>
		  </div>
  </>
  );
};

const mapStateToProps = ({ firebase }) => ({
  userProfile: firebase.profile,
})

export default connect(mapStateToProps)(TopHeader);
