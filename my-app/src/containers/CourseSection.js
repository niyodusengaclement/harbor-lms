import React, { useState, useEffect } from "react";
import SpecificCourse from "../components/SpecificCourse";
import Table from "../components/Table";
import "../assets/styles/containers/courseSection.scss";
import Modal from "../components/Modal";
import Btn from "../components/Btn";
import { connect } from "react-redux";
import { getCourseSections } from "../redux/actions/coursesActions";
import { Spinner } from "react-bootstrap";


const CourseSection = (props) => {
  const [isToggled, toggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageRefreshed,setIsPageRefreshed] = useState('');

  useEffect(() => {
    setIsLoading(true)
    props.getCourseSections(localStorage.getItem("courseId"),setIsLoading);
  }, []);

  useEffect(() => {
    if(props.sections.length){
    setIsLoading(false);
  }
  }, [props.actionMessage,props.sections]);

  const handleClick = async(target) => {
    if (target.id === "section" || target.name === "section") {
      toggle(!isToggled);
    }
  };

  if(isPageRefreshed){
     window.location.reload(false);
     setIsPageRefreshed('');
    }
  return (
    <SpecificCourse
      page={`${localStorage.getItem("courseName")} > settings`}
      submenu="settings"
    >
      <Spinner
        animation="border"
        variant="primary"
        className={isLoading ? "spinner--position__center" : "hide"}
      />
      <Btn
        name="section"
        label="Add section"
        handleClick={handleClick}
        className="members--btn__top blue-btn modal--btn"
      />
      <div className="section--body">
        <h6>COURSE SECTIONS</h6>
        <p>Create sections for different course offering intakes.</p>
        <Table tableRows={props.sections || ''} isLoading={isLoading}/>
      </div>
      <Modal toggled={isToggled } />
    </SpecificCourse>
  );
};
const mapStateToProps = (state) => {
  console.log('state: ',state);
  return {
    sections: state.courses.sections,
    actionMessage: state.courses.message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCourseSections: (courseId,setIsLoading,setIsPageRefreshed) => dispatch(getCourseSections(courseId,setIsLoading,setIsPageRefreshed)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseSection);
