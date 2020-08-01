import React, { useEffect, useState } from "react";
import SpecificCourse from "../components/SpecificCourse";
import ReactQuill from 'react-quill';
import { getAssignments, submitAssignment, getSubmissions, updateSubmission } from "../redux/actions/assignmentActions";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { getDateAndTime, dueDateCalculator } from "../helpers/getDate";
import { getCourses } from "../redux/actions/coursesActions";
import ModalLayout from "../components/ModalLayout";
import { toast } from "react-toastify";

const Submissions = (props) => {
  const [ show, setShow ] = useState(false);
  const [ comment, setComment ] = useState('');
  const [ marks, setMarks ] = useState('');

  const { assignments, courses, userProfile, match: { params }  } = props;
  const { role, fullName } = userProfile;
  const course = courses.values.length > 0 ? courses.values.filter(({id}) => id === params.courseId) : [];
  const submission = assignments.submissions.length > 0 ? assignments.submissions.filter(({id}) => id === params.submissionId) : [];
  const thisAssignment = assignments.values.length > 0 ? assignments.values.filter(({id}) => id === params.assignmentId) : [];
  const title = !course[0] ? '' : `${course[0].name} > Assignments`;

  useEffect(() => {
    props.fetchAssignments(params.courseId);
    // props.fetchCourses();
    if(role === 'instructor') {
      props.fetchSubmissions(params.assignmentId);
    }
  }, [params.assignmentId]);

  const handleShow = () => setShow(!show);
  const handleClick = () => {
    if(!marks) {
      return toast.error('Grade is required', {
        hideProgressBar: true,
        position: "top-center"
      });
    }
    const data = submission[0];
    data.grade = marks;
    data.comment = comment;
    data.sectionId = 'S120-e9X13';
    props.sendGrades(data);
    handleShow();
  }

  const Loading  = assignments.isLoading ? 
        <Spinner
          animation="border"
          variant="primary"
          className={assignments.isLoading ? 'spinner--position__center' : 'hide'}
        />
        : <p className="pl-3">Assignment not found</p>;
  return (
    <SpecificCourse page={title} submenu="Assignments">

<ModalLayout handleShow={handleShow} handleClick={handleClick} show={show} header="Grade Submission ">
    <div className="ql-editor">
    <div className="form-group">
      <label >Marks<span className="required"> *</span></label>
      <input type="number"  onChange={e => setMarks(e.target.value)}  className="form-control" />
    </div>
    Comment:
    <ReactQuill
      value={comment}
      onChange={setComment}
    />
  </div>
</ModalLayout>
        
      {
        !submission[0] ? 
        Loading
        : role === 'instructor' ?
        <>
        <div className="col-md-8">
      
        {
            submission ?
            <div>
              <h3> {thisAssignment[0].assignmentName}</h3>
              <div className="row">
                <div className="col col-md-1">
                  <button type="submit"  title={dueDateCalculator(thisAssignment[0].endDate) > 0 ? 'You can\'t grade before due date' : ''} disabled={dueDateCalculator(thisAssignment[0].endDate) > 0 ? true : false} onClick={handleShow} className="blue-btn shift-up">Grade</button>
                </div>
              </div>
              <hr />
            </div>
            :null
          }
        <div className="carded-table-scroll carded-details ">
          {
            submission ?
            <div className="p-3">
              <div dangerouslySetInnerHTML={{__html: submission[0].response}}></div>
            </div>
            :null
          }
        </div>
        </div>
        <div className="col">
        <div className="vl"></div>
          <div className="right-sidebar">
          <strong>Submitted by: </strong>
          <p>{submission[0].fullName}</p>

          <strong>Submitted on: </strong>
          <p>{getDateAndTime(submission[0].submittedOn)}</p>

          <strong>Submission Type:</strong>
          <p>{submission[0].submissionType}</p>

          <strong>Grade:</strong>
          <p>{submission[0].grade}</p>

          <strong>Comment:</strong>
          <div dangerouslySetInnerHTML={{__html: submission[0].comment}}></div>
         </div>
        </div>
        </>
        : <p>Access denied! You are not allowed to to access this page</p>        
      }
    </SpecificCourse>
  );
}

const mapStateToProps = ({ assignments, courses, firebase }) => ({
  courses,
  assignments,
  userProfile: firebase.profile,
});

export default connect(mapStateToProps, {
  fetchAssignments: getAssignments,
  fetchCourses: getCourses,
  sendSubmission: submitAssignment,
  fetchSubmissions: getSubmissions,
  sendGrades: updateSubmission
})(Submissions);
