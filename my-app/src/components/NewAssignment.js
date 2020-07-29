import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../assets/styles/styles.scss";
import { connect } from "react-redux";
import { createAssignment, updateAssignment } from "../redux/actions/assignmentActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "../assets/styles/components/modal.scss";

const NewAssignment = (props) => {
  const [ assignmentName, setAssignmentName ] = useState('');
  const [ isGradable, setIsGradable ] = useState(false);
  const [ points, setPoints ] = useState('');
  const [ section, setSection ] = useState('');
  const [ question, setQuestion ] = useState('');
  const [ submissionType, setSubmissionType ] = useState('');
  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate ] = useState(startDate);
  const { isEdit } = props;
  const [ data, setData ] = useState();
  
  useEffect(() => {
    if(isEdit) {
      setData({...props.data});
    }
  }, [props.data]);

  const toggleModal = () => {
    const el = document.getElementById('newAssignmentModal');
    const el1 = el.style.display === 'none' ? el.style.display = 'block' : el.style.display = 'none';
  }

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
  }

  const submitHandler = (val) => {
    if(assignmentName === '' || question === '' || submissionType === '' || section === '') {
      return toast.error('Fill all required fields please',{
        hideProgressBar: true,
        position: 'top-center'
      });
    }
    if(isGradable && points === '') {
      return toast.error('The Assignment points field is required',{
        hideProgressBar: true,
        position: 'top-center'
      });
    }

    const info = {
      courseId: props.courseId,
      assignmentName,
      isGradable,
      points,
      section,
      question,
      submissionType,
      isPublished: val,
      startDate: new Date().setTime(startDate),
      endDate: new Date().setTime(endDate),
    }

    props.saveAssignment(info);
    clearState();
    toggleModal();
  }
  
  const changeGradableState = () => {
    setData({
      ...data,
      isGradable: !data.isGradable
    });
  };

  const changeDateOne = (value) => {
    setData({
      ...data,
      startDate: new Date().setTime(value)
    });
  }
  const changeDateTwo = (value) => {
    setData({
      ...data,
      endDate: new Date().setTime(value)
    });
  }
  const changeQuestion = (value) => {
    setData({
      ...data,
      question: value
    });
  }
  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }
  const updateHandler = () => {
    console.log(data);
    if(data.assignmentName === '' || data.question === '' || data.submissionType === '' || data.section === '') {
      return toast.error('Fill all required fields please',{
        hideProgressBar: true,
        position: 'top-center'
      });
    }
    if(data.isGradable && data.points === '') {
      return toast.error('The Assignment points field is required',{
        hideProgressBar: true,
        position: 'top-center'
      });
    }

    props.update(data);
    clearState();
    toggleModal();
  }

  return (
    <div className="modal" id="newAssignmentModal">
      <div className="modal-dialog modal-dialog-scroll">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title m-title" id="NewAssignmentLabel">Create a new Assignment</h5>
            <button type="button" className="close" onClick={toggleModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body-scroll">
            <Spinner
              animation="border"
              variant="primary"
              className={props.isLoading ? 'spinner--position__center' : 'hide'}
            />
            <div className="row pl-2 pr-2">
              <div className="col-md-12">
                <form >
                  <div className="form-group">
                    <label >Assignment Name<span className="required"> *</span></label>
                    <input type="text" onChange={isEdit && data ? onChangeHandler : (e) => setAssignmentName(e.target.value)} maxLength={20} className="form-control" value={isEdit && data ? data.assignmentName : assignmentName} name="assignmentName" placeholder="eg: Datatypes Assignment 1" />
                  </div>
                  <div className="form-group">
                    <input type="checkbox" onChange={isEdit && data ? changeGradableState : changeIsGradable} checked={isEdit && data ? data.isGradable : isGradable} name="isGradable" /> This assignmet is Gradable
                  </div>
                  {
                    isGradable || (isEdit && data && data.isGradable)?
                    
                    <div className="form-group">
                      <label >Points<span className="required"> *</span></label>
                      <input type="number" value={isEdit && data ? data.points : points} onChange={isEdit && data ? onChangeHandler : (e) => setPoints(e.target.value)} className="form-control" name="points" placeholder="Points" />
                    </div>
                    :
                    null
                  }
                  <div className="form-group">
                    <label >Section<span className="required"> *</span></label>
                    <select onChange={isEdit && data ? onChangeHandler : (e) => setSection(e.target.value)} name="section" value={isEdit && data ? data.section :section } className="form-control" >
                      <option value=''>Select Section</option>
                      <option>Section one</option>
                      <option>Section Two</option>
                      <option>Section Three</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label >Submission Type<span className="required"> *</span></label>
                    <select value={isEdit && data ? data.submissionType: submissionType} onChange={isEdit && data ? onChangeHandler : (e) => setSubmissionType(e.target.value)} name="submissionType" className="form-control" >
                      <option value=''>Select Submission Type</option>
                      <option>File upload</option>
                      <option>Website URL</option>
                      <option>Text Entry</option>
                      <option>Any</option>
                    </select>
                  </div>
                  <div className="form-group">
                      <div className="form-row">
                      <div className="col">
                        <label >Available from<span className="required"> *</span></label>
                        <DatePicker
                          selected={isEdit && data ? data.startDate : startDate}
                          timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy h:mm aa"
                          name="startDate"
                          showTimeInput
                          onChange={isEdit && data ? changeDateOne : setStartDate} 
                          minDate={new Date()}
                          isClearable
                          placeholderText="Select the starting date"
                        />
                      </div>
                      <div className="col">
                        <label >Available until<span className="required"> *</span></label>
                        <DatePicker
                          selected={isEdit && data ? data.endDate : endDate}
                          timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy h:mm"
                          showTimeInput
                          name="endDate"
                          onChange={isEdit && data ? changeDateTwo : setEndDate}
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
                      value={isEdit && data ? data.question: question}
                      onChange={isEdit && data ? changeQuestion : setQuestion}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        
          <div className="modal-footer">
            {
              isEdit && data ? 
              <div className="row">
                <div className="col">
                <button type="button" onClick={toggleModal} className="gray-btn" ><span>Cancel</span></button>
                </div>
                <div className="col">
                <button type="button" onClick={(e) => updateHandler()} className="blue-btn"  ><span>Update</span></button>
                </div>
              </div>
              : 
              <div className="row">
                <div className="col">
                <button type="button" onClick={(e) => submitHandler(true)} className="green-btn" ><span>Save and Publish</span></button>
                </div>
                <div className="col col-md-3">
                <button type="button" onClick={(e) => submitHandler(false)} className="blue-btn"  ><span>Save</span></button>
                </div>
              </div>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ assignments }) => ({
  isLoading: assignments.isLoading
});
export default connect(mapStateToProps, {
  saveAssignment: createAssignment,
  update: updateAssignment,
})(NewAssignment);
