import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/card.scss";
import { instructor, student } from "./submenus";
import { connect } from "react-redux";


const Submenu = ({ page, userProfile }) => {
	const menus = userProfile.role === 'instructor' ? instructor : student;

  return (
    <>
      <div className="col-md-2">
        <div className="card p-4 submenu-small">
            {
              menus.map(({ name, url }, idx) => 
                <p key={idx} className={page === name ? 'submenu isActive' : 'submenu'}>
                  <Link to={`/courses/${localStorage.getItem('courseId')}${url}`}>
                    {name}
                  </Link>
                </p>
              )
            }
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ firebase }) => {
	return {
	  userProfile: firebase.profile,
	}
  }

export default connect(mapStateToProps)(Submenu);
