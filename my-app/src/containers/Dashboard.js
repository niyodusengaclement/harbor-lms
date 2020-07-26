import React, { useEffect } from "react";
import TopHeader from "../components/TopHeader";
import CourseCard from "../components/CourseCard";
import "../assets/styles/main.scss";
import { connect } from "react-redux";
import { getCourses } from "../redux/actions/coursesActions";
import { Spinner } from "react-bootstrap";
import NewCourseModal from "../components/NewCourseModal";

const Dashboard = (props) => {
  // const { role }
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
  const publishedCourses = values.length > 0 ? values.filter(({ isPublished }) => isPublished) : [];
  const unPublishedCourses = values.length > 0 ? values.filter(({ isPublished }) => !isPublished) : [];
  return (
    <div className="wrapper">
      <TopHeader page='Dashboard' buttons={buttons} />
      <NewCourseModal />
      {/* Main panel */}
			<div className="main-panel">
				<div className="content">
					<div className="container-fluid">
						<h4 className="page-title pb-4">Published</h4>

						<div className="row">
              {
                publishedCourses.length > 0 ? publishedCourses.map((course, idx) => 
                  <CourseCard
                    key={idx}
                    course={course}
                  />
                ) :<p className="pl-3">You haven't published any course  yet</p>
              }
						</div>
						{/* End of row */}

						<h4 className="page-title pb-4">Unpublished</h4>
            
						<div className="row">
      <Spinner
            animation="border"
            variant="primary"
            className={isLoading ? 'spinner--position__center' : 'hide'}
            />
              {
                unPublishedCourses.length > 0 ? unPublishedCourses.map((course, idx) => 
                  <CourseCard
                    key={idx}
                    course={course}
                  />
                ) : <p className="pl-3">You don't have unpublished course</p>
              }
						</div>
            {/* End of row */}
					</div>
				</div>
			</div>
			{/* END */}
    </div>
  );
};

const mapStateToProps = ({ courses }) => ({
  courses
})

export default connect(mapStateToProps, {
  fetchCourses: getCourses
})(Dashboard);