import React,{useState,useEffect} from "react";
import SpecificCourse from "../components/SpecificCourse";
import "../assets/styles/containers/members.scss";
import {getStudents} from '../redux/actions/studentsActions';
import {connect} from 'react-redux';
import '../assets/styles/styles.scss';
import '../assets/styles/card.scss';
import {getCourseMembers, updateCourseMembers, getCourseSections} from '../redux/actions/coursesActions';
import ModalLayout from "../components/ModalLayout";
import Select from 'react-select'
import { sendInvitations } from "../redux/actions/instructorActions";
import { toast } from "react-toastify";
import TableLayout from "../components/TableLayout";
import { Spinner } from "react-bootstrap";

const Members = (props) => {
  const [ show, setShow ] = useState(false);
  const [ section,setSection ] = useState(null);
  const [isLoading, setIsLoading] = useState('');
  const courseId = localStorage.getItem('courseId');
  const courseName = localStorage.getItem('courseName');
  const [ multiChange, setMultiChange ] = useState(null);

  useEffect(()=> {
     props.getStudents();
     props.getCourseSections(courseId, setIsLoading);
     props.getMembers(courseId);
  },[]);

  const handleShow = () => setShow(!show);
  
  console.log('memebers', props.courses);

  const onError = (error) => {
    toast.error(error, {
      position: "top-center",
      hideProgressBar: true,
    });
  }

  const handleClick = () => {
    if(!multiChange) return onError('Select members to invite please');
    if(!section) return onError('Section is required');
    const invitees = multiChange.length > 0 ? multiChange.map(({label, value, fatherName, motherName, ...invite}) => {
      const invitee = {
        ...invite,
        sectionId: section.value,
        sectionName: section.label
      }
      return invitee
    }): [];
    props.updateCourseMembers(courseId, invitees);
    props.sendInvitations(section.label, courseName, invitees);
    setMultiChange(null);
    setSection(null);
    toast.success('Invitation sent successfully', {
      position: 'top-center',
      hideProgressBar: true,
    })

  };

  const allMembers = props.allMembers.length > 0 ? props.allMembers.map((mbr) => {
    const val = {
      ...mbr,
      value: mbr.id,
      status: 'pending',
      label: `${mbr.fullName} (${mbr.studentUniqueNumber ? mbr.studentUniqueNumber : mbr.role})`
    }
    return val;
  }) : [];

  const sections = props.sections.length > 0 ? props.sections.map(({sectionId, sectionName}) => {
    const val = { value: sectionId, label: sectionName }
    return val;
  }) : [];

  const loading  = props.courses.isLoading ? 
  <Spinner
    animation="border"
    variant="primary"
    className={props.courses.isLoading ? 'spinner--position__center' : 'hide'}
  />
  : "No Data found";

  return (
    <SpecificCourse page={`${localStorage.getItem('courseName')} > Members`} submenu="Members">
      <button name="invite" id="invite" onClick={handleShow} className="members--btn__top blue-btn" > Invite members </button>

      <ModalLayout handleShow={handleShow} handleClick={handleClick} show={show} header="Invite members" buttonName="Invite">
        <div className="p-3">
          <label>Select members from the list</label>
        <Select 
          isMulti
          name="members"
          options={allMembers}
          value={multiChange}
          onChange={setMultiChange}
          className="basic-multi-select"
          classNamePrefix="select"
          isLoading= {props.students.isLoading ? true : false}
        />
        <label className="pt-2">Select Section</label>
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="sections"
          value={section}
          onChange={setSection}
          options={sections}
          isSearchable={true}
          isClearable={true}
          isLoading= {props.students.isLoading ? true : false}
        />
        </div>
      </ModalLayout>

      <div>
        <div className="col-md-8">
          <h4 className="page-title pb-3">Members</h4>
          <div className="carded-table-scroll large-table">
            
          {/* Table  Start*/}
          <TableLayout headers={['Name', 'Member ID', 'Role', 'Section', 'Status']}> 
          {
            props.members.length > 0 ? props.members.map(({fullName, studentUniqueNumber, email, role, sectionName, status }, idx) =>
            <tr key={idx}>
              <td>{fullName}</td>
              <td>{studentUniqueNumber ? studentUniqueNumber : email}</td>
              <td>{role}</td>
              <td>{sectionName}</td>
              <td>{status}</td>
            </tr>
            )
            : loading

          }
          </TableLayout>
          {/* Table End */}

          </div>
        </div>
      </div>

    </SpecificCourse>
  );
};

const mapStateToProps = ({ students, courses }) => ({
  students,
  allMembers : students.allMembers,
  fetchError : students.error,
  members: courses.members,
  sections: courses.sections,
  courses,
});
export default connect(mapStateToProps, {
  getCourseSections: getCourseSections,
  getStudents: getStudents,
  getMembers: getCourseMembers,
  sendInvitations: sendInvitations,
  updateCourseMembers: updateCourseMembers
})(Members)