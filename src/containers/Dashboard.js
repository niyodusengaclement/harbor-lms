import React, { useEffect } from "react";
import TopHeader from "../components/TopHeader";
import CourseCard from "../components/CourseCard";
import "../assets/styles/main.scss";
import { connect } from "react-redux";
import { getCourses } from "../redux/actions/coursesActions";
import { Spinner } from "react-bootstrap";
import NewCourseModal from "../components/NewCourseModal";
import { getProfile } from "../helpers/utils";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import InstructorDashboard from "../components/dashboard/InstructorDashboard";

const Dashboard = (props) => {
  const toggleCourseModal = () => {
    const el = document.getElementById('newCourseModal');
    const el1 = el.style.display === 'block' ? el.style.display = 'none' : el.style.display = 'block';
  }

	const buttons = [
    {
      name: 'New Course +',
      clickHandler: toggleCourseModal
    },
  ];

  useEffect(() => { props.fetchCourses(); }, []);
  const { values, isLoading } = props.courses;
  const { role } = getProfile();
  const { profile } = props;
  return (
    <div className="wrapper">
      <TopHeader page='Dashboard' buttons={buttons} />
      <NewCourseModal />
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