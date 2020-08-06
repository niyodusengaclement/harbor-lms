import React from "react";
import CourseCard from "../CourseCard";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";

const InstructorDashboard = (props) => {
  const { values, isLoading } = props.courses;
  const publishedCourses = values.length > 0 ? values.filter(({ isPublished }) => isPublished) : [];
  const unPublishedCourses = values.length > 0 ? values.filter(({ isPublished }) => !isPublished) : [];

  return (
    <div className="main-panel">
      <div className="content">
        <div className="container-fluid">
          <h4 className="page-title pb-4">Published</h4>

          <div className="row">
            {
              publishedCourses.length > 0 ? publishedCourses.map((course, idx) => 
                <CourseCard
                  key={idx}
                  course={course}
                />
              ) :<p className="pl-3">You haven't published any course  yet</p>
            }
          </div>
          {/* End of row */}

          <h4 className="page-title pb-4">Unpublished</h4>
          
          <div className="row">
          <Spinner
            animation="border"
            variant="primary"
            className={isLoading ? 'spinner--position__center' : 'hide'}
          />
            {
              unPublishedCourses.length > 0 ? unPublishedCourses.map((course, idx) => 
                <CourseCard
                  key={idx}
                  course={course}
                />
              ) : <p className="pl-3">You don't have unpublished course</p>
            }
          </div>
          {/* End of row */}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard