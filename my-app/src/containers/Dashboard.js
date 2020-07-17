import React, { useEffect } from "react";
import TopHeader from "../components/TopHeader";
import CourseCard from "../components/CourseCard";
import "../assets/styles/main.scss";
import { connect } from "react-redux";
import AlertComponent from '../components/Alert';
import { getCourses } from "../redux/actions/coursesActions";
import { Spinner } from "react-bootstrap";

const Dashboard = (props) => {
  useEffect(() => { props.fetchCourses(); }, []);
  const { values, isLoading } = props.courses;
  console.log(values);
  const publishedCourses = values.length > 0 ? values.filter(({ isPublished }) => isPublished) : [];
  const unPublishedCourses = values.length > 0 ? values.filter(({ isPublished }) => !isPublished) : [];
  return (
    <div className="wrapper">
      <TopHeader page='Dashboard'/>
      
      {/* Main panel */}
			<div className="main-panel">
				<div className="content">
					<div className="container-fluid">
						<h4 className="page-title pb-4">Published</h4>

						<div className="row">
          <AlertComponent isError={true} message='SUcces'/>
              {
                publishedCourses.length > 0 ? publishedCourses.map((course, idx) => 
                  <CourseCard
                    key={idx}
                    name={course.name}
                    description={course.description}
                    hasImage={course.hasImage}
                    imageUrl={course.imageUrl}
                    isPublished={course.isPublished}
                    color={course.color}
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
                    name={course.name}
                    description={course.description}
                    hasImage={course.hasImage}
                    imageUrl={course.imageUrl}
                    isPublished={course.isPublished}
                    color={course.color}
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