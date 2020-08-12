import React, { useEffect } from "react";
import CourseCard from "../CourseCard";
import { connect, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useFirestoreConnect } from "react-redux-firebase";
import { getAllMembers } from "../../redux/actions/coursesActions";
import { getProfile } from "../../helpers/utils";

const StudentDashboard = (props) => {
  const { values, isLoading } = props.courses;
  const { uid, role } = getProfile();
  const { profile } = props;
  const { members } = props.courses;

  useEffect(() => {
    props.getAllMembers();
  },[]);
  useFirestoreConnect({
    collection: `courses`,
  });
  const courses = useSelector(({firestore}) => firestore.data.courses);
  const allCourses = [];
  const allCoursesKeys = [];

  if(courses) {
    Object.entries(courses).map((values) => allCoursesKeys.push(values));
    const array = allCoursesKeys.length > 0 ? allCoursesKeys.map((arr) => {
      const value = {
        id: arr[0],
        ...arr[1]
      }
      return allCourses.push(value);
    }) : [];
  }
  const acceptedCourses = members.length > 0 ? members.filter(({studentUniqueNumber, status}) => studentUniqueNumber === profile.studentUniqueNumber && status === 'accepted'): [];
  const enrolledIn = acceptedCourses.length > 0 ? acceptedCourses.map((obj) => { 
    const crs = allCourses.length > 0 ? allCourses.find((value) => value.id === obj.courseId) : [];
    return crs;
  }) : [];

  return (
			<div className="main-panel">
      <div className="content">
        <div className="container-fluid">

          <h4 className="page-title pb-4">Courses</h4>
          
          <div className="row">
          <Spinner
            animation="border"
            variant="primary"
            className={isLoading ? 'spinner--position__center' : 'hide'}
          />
            {
              enrolledIn.length > 0 ? enrolledIn.map((course, idx) => 
                <CourseCard
                  key={idx}
                  course={course}
                />
              ) : <p className="pl-3">You don't have any course in progress</p>
            }
          </div>
          {/* End of row */}
        </div>
      </div>
    </div>
  );
};

const mapState = ({ courses }) => ({
  courses
})
export default connect(mapState, {
  getAllMembers: getAllMembers
})(StudentDashboard);