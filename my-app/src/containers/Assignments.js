import React, { useEffect, useState } from "react";
import SpecificCourse from "../components/SpecificCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import NewAssignment from "../components/NewAssignment";
import { getAssignments, publishOrUnpublishAssignment, deleteAssignment, createAssignment } from "../redux/actions/assignmentActions";
import { connect } from "react-redux";
import { Spinner, Dropdown } from "react-bootstrap";
import { getDateAndTime } from "../helpers/getDate";
import { getCourses } from "../redux/actions/coursesActions";
import SearchBar from "../components/SearchBar";

const Assignments = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({});
  const [filtered, setFilter] = useState([]);
  
  const { assignments, courses, match: { params }  } = props;

  useEffect(() => {
    const { match: { params }  } = props;
    props.fetchAssignments(params.courseId);
    props.fetchCourses();
  }, []);

  useEffect(() => {
    setFilter(assignments.values)
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
  const deleteAss = (id) => props.delete(id)

  const onSearchHandler = (e) => {
    const searchInput = e.target.value;
    const filteredData = assignments.values.filter(value => {
      return (
        value.assignmentName.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.section.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.points.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        value.endDate.toString().toLowerCase().includes(searchInput.toLowerCase()) 
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

  const loading  = assignments.isLoading ? 
        <Spinner
          animation="border"
          variant="primary"
          className={assignments.isLoading ? 'spinner--position__center' : 'hide'}
        />
        : <p className="pl-3">No Data found</p>;

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

        <div className="carded-table-header">
          <div className="col col-md-3">
            <p className="card-text">Assignment Name</p>
          </div>
          <div className="col col-md-3">
            <p className="card-text">Section</p>
          </div>
          <div className="col col-md-3">
            <p className="card-text">Due Date</p>
          </div>
          <div className="col">
            <p className="card-text">State</p>
          </div>
          <div className="col ">
            <p className="card-text"></p>
          </div>

        </div>

        <div className="carded-table-scroll">        
        {
          filtered.length > 0 ? filtered.map((ass, idx) => 
          <div className="card carded-table" key={idx}>
            <div className="card-body carded-table-body">
              <div className="col col-md-3">
                <p className="card-text">{ass.assignmentName}</p>
              </div>
              <div className="col col-md-3">
                <p className="card-text">{ass.section}</p>
              </div>
              <div className="col col-md-3">
                <p className="card-text">{getDateAndTime(ass.endDate)}</p>
              </div>
              <div className="col">
              <span className={ass.isPublished ? 'badge badge-success bagde-published ' : 'badge badge-secondary bagde-unpublished'} >{ass.isPublished ? 'PUBLISHED' : 'UNPUBLISHED'}</span>
              </div>
              <div className="col ">
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
              </div>
            </div>
          </div>
          )
          :
          loading
        }
        </div>
        </div>
        <div className="col">
          <h5>Notifications</h5>
        </div>
    </SpecificCourse>
  );
}

const mapStateToProps = ({ assignments, courses }) => ({
  courses,
  assignments
});

export default connect(mapStateToProps, {
  fetchAssignments: getAssignments,
  fetchCourses: getCourses,
  pubOrUnpub: publishOrUnpublishAssignment,
  delete: deleteAssignment,
})(Assignments);