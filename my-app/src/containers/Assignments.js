import React from "react";
import SpecificCourse from "../components/SpecificCourse";
import NewCourseModal from "../components/NewCourseModal";
import NewAssignment from "../components/NewAssignment";

const Assignments = () => {
	const addAssignment = () => {
    const el = document.getElementById('newAssignmentModal');
    const el1 = el.style.display === 'block' ? el.style.display = 'none' : el.style.display = 'block';
  }
	const buttons = [
    {
      name: 'New Assignment',
      clickHandler: addAssignment
    },
  ];

  return (
    <SpecificCourse page="Assignments" buttons={buttons}>
		  <NewAssignment />
      <div className="col-md-8">
      <h4 className="page-title pb-3">Assignments</h4>
          <div className="carded-table-header">
            
            <p className="card-text">assignments</p>
            <p className="card-text">ft-instructor</p>
            <p className="card-text">173762788</p>

          </div>
          <div className="card carded-table">
            <div className="card-body carded-table-body">
            <p className="card-text">assignments</p>
            <p className="card-text">ft-instructor</p>
            <p className="card-text">173762788</p>
            </div>
          </div>
          <div className="card carded-table">
            <div className="card-body carded-table-body">
            <p className="card-text">assignments</p>
            <p className="card-text">ft-instructor</p>
            <p className="card-text">173762788</p>
            </div>
          </div>
          <div className="card carded-table">
            <div className="card-body carded-table-body">
            <p className="card-text">assignments</p>
            <p className="card-text">ft-instructor</p>
            <p className="card-text">173762788</p>
            </div>
          </div>
        </div>
        <div className="col">
          <h5>Notifications</h5>
        </div>
    </SpecificCourse>
  );
}
export default Assignments;