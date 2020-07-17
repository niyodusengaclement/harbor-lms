import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/styles/welcome.scss";
import "../assets/styles/styles.scss";
import { Link } from "react-router-dom";

const TopHeader = ({ page }) => {
  const toggleMenu = () => {
    const el = document.getElementById('sidebar');
    const b = el.style.display === 'block' ? el.style.display = "none" : el.style.display = "block";
  }
  return (
      <div className="main-header">
        <div className="logo-header">
          <Link to="#" className="logo">
            GORILLA LMS
          </Link>
          <button className="navbar-toggler sidenav-toggler ml-auto" type="button" onClick={toggleMenu} data-toggle="collapse" data-target="collapse" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"><FontAwesomeIcon icon={faBars} /></span>
          </button>
          <button className="topbar-toggler more"><i className="la la-ellipsis-v"></i></button>
        </div>
        <nav className="navbar navbar-header navbar-expand-lg">
          <div className="container-fluid">
            <h5 className="nav-title">{page}</h5>

            <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
              <li className="nav-item">
                <button type="button" className="btn nav-btn" ><span>New course +</span></button>
              </li>
						</ul>
          </div>
        </nav>
		  </div>
  );
};

export default TopHeader;
