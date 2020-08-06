import React, { useEffect, useState } from "react";
import SpecificCourse from "../components/SpecificCourse";
import ReactQuill from 'react-quill';
import { getAssignments, publishOrUnpublishAssignment, deleteAssignment, createAssignment, submitAssignment, getSubmissions, updateSubmission } from "../redux/actions/assignmentActions";
import { connect } from "react-redux";
import { Spinner, Dropdown, Button } from "react-bootstrap";
import { getDateAndTime, dueDateCalculator } from "../helpers/getDate";
import { getCourses, getCourseSections } from "../redux/actions/coursesActions";
import ModalLayout from "../components/ModalLayout";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import TableLayout from "../components/TableLayout";
import { student } from "../components/Sidebar/menu";

const SpecificAssignment = (props) => {
  const [ show, setShow ] = useState(false);
  const [ text, setText] = useState('');
  const [ url, setUrl] = useState('');
  const [ file, setFile ] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { assignments, courses, userProfile, sections, match: { params }  } = props;
  const { role, fullName } = userProfile;
  const studentId = localStorage.getItem('rems_user_id');
  const singleAssignment = assignments.values.length > 0 ? assignments.values.filter(({id}) => id === params.assignmentId) : [];
  const submission = assignments.submissions.length > 0 ? assignments.submissions.filter((sub) => sub.studentId === studentId && sub.assignmentId === params.assignmentId) : [];
  const title = `${localStorage.getItem('courseName')} > Assignments > ${singleAssignment[0] ? singleAssignment[0].assignmentName : ''}`;

  useEffect(() => {
    props.fetchAssignments(params.courseId);
    props.fetchCourses();
    props.fetchSubmissions(params.assignmentId);
    fetch();
  }, []);

  const fetch = () => {
    setIsLoading(true)
    props.getCourseSections(params.courseId, setIsLoading);
  }
  

  const handleShow = () => setShow(!show);
  const handleClick = () => {
    const data = {
      fullName,
      courseId: params.courseId,
      assignmentId: params.assignmentId,
      submissionType: singleAssignment[0].submissionType, 
      studentId,
      submittedOn: new Date().setTime(new Date()),
      grade: '',
      comment: '',
    }
    if(singleAssignment[0].submissionType === 'Text Entry') {
      if(!text ) {
        return toast.error('Provide your answer please', {
          position: 'top-center',
          hideProgressBar: true,
        });
      }
      data.response = text;
      if(submission.length > 0) {
        data.id = submission[0].id;
        props.updateSubmission(data);
        return handleShow();
      }
      props.sendSubmission(data);
      handleShow();      
    }
    else if(singleAssignment[0].submissionType === 'Website URL') {
      if(!url) {
        return toast.error('Provide a valid URL please', {
          position: 'top-center',
          hideProgressBar: true,
        });
      }
      data.response = url;
      if(submission.length > 0) {
        data.id = submission[0].id;
        props.updateSubmission(data);
        return handleShow();
      }
      props.sendSubmission(data);
      return handleShow();
    }
    else if(singleAssignment[0].submissionType === 'File upload') {
      if(file === null) {
        return toast.error('No file selected', {
          position: 'top-center',
          hideProgressBar: true,
        });
      }
      data.response = file;
      console.log('file', file)
      if(submission.length > 0) {
        data.id = submission[0].id;
        props.updateSubmission(data);
        return handleShow();
      }
      // props.sendSubmission(data);
    }
  }

  const findSectionName = (id) => {
    const found = sections.find(({sectionId}) => sectionId === id);
    return found.sectionName;
  }


  const Loading  = assignments.isLoading ? 
        <Spinner
          animation="border"
          variant="primary"
          className={assignments.isLoading ? 'spinner--position__center' : 'hide'}
        />
        : <p className="pl-3">Data not found</p>;

  return (
    <SpecificCourse page={title} submenu="Assignments">
      {
        !singleAssignment[0] ? 
        Loading
        :
        role === 'instructor' ?
        // Instructor start

        <>
      <div className="col-md-8">
      <h4 className="page-title pb-3">Submissions</h4>

        <div className="carded-table-scroll">  
          <TableLayout headers={['Name', 'Section', 'Submitted On', 'Grade']}>      
        {
          assignments.submissions.length > 0 ?
          assignments.submissions.map((sub, idx) => 

            <tr key={idx}>
              <td> 
                <Link className="black-links" to={`/courses/${params.courseId}/assignments/${params.assignmentId}/submissions/${sub.id}`} >{sub.fullName}</Link>
              </td>
              <td>{findSectionName(sub.sectionId)}</td>
              <td>{getDateAndTime(sub.submittedOn)}</td>
              <td>{sub.grade}</td>
            </tr>
          )
        : Loading
        }
        </TableLayout>
        </div>
        </div>
        <div className="col">
          <h5>Notifications</h5>
        </div>
        </>
        // Instructor end
        : role === 'student' ?
        <>

        <ModalLayout handleShow={handleShow} handleClick={handleClick} show={show} header="Submit an assignmemt">
        {
        singleAssignment[0].submissionType === 'Text Entry' ?
          <div className="ql-editor">
            <ReactQuill
              value={text}
              onChange={setText}
            />
          </div>
          : singleAssignment[0].submissionType === 'Website URL' ?
          <div className="modal-body">
            <div className="form-group">
              <label >Website URL<span className="required"> *</span></label>
              <input type="text"  onChange={e => setUrl(e.target.value)}  className="form-control" />
            </div>
          </div>
          : singleAssignment[0].submissionType === 'File upload' ?
          <div className="modal-body">
            <div className="form-group">
              <input type="file" onChange={e => setFile(e.target.files)} className="form-control" />
            </div>
          </div>
          : null
        }
        </ModalLayout>
        <div className="col-md-8">
      
        {
            singleAssignment ?
            <div>
              <h3 dangerouslySetInnerHTML={{__html: singleAssignment[0].assignmentName}}></h3>
              <div className="row">
                <div className="col col-md-3">
                  <strong>Due: &nbsp;</strong><span dangerouslySetInnerHTML={{__html: getDateAndTime(singleAssignment[0].endDate)}}></span>
                </div>
                <div className="col col-md-2">
                  <strong>Points: &nbsp; </strong><span dangerouslySetInnerHTML={{__html: singleAssignment[0].points}}></span>
                </div>
                <div className="col col-md-4">
                  < strong>Submission: &nbsp; </strong><span dangerouslySetInnerHTML={{__html: singleAssignment[0].submissionType}}></span>
                </div>
                <div className="col col-md-3">
                  <button type="submit" title={dueDateCalculator(singleAssignment[0].endDate) < 0 ? "You are late! Submission disabled" : ""}  disabled={dueDateCalculator(singleAssignment[0].endDate) < 0 ? true : false} onClick={handleShow} className="blue-btn shift-up">
                    {submission.length > 0 ? 'Re-submit' : 'Submit'}
                  </button>
                </div>
              </div>
              <hr />
            </div>
            :null
          }
        <div className="carded-table-scroll carded-details ">
          {
            singleAssignment ?
            <div className="p-3">
              <div dangerouslySetInnerHTML={{__html: singleAssignment[0].question}}></div>
            </div>
            :null
          }
        </div>
        </div>
        
        <div className="col">
        <div className="vl"></div>
        {
          submission.length > 0 ?

          <div className="right-sidebar">
          <strong>Warning: </strong>
          <p>
            Re-submit the assignment replace the first submission
          </p>

          <strong>Submitted on: </strong>
          <p>{getDateAndTime(submission[0].submittedOn)}</p>

          <strong>Grade:</strong>
          <p>{submission[0].grade}</p>

          <strong>Comment:</strong>
          <div dangerouslySetInnerHTML={{__html: submission[0].comment}}></div>
         </div>
        : 
        
        <div className="right-sidebar">
        <strong>Warning: </strong>
        <p>
          After due time you will not  be able to submit your assignment
        </p>
        </div>
        }
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
  sections: courses.sections
});

export default connect(mapStateToProps, {
  fetchAssignments: getAssignments,
  fetchCourses: getCourses,
  sendSubmission: submitAssignment,
  fetchSubmissions: getSubmissions,
  updateSubmission: updateSubmission,
  getCourseSections: getCourseSections,
})(SpecificAssignment);
