import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import "../assets/styles/card.scss";
import { useDropzone } from 'react-dropzone'; 
import uploadIcon from "../assets/images/icons/uploadIcon.png";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createCourse } from "../redux/actions/coursesActions";
import { connect } from "react-redux";
import { getProfile } from "../helpers/utils";
import { toast } from "react-toastify";

const NewCourseModal = ({ handleShow, show, ...props }) => {
  const [coverImage, setcoverImage] = useState([]);
  const [courseName, setcourseName] = useState('');
  const [courseCode, setcourseCode] = useState('');
  const [courseCredit, setcourseCredit] = useState('');
  const [courseDescription, setcourseDescription] = useState('');
  const { uid } = getProfile();

  const handleClose = () => handleShow();

  const { getRootProps, isDragActive, isDragReject, isDragAccept, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: acceptedFiles => {
        setcoverImage(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }
  });
  const uploadImage = (data) => {
    const formData = new FormData();
    formData.append('file', coverImage[0]);
    formData.append('upload_preset', 'gtbvqqvo');
    const options = {
      method: 'POST',
      body: formData,
    };

    return fetch('https://api.Cloudinary.com/v1_1/broadcaster/image/upload', options)
    .then(res => res.json())
    .then(({url}) => {
      data.imageUrl = url;
      props.saveCourse(data);
      clearInput()
      handleClose();
    })
    .catch(err => console.log(err));
  
  }
  const SendHandler = (e) => {
    e.preventDefault();

    if(courseCode === '' || courseCredit === '' || courseName === '' || courseDescription === '') {
      return toast.error('Fill all required fields',{
        position: 'top-center',
        hideProgressBar: true,
      });
    }
    else {
      const colors = ['#3359DF', '#378599', '#bb9c10', '#14aa0f', '#630656', '#81d3e7', '#2d035c'];
      var color = colors[Math.floor(Math.random() * colors.length)];

      const data = {
        instructorId: uid,
        name: courseName,
        code: courseCode,
        credit: courseCredit,
        description: courseDescription,
        hasImage: coverImage[0] !== undefined ? true : false,
        isPublished: false,
        color,
      };
      if (coverImage[0] !== undefined) {
        return uploadImage(data);
      }
      else {
        props.saveCourse(data);
        clearInput()
        handleClose();
      }
    }
  }

  const changeHandler = (evt) => {
    evt.target.name === 'name' ? setcourseName(evt.target.value)
    : evt.target.name === 'code' ? setcourseCode(evt.target.value)
    : evt.target.name === 'credit' ? setcourseCredit(evt.target.value)
    : evt.target.name === 'description' ? setcourseDescription(evt.target.value)
    : void(0);
  }
  const clearInput = () => {
    setcourseName('');
    setcourseDescription('');
    setcourseCode('');
    setcourseCredit('');
    setcoverImage([]);
  }
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
            <h6 className="modal-title m-title" >Create a new course</h6>
            </Modal.Title>
          </Modal.Header>
          <div className="modal-body-scroll">
            <div className="row pl-2 pr-2">
              <div className="col-md-6">
                <form onSubmit={SendHandler}>
                  <div className="form-group">
                    <label htmlFor="courseName">Course Name<span className="required"> *</span></label>
                    <input type="text" className="form-control" value={courseName} name="name" onChange={changeHandler} placeholder="eg: JavaScript Fundamentals" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="courseName">Course Code<span className="required"> *</span></label>
                    <input type="text" className="form-control" maxLength={8} value={courseCode} name="code" onChange={changeHandler} placeholder="eg: JS 101" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="courseName">Course Credit<span className="required"> *</span></label>
                    <input type="number" className="form-control" maxLength={2} value={courseCredit} name="credit" onChange={changeHandler} placeholder="eg: 5" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description<span className="required"> *</span></label>
                    <textarea type="text" className="form-control" value={courseDescription} name="description" onChange={changeHandler} placeholder="Course description" row="4"/>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                    <label htmlFor="courseImage">Upload a course cover image</label>
                <div {...getRootProps({className:"image-area"})}>
                  <input {...getInputProps()} />
                  <div className="">

                    {isDragAccept && (
                      <div>
                          <div className="d-100 btn-icon mb-3 hover-scale-rounded bg-success shadow-success-sm rounded-lg text-white">
                              <FontAwesomeIcon className="top-icons" icon={faCheck} />
                          </div>
                          <div className="text-success">
                              Release to drop here
                          </div>
                      </div>
                    )}
                    {isDragReject && (
                      <div>
                          <div className="d-100 btn-icon mb-3 hover-scale-rounded bg-danger shadow-danger-sm rounded-lg text-white">
                              X
                          </div>
                          <div className="text-danger">
                              These files are not images!
                          </div>
                      </div>
                    )}
                    {!isDragActive && (
                      <div>
                          <div >
                            <img alt="" src={uploadIcon}/>
                          </div>
                          <div className="font-size-sm">
                              Drag and drop image here or click to browse
                          </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="image-preview">
                  {
                    coverImage[0] !== undefined ?
                    <img className="img-fluid img-fit-container rounded-sm" src={coverImage[0].preview} alt="" />
                    : null
                  }
                </div>
              </div>
            </div>
          </div>
          <Modal.Footer>
            <button className="blue-btn" onClick={SendHandler}>
            Save
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default connect(null, {
  saveCourse: createCourse
}) (NewCourseModal);
  