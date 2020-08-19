import React, { useState, useEffect } from "react";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import {
  getCourseSectionBySectionId,
  deleteCourseSection,
} from "../redux/actions/coursesActions";
import { connect } from "react-redux";
import { Spinner, Dropdown } from "react-bootstrap";

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
      props.getCourseSectionBySectionId(localStorage.getItem("courseId"), target.id);
      toggle(!isToggled);
    } else if (target.name === "delete"){
      setIsLoading(true);
      props.getCourseSectionBySectionId(localStorage.getItem("courseId"), target.id);
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
          academicYear={props.section.academicYear}
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
    <div className="">
      <Spinner
        animation="border"
        variant="primary"
        className={isLoading ? "spinner--position__center" : "hide"}
      />
      {displayModal(isLoading === false)}

      <div className="dropdown-no-caret float-right">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-button-drop-left">
            <div className="drop-menu"><FontAwesomeIcon icon={faEllipsisH} /></div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item id={rowId} name="section" onClick={(event) => toggleModal(event.target)}>Edit</Dropdown.Item>
            <Dropdown.Item id={rowId} className="required" name="delete" onClick={(event) => toggleModal(event.target)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
    getCourseSectionBySectionId: (courseId, sectionName) =>
      dispatch(getCourseSectionBySectionId(courseId, sectionName)),
    deleteCourseSection: (courseId, sectionId) =>
      dispatch(deleteCourseSection(courseId, sectionId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DropdownComponent);
