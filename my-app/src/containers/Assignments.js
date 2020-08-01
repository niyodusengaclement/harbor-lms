import React, { useEffect, useState } from "react";
import SpecificCourse from "../components/SpecificCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import NewAssignment from "../components/NewAssignment";
import { getAssignments, publishOrUnpublishAssignment, deleteAssignment, createAssignment, getSubmissions } from "../redux/actions/assignmentActions";
import { connect } from "react-redux";
import { Spinner, Dropdown } from "react-bootstrap";
import { getDateAndTime } from "../helpers/getDate";
import { getCourses, getCourseSections } from "../redux/actions/coursesActions";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import TableLayout from "../components/TableLayout";

const Assignments = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({});
  const [filtered, setFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { assignments, courses, userProfile, match: { params }  } = props;
  const { role } = userProfile;

  const fetch = () => {
    setIsLoading(true)
    props.getCourseSections(params.courseId, setIsLoading);
  }
  
  useEffect(() => {
    const { match: { params }  } = props;
    props.fetchAssignments(params.courseId);
    props.fetchCourses();
    fetch();
  }, []);

  useEffect(() => {
    setFilter(assignments.values);
  }, [assignments.values]);

	const hideOrShow = () => {
    const el = document.getElementById('newAssignmentModal');
    const el1 = el.style.display === 'block' ? el.style.display = 'none' : el.style.display = 'block';
  }

  const toogleAssModal = (oldData, update) => {
    if(update) {
      setIsEdit(true);
      setData(oldData);
      return hideOrShow();
    }
    setIsEdit(false);
    return hideOrShow();
  }

  const publishOrUnpublish = (data) => props.pubOrUnpub(data)
  const deleteAss = (id) => {
    const yes = window.confirm('Are you Sure! This action is irreversible');
    if(yes) {
      props.delete(id);
    }
  }

  const allAssignments = role === 'student' ? assignments.values.filter(({isPublished}) => isPublished === true) : assignments.values;

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
      clickHandler: toogleAssModal
    },
  ];
  const course = courses.values.length > 0 ? courses.values.filter(({id}) => id === params.courseId) : [];
  const title = !course[0] ? '' : `${course[0].name} > Assignments`;

  localStorage.setItem('courseId', params.courseId);
  if (course.length > 0) localStorage.setItem('courseName', course[0].name);

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
		  <NewAssignment
        isEdit={isEdit}
        courseId={params.courseId}
        data={data}
      />
      <div className="col-md-8">
      <h4 className="page-title pb-3">Assignments</h4>

      <SearchBar onChangeHandler={onSearchHandler} />

        <div className="carded-table-scroll">   
    {/* Table  Start*/}
      <TableLayout headers={headers}>      
          {
            role === 'instructor' && filtered.length > 0
            ? filtered.map((ass, idx) => 
  
              <tr key={idx}>
                <td> 
                <Link className="black-links" to={`/courses/${params.courseId}/assignments/${ass.id}`} >{ass.assignmentName}</Link>
                </td>
                <td>{ass.section}</td>
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
                        <Dropdown.Item onClick={(e) => toogleAssModal(ass, true)} >Edit</Dropdown.Item>
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
        <div className="col">
        <div className="vl"></div>
          <h5>Notifications</h5>
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
  getCourseSections: getCourseSections
})(Assignments);