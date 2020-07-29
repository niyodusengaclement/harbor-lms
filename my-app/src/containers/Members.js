import React,{useState,useEffect} from "react";
import SpecificCourse from "../components/SpecificCourse";
import Modal from "../components/Modal";
import "../assets/styles/containers/members.scss";
import {getStudents} from '../redux/actions/studentsActions';
import {connect} from 'react-redux';
import Btn from '../components/Btn';
import '../assets/styles/styles.scss';
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import '../assets/styles/card.scss';
import Table from '../components/Table';

const Members = (props) => {
  const [isModalToggled,toggleModal] = useState(false);

  useEffect(()=> {
     props.getStudents();
  },[])
  const addAssignment = () => {
    const el = document.getElementById("newAssignmentModal");
    const el1 =
      el.style.display === "block"
        ? (el.style.display = "none")
        : (el.style.display = "block");
  };

  const handleClick = async(target) => {
    console.log('click: ', target);
    const {name} = target;
    if(name === 'invite') {
      toggleModal(!isModalToggled);
      // await props.getStudents();
    }
  }
  
  return (
    <SpecificCourse page={`${localStorage.getItem('courseName')} > Members`} submenu="Members" >
      <Btn name="invite" label="Invite members" handleClick={handleClick} className="members--btn__top blue-btn" />
      <Modal header="Invite members" bodyTitle="Members" inputPlaceholder="email or student unique number" footerBtnName="invitation" footerBtnLabel="Send invitation" show={isModalToggled}
       data={
         props.allMembers.map((student) => {
          let {studentUniqueNumber,email,fullName,role,...others} = student;
          return {studentUniqueNumber,email,fullName,role};
        })
      }/>
      <div>
      <div className="col-md-8">
      <h4 className="page-title pb-3">Members</h4>
      </div>
      
      <Table tableHeaders={['name','S.U.N','role','section']} />

        <div className="carded-table-scroll">        
          <div className="card carded-table">
            <div className="card-body carded-table-body">
              <div className="col col-md-3">
                <p className="card-text">William</p>
              </div>
              <div className="col col-md-2">
                <p className="card-text">2015</p>
              </div>
              <div className="col col-md-2">
                <p className="card-text">student</p>
              </div>
              <div className="col col-md-2">
                <p className="card-text">JSF intro</p>
              </div>
              <div className="col">
              <span className="badge badge-success bagde-published" >Pending</span>
              </div>
              <div className="col ">
                <div className="dropdown-no-caret float-right">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-button-drop-left">
                      <div className="drop-menu"><FontAwesomeIcon icon={faEllipsisH} /></div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={(event) => handleClick(event.target)} >remove member</Dropdown.Item>
                      <Dropdown.Item onClick={(event) => handleClick(event.target)} >user details</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="col-md-8">
        <h4 className="page-title pb-5">MEMBERS</h4>
        <div className="carded-table-header">
          <p className="card-text">name</p>
          <p className="card-text">SUN</p>
          <p className="card-text">Role</p>
          <p className="card-text">Section</p>
          <p className="card-text">  </p>
        </div>
        <div className="card carded-table">
          <div className="card-body carded-table-body">
            <p className="card-text">Ineza Ruth</p>
            <p className="card-text">2015</p>
            <p className="card-text">Student</p>
            <p className="card-text">Foundations</p>
            <p className="card-text">Pending</p>
              <div className="dropdown">
                <h5 className="dropbtn">...</h5>
                <div className="dropdown-content">
                  <a href="#/here1" name="publish" onClick={(event) => handleClick(event.target)}>user details</a>
                  <a href="#/here2" name="invite" onClick={(event) => handleClick(event.target)}>remove member</a>
                </div>
              </div>
          </div>
        </div>
      </div> */}
      {/* <div className="col">
        <h5>Notifications</h5>
      </div> */}
    </SpecificCourse>
  );
};
const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {
    loading: state.auth.loading,
    auth: state.firebase.auth,
    allMembers : state.students.allMembers,
    fetchError : state.students.error,
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    getStudents: () => dispatch(getStudents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Members)