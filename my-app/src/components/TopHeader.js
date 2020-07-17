import React from "react";
import { faBars, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/styles/styles.scss";
import { Link } from "react-router-dom";
import NewCourseModel from "../components/NewCourseModal";
import Sidebar from "./Sidebar/index";

const TopHeader = (props) => {
  const showOrHideSidebar = () => {
    const el = document.getElementById('sidebar');
    const el1 = el.style.display === 'block' ? el.style.display = 'none' : el.style.display = 'block';
  }
  const rightToggle = () => {
    const el = document.getElementById('dropdown');
    const el1 = el.style.display === 'block' ? el.style.display = 'none' : el.style.display = 'block';
  }
  
  const toggleCourseModal = () => {
    const el = document.getElementById('newCourseModal');
    const el1 = el.style.display === 'block' ? el.style.display = 'none' : el.style.display = 'block';
  }

  return (
    <>
      <Sidebar />
      <NewCourseModel />
      <div className="main-header">
        <div className="logo-header">
          <Link to="#" className="logo">
            GORILLA LMS
          </Link>
          <button className="navbar-toggler sidenav-toggler ml-auto" type="button" onClick={showOrHideSidebar}>
            <span className="navbar-toggler-icon"><FontAwesomeIcon className="top-icons" icon={faBars} /></span>
          </button>
          <button className="topbar-toggler more" onClick={rightToggle}><FontAwesomeIcon className="top-icons" icon={faEllipsisV} /></button>
          
          <div className="dropdown" >
              <div className="dropdown-menu float-right" id="dropdown">
                <button className="dropdown-item" onClick={toggleCourseModal}>New course +</button>
              </div>
          </div>
        </div>
        <nav className="navbar navbar-header navbar-expand-lg">
          <div className="container-fluid">
            <h5 className="nav-title">{props.page}</h5>

            <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
              <li className="nav-item pl-2">
                <div>
                  <button id="navbar-nav-menu" type="button" className="blue-btn" onClick={toggleCourseModal}><span>New course +</span></button>
                </div>
              </li>
						</ul>
          </div>
        </nav>
		  </div>
  </>
  );
};
export default TopHeader;
