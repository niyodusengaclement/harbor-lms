import React from "react";
import TopHeader from "../components/TopHeader";
import CourseCard from "../components/CourseCard";
import "../assets/styles/welcome.scss";
import "../assets/styles/styles.scss";
import { connect } from "react-redux";
import Sidebar from "../components/Sidebar/index";


const Dashboard = (props) => {
  const { values } = props.courses;
  const publishedCourses = values.length > 0 ? values.filter(({ isPublished }) => isPublished) : [];
  const unPublishedCourses = values.length > 0 ? values.filter(({ isPublished }) => !isPublished) : [];
  return (
    <div className="wrapper">
      <TopHeader page='Dashboard'/>
      <Sidebar />
      
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
                    name={course.name}
                    description={course.description}
                    hasImage={course.hasImage}
                    imageUrl={course.imageUrl}
                    isPublished={course.isPublished}
                    color={course.color}
                  />
                ) : "You haven't published any course  yet"
              }
						</div>
						{/* End of row */}

						<h4 className="page-title pb-4">Unpublished</h4>
            
						<div className="row">
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
                ) : "You don't have unpublished course"
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

export default connect(mapStateToProps)(Dashboard);