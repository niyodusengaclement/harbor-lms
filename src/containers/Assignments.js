import React, { useEffect, useState } from "react";
import SpecificCourse from "../components/SpecificCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { getAssignments, publishOrUnpublishAssignment, deleteAssignment, updateAssignment, createAssignment, getSubmissions } from "../redux/actions/assignmentActions";
import { connect } from "react-redux";
import { Spinner, Dropdown } from "react-bootstrap";
import { getDateAndTime } from "../helpers/getDate";
import { getCourses, getCourseSections, getAllMembers } from "../redux/actions/coursesActions";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import TableLayout from "../components/TableLayout";
import ModalLayout from "../components/ModalLayout";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../assets/styles/styles.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const Assignments = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({});
  const [filtered, setFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { assignments, courses, sections, userProfile, match: { params }  } = props;
  const { role } = userProfile;
  const { members } = props.courses;

  const [ assignmentName, setAssignmentName ] = useState('');
  const [ isGradable, setIsGradable ] = useState(false);
  const [ points, setPoints ] = useState('');
  const [ section, setSection ] = useState('');
  const [ question, setQuestion ] = useState('');
  const [ submissionType, setSubmissionType ] = useState('');
  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate ] = useState(startDate);
  const [ show, setShow ] = useState(false);
  const [ isUpdate, setIsUpdate ] = useState(false);
  const [ assignmentId, setAssignmentId ] = useState('');
  const [ isPublished, setIsPublished ] = useState(false);

  const handleShow = () => setShow(!show);
  const onError = (error) => {
    toast.error(error, {
      position: 'top-center',
      hideProgressBar: true,
    });
  }
  const handleClick = () => {}

  const changeIsGradable = () => setIsGradable(!isGradable);
  const clearState = () => {
    setAssignmentName('');
    setIsGradable(false);
    setPoints('');
    setSection('');
    setQuestion('');
    setSubmissionType('');
    setStartDate(new Date());
    setEndDate(new Date());
    setIsUpdate(false);
    setIsPublished(false);
  }

  const setState = (oldData) => {
    setAssignmentName(oldData.assignmentName);
    setIsGradable(oldData.isGradable);
    setPoints(oldData.points);
    setSection(oldData.section);
    setQuestion(oldData.question);
    setSubmissionType(oldData.submissionType);
    setStartDate(new Date(oldData.startDate));
    setEndDate(new Date(oldData.endDate));
    setIsUpdate(true);
    setIsPublished(oldData.isPublished);
    setAssignmentId(oldData.id)
    handleShow();
  }

  const submitHandler = () => {
    if(assignmentName === '' || question === '' || submissionType === '' || section === '') {
      return onError('Fill all required fields please');
    }
    if(isGradable && points === '') {
      return onError('The Assignment points field is required');
    }

    let info = {
      courseId: params.courseId,
      assignmentName,
      isGradable,
      points,
      section,
      question,
      submissionType,
      isPublished,
      startDate: new Date().setTime(startDate),
      endDate: new Date().setTime(endDate),
    }

    clearState();
    handleShow();
    if(isUpdate) {
      info.id = assignmentId;
      return props.update(info);
    }
    props.saveAssignment(info);
  }


  const fetch = () => {
    setIsLoading(true)
    props.getCourseSections(params.courseId, setIsLoading);
  }
  
  useEffect(() => {
    const { match: { params }  } = props;
    props.fetchAssignments(params.courseId);
    props.fetchCourses();
    props.getAllMembers();
    fetch();
  }, []);

  const toogleAssModal = () => {
    clearState();
    return handleShow();
  }

  const publishOrUnpublish = (data) => props.pubOrUnpub(data)
  const deleteAss = (id) => {
    const yes = window.confirm('Are you Sure! This action is irreversible');
    if(yes) {
      props.delete(id);
    }
  }
  const memberSections = members.length > 0 ? members.filter(({studentUniqueNumber, status}) => studentUniqueNumber === userProfile.studentUniqueNumber && status === 'accepted'): [];
  const allAssignments = role === 'student' && memberSections.length > 0 ? assignments.values.filter(({isPublished, section }) => isPublished === true && section === memberSections[0].sectionId) : assignments.values;
  useEffect(() => {
    setFilter(allAssignments);
  }, [assignments]);

  const findSectionName = (id) => {
    const found = sections.find(({sectionId}) => sectionId === id);
    if(found) return found.sectionName;
    return '';
  }

  const onSearchHandler = (e) => {
    const searchInput = e.target.value.toLowerCase();
    const filteredData = allAssignments.filter(value => {
      return (
        value.assignmentName.toLowerCase().includes(searchInput) ||
        value.section.toLowerCase().includes(searchInput) ||
        value.points.toString().toLowerCase().includes(searchInput) ||
        value.endDate.toString().toLowerCase().includes(searchInput) 
        );
      });
      return setFilter(filteredData);
  }
	const buttons = [
    {
      name: 'New Assignment',
      clickHandler: toogleAssModal,
    },
  ];
  const title = `${localStorage.getItem('courseName')} > Assignments`;

  const loading  = assignments.isLoading ? 
        <Spinner
          animation="border"
          variant="primary"
          className={assignments.isLoading ? 'spinner--position__center' : 'hide'}
        />
        : <p className="pl-3">No Data found</p>;

  const headers = role === 'instructor' ? 
  ['Assignment', 'Section', 'Due Date', 'State', '']
  : role === 'student' ? ['Assignment', 'Due Date'] : [];
  
  return (
    <SpecificCourse page={title} submenu="Assignments" buttons={buttons}>

      <ModalLayout handleShow={handleShow} handleClick={submitHandler} show={show} header={isUpdate ? 'Update an Assignment' : 'Create an Assignment'} buttonName={isUpdate ? 'Update' : 'Save'}>
        <form className="p-2">
          <div className="form-group">
            <label >Assignment Name<span className="required"> *</span></label>
            <input type="text" onChange={(e) => setAssignmentName(e.target.value)} maxLength={20} className="form-control" value={isEdit && data ? data.assignmentName : assignmentName} name="assignmentName" placeholder="eg: Datatypes Assignment 1" />
          </div>
          <div className="form-group">
            <input type="checkbox" onChange={changeIsGradable} checked={isGradable} name="isGradable" /> This assignmet is Gradable
          </div>

          {
            isGradable ?
            
            <div className="form-group">
              <label >Points<span className="required"> *</span></label>
              <input type="number" value={points} onChange={(e) => setPoints(e.target.value)} className="form-control" name="points" placeholder="Points" />
            </div>
            :
            null
          }

          <div className="form-group">
            <label >Section<span className="required"> *</span></label>
            <select name="section" value={section} onChange={(e) => setSection(e.target.value)} className="form-control" >
              <option value=''>Select Section</option>
              {
                courses.sections.length > 0 ? courses.sections.map(({ sectionName, sectionId }, idx) =>
                <option key={idx} value={sectionId}>{sectionName}</option>
                )
                : null
              }
            </select>
          </div>
          <div className="form-group">
            <label >Submission Type<span className="required"> *</span></label>
            <select value={submissionType} onChange={(e) => setSubmissionType(e.target.value)} name="submissionType" className="form-control" >
              <option value=''>Select Submission Type</option>
              <option>File upload</option>
              <option>Website URL</option>
              <option>Text Entry</option>
            </select>
          </div>
          <div className="form-group">
              <div className="form-row">
              <div className="col">
                <label >Available from<span className="required"> *</span></label>
                <DatePicker
                  selected={startDate}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  name="startDate"
                  showTimeInput
                  onChange={setStartDate} 
                  minDate={new Date()}
                  isClearable
                  placeholderText="Select the starting date"
                />
              </div>
              <div className="col">
                <label >Available until<span className="required"> *</span></label>
                <DatePicker
                  selected={endDate}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm"
                  showTimeInput
                  name="endDate"
                  onChange={setEndDate}
                  minDate={new Date(startDate)}
                  isClearable
                  placeholderText="Select the ending date"
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label >Question<span className="required"> *</span></label>
            <ReactQuill
              value={question}
              onChange={setQuestion}
            />
          </div>
        </form>
      </ModalLayout>

      <div className="col-md-8">

      <SearchBar onChangeHandler={onSearchHandler} />

        <div className="carded-table-scroll medium-scroll">   
    {/* Table  Start*/}
      <TableLayout headers={headers}>      
          {
            role === 'instructor' && filtered.length > 0
            ? filtered.map((ass, idx) => 
  
              <tr key={idx}>
                <td> 
                <Link className="black-links" to={`/courses/${params.courseId}/assignments/${ass.id}`} >{ass.assignmentName}</Link>
                </td>
                <td>{findSectionName(ass.section)}</td>
                <td>{getDateAndTime(ass.endDate)}</td>
                <td>
                <span className={ass.isPublished ? 'badge badge-success bagde-published ' : 'badge badge-secondary bagde-unpublished'} >{ass.isPublished ? 'PUBLISHED' : 'UNPUBLISHED'}</span>
                </td>
                <td>
  
                <div className="dropdown-no-caret float-right">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-button-drop-left">
                        <div className="drop-menu"><FontAwesomeIcon icon={faEllipsisH} /></div>
                      </Dropdown.Toggle>
  
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => publishOrUnpublish(ass)} disabled={ass.isPublished ? true : false}>Publish</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => publishOrUnpublish(ass)} disabled={ass.isPublished ? false : true}>Unpublish</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setState(ass)} >Edit</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => deleteAss(ass.id)}><span className="required">Delete</span></Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                
                </td>
              </tr>
            )
          :
          role === 'student' && filtered.length > 0
          ? filtered.filter(({isPublished}) => isPublished === true).map((ass, idx) =>
          <tr key={idx}>
            <td> 
            <Link className="black-links" to={`/courses/${params.courseId}/assignments/${ass.id}`} >{ass.assignmentName}</Link>
            </td>
          <td>{getDateAndTime(ass.endDate)}</td>
          </tr>
          )
          :
          loading        
          }
          </TableLayout>
      {/* Table End */}

        </div>
        </div>
        <div className="col reserved-side">
        </div>
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
  pubOrUnpub: publishOrUnpublishAssignment,
  delete: deleteAssignment,
  fetchSubmissions: getSubmissions,
  getCourseSections: getCourseSections,
  getAllMembers: getAllMembers,
  saveAssignment: createAssignment,
  update: updateAssignment,
})(Assignments);