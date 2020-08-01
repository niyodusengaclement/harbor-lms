import React, { useState, useEffect } from "react";
import SpecificCourse from "../components/SpecificCourse";
import "../assets/styles/containers/courseSection.scss";
import Modal from "../components/Modal";
import Btn from "../components/Btn";
import { connect } from "react-redux";
import { getCourseSections, getCourses } from "../redux/actions/coursesActions";
import { Spinner } from "react-bootstrap";
import TableLayout from "../components/TableLayout";
import DropDown from "../components/DropDown";


const CourseSection = (props) => {
  const [isToggled, toggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageRefreshed,setIsPageRefreshed] = useState('');
  const [dropDownState, setDropDownState] = useState(false);

  const { courses, match: { params }  } = props;
  useEffect(() => {
    setIsLoading(true)
    props.fetchCourses();
    props.getCourseSections(params.courseId, setIsLoading);
  }, []);

  useEffect(() => {
    if(props.sections.length){
    setIsLoading(false);
  }
  }, [props.actionMessage,props.sections]);

  const handleClick = () => toggle(!isToggled);

  const course = courses.length > 0 ? courses.filter(({id}) => id === params.courseId) : [];

  localStorage.setItem('courseId', params.courseId);
  if (course.length > 0) localStorage.setItem('courseName', course[0].name);

  if(isPageRefreshed){
     window.location.reload(false);
     setIsPageRefreshed('');
    }

  const handleDropdown = (target) => {
    if (target.id === "dropdown") {
      setDropDownState(!dropDownState);
    }
  };
  const tableRows = props.sections;
  return (
    <SpecificCourse
      page={`${localStorage.getItem("courseName")} > Settings`}
      submenu="Settings"
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
        <>
      <div className="col-md-8 section--body">
      <h6>COURSE SECTIONS</h6>
      <p>Create sections for different course offering intakes.</p>

      {/* <SearchBar onChangeHandler={onSearchHandler} /> */}
      
        <div className="carded-table-scroll">  
        <TableLayout headers={['Name', 'ID', 'Start Date', 'End Date', 'Members', '']}>      
        {
          tableRows.length ? 
          tableRows.map((tableRow) => 
            <tr>
              <td>{tableRow.sectionName}</td>
              <td>{tableRow.sectionId}</td>
              <td>{tableRow.startingDate}</td>
              <td>{tableRow.closingDate}</td>
              <td>{tableRow.members}</td>
              <td>
                <DropDown handleClick={handleDropdown} rowId={tableRow.sectionName} />
              </td>
            </tr>
          )
        : <p>No data found</p>
        }
        </TableLayout>
        </div>
        </div>
        <div className="col">
          <h5>Notifications</h5>
        </div>
        </>
      <Modal toggled={isToggled } />
    </SpecificCourse>
  );
};
const mapStateToProps = ({ courses }) => {
  return {
    courses: courses.values,
    sections: courses.sections,
    actionMessage: courses.message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCourseSections: (courseId,setIsLoading,setIsPageRefreshed) => dispatch(getCourseSections(courseId,setIsLoading,setIsPageRefreshed)),
    fetchCourses: () => dispatch(getCourses()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseSection);
