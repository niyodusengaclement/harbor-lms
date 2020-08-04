import React, { useEffect, useState } from "react";
import SpecificCourse from "../components/SpecificCourse";
import { connect } from "react-redux";
import { getCourses } from "../redux/actions/coursesActions";
import Chat from "../components/Chat";

const Discussions = (props) => {
  
  const { courses, match: { params }  } = props;

  useEffect(() => {
    const { match: { params }  } = props;
    props.fetchCourses();
  }, []);

  const course = courses.values.length > 0 ? courses.values.filter(({id}) => id === params.courseId) : [];
  const title = !course[0] ? '' : `${course[0].name} > Discussions`;

  localStorage.setItem('courseId', params.courseId);
  if (course.length > 0) localStorage.setItem('courseName', course[0].name);


  return (
    <SpecificCourse page={title} submenu="Discussions" >

      <div className="col-md-10">
      <h4 className="page-title pb-3">Discussions</h4>
        <Chat />
      </div>
    </SpecificCourse>
  );
}

const mapStateToProps = ({courses, firebase }) => ({
  courses,
  userProfile: firebase.profile,
});

export default connect(mapStateToProps, {
  fetchCourses: getCourses,
})(Discussions);