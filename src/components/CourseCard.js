import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/card.scss";
import { connect } from "react-redux";
import { updateCourse } from "../redux/actions/coursesActions";
import NewCourseModal from "./NewCourseModal";

const CourseCard = (props) => {
  const [show, setShow] = useState(false);
  const [courseObject, setCourseObject] = useState();

  const updateState = (data) => {
    data.isPublished = !data.isPublished;
    props.update(data);
  };
  const setCourseToStorage = (course) => {
    localStorage.setItem("courseName", course.name);
    localStorage.setItem("courseId", course.id);
  };
  const isOwner =
    props.course.instructorId === localStorage.getItem("rems_user_id")
      ? true
      : false;

  const handleShow = () => setShow(!show);

  const handleEdit = (val) => {
    setCourseObject(val);
    handleShow();
  };

  return (
    <>
      <NewCourseModal
        courseInfo={courseObject}
        handleShow={handleShow}
        show={show}
      />
      <div className="col-md-3">
        <div className="card course-card">
          {props.course.hasImage ? (
            <div className="course-image">
              <img
                className="card-img-top img-fluid course-image"
                src={props.course.imageUrl}
                alt=""
              />
            </div>
          ) : (
            <div
              style={{ backgroundColor: props.course.color }}
              className="course-image"
            ></div>
          )}
          <div className="button mb-1">
            {isOwner ? (
              <>
                <button
                  className="publish-unpublish-btn btn-left blue-color"
                  onClick={() => handleEdit(props.course)}
                >
                  <span>Edit</span>
                </button>
                <button
                  className="publish-unpublish-btn btn-right blue-color"
                  onClick={() => updateState(props.course)}
                >
                  <span>
                    {props.course.isPublished ? "Unpublish" : "Publish"}
                  </span>
                </button>
              </>
            ) : null}
          </div>
          <div className="card-block p-3">
            <p className="course-title">
              <Link
                className="black-links"
                onClick={() => setCourseToStorage(props.course)}
                to={`courses/${props.course.id}/notes`}
              >
                {props.course.name}
              </Link>
            </p>
            <p className="card-text card-font">
              {!props.course.description
                ? null
                : props.course.description.length < 60
                ? props.course.description.substr(0, 60)
                : `${props.course.description.substr(0, 60)}...`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  update: updateCourse,
})(CourseCard);
