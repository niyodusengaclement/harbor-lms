import React from "react";
import "../assets/styles/styles.scss";

const NewCourseModal = () => {
  return (
    <div className="modal fade" id="newCourseModal" tabIndex="-1" role="dialog" aria-labelledby="newCourseModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title m-title" id="newCourseModalLabel">Create new course</h6>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
              <form>
                <div className="form-group">
                  <label htmlFor="courseName">Course Name<span className="required">*</span></label>
                  <input type="text" className="form-control" id="courseName" aria-describedby="courseName" placeholder="eg: JavaScript Fundamentals" />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea type="text" className="form-control" id="description" placeholder="Course description" row="4"/>
                </div>
              </form>
              </div>
              <div className="col-md-6">
                <p className="font-italic text-white text-center">Upload course cover image</p>
                <div className="image-area mt-4"><img id="imageResult" src="#" alt="" className="img-fluid rounded shadow-sm mx-auto d-block" />
                  <div className="mleft"><i className="fa fa-cloud-upload" aria-hidden="true"></i></div>
                  <div>Drag and drop image here</div> <div className="center">or</div> <div className="center">Click to upload</div> 
                </div>
              </div>
            </div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn create-course-btn"><span>Create course</span></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCourseModal;
