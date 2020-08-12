import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import {
  getCourseSectionByName,
  deleteCourseSection,
} from "../redux/actions/coursesActions";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";

const DropdownComponent = (props) => {
  const { type, handleClick, rowId } = props;
  const [isToggled, toggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmation,setDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (props.section) setIsLoading(false);
    if(props.section && deleteConfirmation === true){
      props.deleteCourseSection(localStorage.getItem("courseId"),props.section.id);
    }
  }, [props.section]);

  const toggleModal = (target) => {
    if (target.name === "section") {
      setIsLoading(true);
      props.getCourseSectionByName(localStorage.getItem("courseId"), target.id);
      toggle(!isToggled);
    } else if (target.name === "delete"){
      setIsLoading(true);
      props.getCourseSectionByName(localStorage.getItem("courseId"), target.id);
      const response = window.confirm("Are you sure you want to delete?");
      setDeleteConfirmation(response);
    }
  };
  const displayModal = (modalFlag) => {
    if (modalFlag === true) {
      return (
        <Modal
          toggled={isToggled}
          modalTitle="Edit section"
          sectionName={props.section.sectionName}
          calendarSystem={props.section.calendarSystem}
          semOrTrim={props.section.semOrTrim}
          startingDate={props.section.startingDate}
          closingDate={props.section.closingDate}
          sectionId={props.section.sectionId}
          sectionUid={props.section.id}
        />
      );
    }
  };
  return (
    <div className="dropdown">
      <Spinner
        animation="border"
        variant="primary"
        className={isLoading ? "spinner--position__center" : "hide"}
      />
      {displayModal(isLoading === false)}
      <h5 className="dropbtn">...</h5>
      <div className="dropdown-content">
        <a
          id={rowId}
          href="#/"
          name="section"
          onClick={(event) => toggleModal(event.target)}
        >
          edit
        </a>
        <a
          id={rowId}
          href="#/"
          name="delete"
          onClick={(event) => toggleModal(event.target)}
        >
          delete
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    section: state.courses.section,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCourseSectionByName: (courseId, sectionName) =>
      dispatch(getCourseSectionByName(courseId, sectionName)),
    deleteCourseSection: (courseId, sectionId) =>
      dispatch(deleteCourseSection(courseId, sectionId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DropdownComponent);
