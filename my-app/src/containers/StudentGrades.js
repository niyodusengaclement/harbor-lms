import React, { useEffect, useState } from "react";
import SpecificCourse from "../components/SpecificCourse";
import { getAssignments, getSubmissionsByStudentId } from "../redux/actions/assignmentActions";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { getCourses } from "../redux/actions/coursesActions";
import TableLayout from "../components/TableLayout";
const StudentGrades = (props) => {  
  const { assignments, courses, match: { params }  } = props;

  useEffect(() => {
    const { match: { params }  } = props;
    props.fetchAssignments(params.courseId);
    props.fetchCourses();
    props.getSubmissionsByStudentId(localStorage.getItem('rems_user_id'))
  }, []);

  const title = `${localStorage.getItem('courseName')} > Grades`;

  const loading  = assignments.isLoading ? 
        <Spinner
          animation="border"
          variant="primary"
          className={assignments.isLoading ? 'spinner--position__center' : 'hide'}
        />
        : "No Data found";

  const headers = ['Name', 'Score', 'Out of'];

  let marks = 0;
  let total = 0;
  const validSubmission = assignments.submissions.length > 0 ? assignments.submissions.filter(({sectionId}) => sectionId !== undefined): [];
  const studentGrades = validSubmission.length > 0 ? validSubmission.map(sub => {
    const ass =  assignments.values.length > 0 ?  assignments.values.find(x => x.id === sub.assignmentId && x.isPublished === true && x.isGradable === true) : [];
    ass.grade = sub.grade;
    ass.fullName = sub.fullName;
    ass.studentId = sub.studentId;
    marks = +sub.grade + +marks;
    total = +total + +ass.points;
    return ass;
}) : [];

  return (
    <SpecificCourse page={title} submenu="Grades" >

      <div className="col-md-10">
      <h4 className="page-title pb-3">Grades</h4>

      <div className="carded-table-scroll"> 
    {/* Table  Start*/}
      <TableLayout headers={headers}>      
          {
            studentGrades.length > 0
          ?  studentGrades.map((sub, idx) =>
          <tr key={idx}>
            <td> {sub.assignmentName}</td>
            <td> {sub.grade}</td>
            <td> {sub.points}</td>

          </tr>
          )
          :
          loading
          }
          <tr>
            <td colSpan={2}>Total</td>
            <td>{(marks/total*100).toFixed(2)}%</td>
          </tr>
          </TableLayout>
      {/* Table End */}

        </div>
        </div>
    </SpecificCourse>
  );
}

const mapStateToProps = ({ assignments, courses }) => ({
  courses,
  assignments,
});

export default connect(mapStateToProps, {
  fetchAssignments: getAssignments,
  fetchCourses: getCourses,
  getSubmissionsByStudentId: getSubmissionsByStudentId
})(StudentGrades);