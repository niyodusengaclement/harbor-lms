import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/card.scss";

const CourseCard = ({ name, hasImage, imageUrl, description, isPublished, color }) => {
  return (
    <>
      <div className="col-md-3">
        <div className="card course-card">
          {
          hasImage ? <div className="course-image"><img className="card-img-top img-fluid course-image" src={imageUrl} alt=""/></div> : 
          <div style={{backgroundColor: color}} className="course-image"></div>
          }
          <div className="button mb-1">
            <button className="float-right publish-unpublish-btn"><span>{isPublished ? 'Unpublish' : 'Publish'}</span></button>
          </div>
          <div className="card-block p-3">
            <p className="course-title"><Link to="">{name}</Link></p>
            <p className="card-text card-font">
            {
              !description ? 
              null
              : 
              description.length < 60 ? description.substr(0, 60) : `${description.substr(0, 60)}...`
            }
            </p>
          </div>
        </div>
			</div>
    </>
  );
};

export default CourseCard;



