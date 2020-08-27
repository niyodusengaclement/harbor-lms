import React, { useState, useEffect } from "react";
import TopHeader from "../components/TopHeader";
import "../assets/styles/main.scss";
import { connect } from "react-redux";
import { getCourses } from "../redux/actions/coursesActions";
import NewCourseModal from "../components/NewCourseModal";
import { getProfile } from "../helpers/utils";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import InstructorDashboard from "../components/dashboard/InstructorDashboard";

const Dashboard = (props) => {
  const [ show, setShow ] = useState(false);
  const handleShow = () => setShow(!show);

	const buttons = [
    {
      name: 'New Course +',
      clickHandler: handleShow
    },
  ];

  useEffect(() => { props.fetchCourses(); }, []);
  const { values, isLoading } = props.courses;
  const { role } = getProfile();
  const { profile } = props;
  return (
    <div className="wrapper">
      <TopHeader page='Dashboard' buttons={buttons} />
      <NewCourseModal handleShow={handleShow} show={show}  />
      {
        role === 'student' || profile.role === 'student' ?
        <StudentDashboard role={role? role : profile.role} profile={profile} />
        :
        <InstructorDashboard courses={props.courses} />
      }
    </div>
  );
};

const mapStateToProps = ({ courses, firebase }) => ({
  courses,
  profile: firebase.profile,
})

export default connect(mapStateToProps, {
  fetchCourses: getCourses
})(Dashboard);