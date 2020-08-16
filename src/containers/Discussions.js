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

  const title = `${localStorage.getItem('courseName')} > Discussions`;

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